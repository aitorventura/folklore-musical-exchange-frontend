<template>
<body>
  <!--Si se quiere en blanco se quita el thumbnail-->
  <div class="thumbnail" id="margin">
    <table>
      <tr>
        <td scope="col p-3" style="padding-right: 40px;">
          <div class="bordered">
            <img v-bind:src="mgroup.image" height="400" width="400" />
          </div>
        </td>
        <td scope="col" style="padding-left: 20px;">
          <div class="text-left">
            <h2>{{ mgroup.name }}</h2>
            <h4>Usuario: {{ mgroup.username }}</h4>
          </div>
          <div class="text-left">
            <br />
            <p>Email: {{ mgroup.email }}</p>
            <p>Ciudad: {{ mgroup.city }}</p>
            <p>Número de miembros: {{ mgroup.members }}</p>
            <p>Tipo de agrupación: {{ mgroup.nameType }}</p>
            <p>Descripción: {{ mgroup.description }}</p>
          </div>
          <br />
          <div v-if="mgroup.id != myId">
            <br />
            <router-link
              :to="{ name: 'Chat', params: { idA: mgroup.id , idB: myId }}"
              class="btn btn-sm btn-outline-primary"
            >Enviar mensaje</router-link>
          </div>
          <div class="text-right" v-if="sameUser">
            <div>
              <router-link
                :to="{ name: 'EditMG', params: { id: mgroup.id } }"
                class="btn btn-sm btn-outline-secondary"
              >Editar perfil</router-link>
              <br />

              <br />
              <button
                class="btn btn-sm btn-outline-danger"
                v-on:click="deletePerson(mgroup.id)"
              >Borrar cuenta</button>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <div v-if="loggedAndPerson && !subscribed">
      <button class="btn btn-sm btn-outline-primary" v-on:click="createSubscriptionMG()">Seguir</button>
    </div>
    <div v-if="loggedAndPerson && subscribed">
      <button
        class="btn btn-sm btn-outline-danger"
        v-on:click="deleteSubscriptionMG()"
      >Dejar de seguir</button>
    </div>
    <!-- </div> -->
  </div>
</body>
</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      mgroup: {},
      person: {},
      myId: 0,
      loggedAndPerson: null,
      subscribed: null,
      sameUser: null
    };
  },
  created() {
    this.myId = localStorage.getItem("id");
    this.id = this.$route.params.id;
    this.getMGroup();
  },
  methods: {
    isSameUser() {
      if (this.id == localStorage.getItem("id")) {
        this.sameUser = true;
      }

      if (
        this.id != localStorage.getItem("id") &&
        localStorage.getItem("id") != null
      ) {
        this.isPerson();
      } else {
        this.loggedAndPerson = false;
      }
    },
    getMGroup() {
      axios.get(`${server.baseURL}/musicalgroup/${this.id}`).then(data => {
        this.mgroup = data.data;
        this.isSameUser();
      });
    },
    isPerson() {
      axios
        .get(`${server.baseURL}/user/${localStorage.getItem("id")}/check`)
        .then(data => {
          if (data.data === true) {
            this.loggedAndPerson = true;
            this.isSubscribed();
          }
        });
    },
    isSubscribed() {
      axios
        .get(
          `${server.baseURL}/subscriptionMG/${localStorage.getItem("id")}/${
            this.mgroup.id
          }/check`
        )
        .then(data => {
          if (data.data === true) {
            this.subscribed = true;
          } else {
            this.subscribed = false;
          }
        });
    },
    createSubscriptionMG() {
      let subscriptionMG = {
        idPerson: localStorage.getItem("id"),
        idMGroup: this.mgroup.id
      };
      this.__submitToServer(subscriptionMG);
    },
    deleteSubscriptionMG() {
      axios
        .delete(
          `${server.baseURL}/subscriptionMG/${localStorage.getItem("id")}/${
            this.mgroup.id
          }`
        )
        .then(data => {
          if (data.data === true) {
            this.subscribed = false;
          }
          //router.push({ name: "GetMG" });
        });
    },

    __submitToServer(data) {
      axios.post(`${server.baseURL}/subscriptionMG/create`, data).then(data => {
        if (data.data === true) {
          this.subscribed = true;
        }
        //router.push({ name: "GetMG" });
      });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

<style scoped>
td {
  padding: 3px;
}
.thumbnail {
  line-height: 100%;
  border-color: #fff;
  border-left-width: 1cm;
  border-right-width: 1cm;
}
#margin {
  margin-left: 2cm;
  margin-right: 2cm;
}
#centro {
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
body {
  font: 400 15px/1.8 Lato, sans-serif;
  color: #777;
  background-color: #2d2d30;
  height: 100vh;
  /*height: 100%;
  width: 100%;
  padding: 0;
  */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
}
.btn {
  padding: 6px 15px;
  background-color: #333;
  color: #f1f1f1;
  border-radius: 0;
  transition: 0.2s;
}
.btn:hover,
.btn:focus {
  border: 1px solid #333;
  background-color: #fff;
  color: #000;
}
</style>
