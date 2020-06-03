<template>
<body>
  <div class="text-center" style="color: whitesmoke;">
      <h1>{{ mgroup.name }}</h1>
      <br />
  </div>
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
            <h2><strong>Usuario:</strong> {{ mgroup.username }}</h2>
          </div>
          <div class="text-left">
            <br />
            <h4><strong>Email: </strong>{{ mgroup.email }}</h4>
            <h4><strong>Ciudad: </strong>{{ mgroup.city }}</h4>
            <h4><strong>Número de miembros: </strong>{{ mgroup.members }}</h4>
            <h4><strong>Tipo de agrupación: </strong>{{ mgroup.nameType }}</h4>
            <br />
            <h4><strong>Descripción: </strong></h4>
            <div>
              <h4>{{ mgroup.description }}</h4>
            </div>
          </div>
          <br />
          <div v-if="mgroup.id != myId && this.myId!==null">
            <br />
            <router-link
              :to="{ name: 'Chat', params: { id: mgroup.id }}"
              class="btn btn-sm btn-outline-primary"
            >Enviar mensaje</router-link>
          </div>
          <div v-if="this.myId===null">
            <br />
            <router-link
              :to="{ name: 'Login'}"
              class="btn btn-sm btn-outline-primary"
            >Enviar mensaje</router-link>
          </div>

          <div>
            <tr>
              <td class="text-right" v-if="sameUser">
                  <router-link
                    :to="{ name: 'EditMG', params: { id: mgroup.id } }"
                    class="btn btn-sm btn-outline-secondary"
                  >Editar perfil</router-link>
                  <br />             
              </td>
              <td  v-if="loggedAndPerson && !subscribed">
                <button class="btn btn-sm btn-outline-primary" v-on:click="createSubscriptionMG()">Seguir</button>
              </td>
              <td  v-if="loggedAndPerson && subscribed">
                <button
                  class="btn btn-sm btn-outline-danger"
                  v-on:click="deleteSubscriptionMG()"
                >Dejar de seguir</button>
              </td>
            </tr>
          </div>

        </td>
      </tr>
    </table>

    
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
    console.log("id: "+this.myId);
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
    deleteMgroup(id) {
       axios.delete(`${server.baseURL}/mgroup/${id}`, {headers: {token: localStorage.token}}).then(data => {
        localStorage.clear();
        window.push("Home");
      });
      /*router.push({ name: "Home" });
      window.location.reload();*/
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
