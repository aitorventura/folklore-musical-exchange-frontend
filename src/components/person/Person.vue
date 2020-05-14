<template>
  <body>
    <div class="container thumbnail">

      <table class="table table-borderless">
        <tr>
          <td scope="col p-3" style="padding-right: 40px;">
            <div class="bordered">
               <img v-bind:src="person.image" height="400" width="400"/>
            </div>
          </td>
          <td scope="col" style="padding-left: 20px;">
            <div class="text-left">
              <h2>{{ person.name }} {{ person.surname }}</h2>
              <h4>Usuario: {{ person.username }}</h4>
            </div>
            <div class="text-left">
              <br />
              <p>Email: {{ person.email }}</p>
              <p>Ciudad: {{ person.city }}</p>
            </div>
            <div class="text-left">
              <br />
              <p>Suscripciones:</p>
              <p v-for="subscription in subscriptions" :key="subscription.id">
                {{ subscription.nameType }}
              </p>
            </div>

            <div class="text-right" v-if="logged">
              <div>
              <router-link 
                      :to="{ name: 'Edit', params: { id: person.id } }"
                      class="btn btn-sm btn-outline-secondary"
                      >
                      Editar perfil
                      </router-link
                    > 
                     
              <button
                class="btn btn-sm btn-outline-danger"
                v-on:click="deletePerson(person.id)"
              >
                Borrar cuenta
              </button>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</template>
<script>
import { server } from "../../helper";
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      person: {},
      subscriptions: [],
      logged: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPerson();
    this.getSubscriptions();
    this.samePerson();
  },
  methods: {
    samePerson() {
      if (this.id == localStorage.getItem("id")) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    },
    getPerson() {
      axios
        .get(`${server.baseURL}/person/${this.id}` , {headers: {token: localStorage.token}})
        .then(data => (this.person = data.data));
    },
    getSubscriptions() {
      axios
        .get(`${server.baseURL}/subscription/${this.id}`)
        .then(data => (this.subscriptions = data.data));
    },

    deletePerson(id) {
      axios.delete(`${server.baseURL}/person/${id}`).then(data => {
        window.push("Home");
      });
    },
   
   
  }
};
</script>



<style scoped>

.thumbnail {
  align-content: center;
  align-items: center;
  text-align: center;
  line-height: 100%;
  border-color: #fff;
  border-left-width: 1cm;
  border-right-width: 1cm;
  color: #2d2d30;
} /*
table {
  border: 0cm;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}*/
body {
  font: 400 15px/1.8 Lato, sans-serif;
  color: whitesmoke;
  background-color: #2d2d30;
  height: 100vh;
  /*height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;*/
}
.blanco {
  background-color: white;
}
/*
.oscuro {
  height: 100vh;
  background-color: #2d2d30;
}*/

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