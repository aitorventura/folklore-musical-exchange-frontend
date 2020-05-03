<template>
  <body>
    <br />
    <br />
    <br />
    <br />
    <div class="container">
      <table class="table table-bordered">
        <tr>
          <td scope="col p-3" style="padding-right: 40px;">
            <div class="bordered">
               <img v-bind:src="mgroup.image" height="400" width="400"/>
            </div>
          </td>
          <td scope="col" style="padding-left: 20px;">
            <div class="text-left">
              <h2>{{ mgroup.name }}</h2>
              <h4>username: {{ mgroup.username }}</h4>
            </div>
            <div class="text-left">
              <br />
              <p>Email: {{ mgroup.email }}</p>
              <p>City: {{ mgroup.city }}</p>
              <p>Number of members: {{ mgroup.members }}</p>
              <p>Type of agrupation: {{ mgroup.nameType }}</p>
              <p>Description: {{ mgroup.description }}</p>
             
            </div>
           
            <div class="text-right" v-if="sameUser">
              <div>
              <router-link 
                      :to="{ name: 'Edit', params: { id: mgroup.id } }"
                      class="btn btn-sm btn-outline-secondary"
                      >
                      <span v-on:click="reload">Edit Profile
                      </span>
                      
                      </router-link
                    > 
                     
              <button
                class="btn btn-sm btn-outline-danger"
                v-on:click="deletePerson(person.id)"
              >
                Delete Account
              </button>
              </div>
            </div>
          </td>
           
        </tr>
      </table>



    <div v-if="loggedAndPerson && !subscribed"> 
      <button
                class="btn btn-sm btn-outline-primary"
                v-on:click="createSubscriptionMG()"
              >
                Subscribe
              </button>
    </div>
    <div v-if="loggedAndPerson && subscribed"> 
      <button
                class="btn btn-sm btn-outline-danger"
                v-on:click="deleteSubscriptionMG()"
              >
                Unsubscribe
              </button>
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
      loggedAndPerson: false,
      subscribed: null,
      sameUser: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMGroup();
    this.isSameUser();
  },
  methods: {
    isSameUser() {
      if(this.id == localStorage.getItem("id")){
        this.sameUser = true
      }   if (this.id != localStorage.getItem("id") && localStorage.getItem("id") != null) {
       
        this.isPerson();
      } else {
        this.loggedAndPerson = false;
      }
    },
    getMGroup() {
      axios
        .get(`${server.baseURL}/musicalgroup/${this.id}`)
        .then(data => (this.mgroup = data.data));
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
        .get(`${server.baseURL}/subscriptionMG/${localStorage.getItem("id")}/${this.mgroup.id}/check`)
        .then(data => {
          if (data.data === true) {
            this.subscribed = true;
          }else {
            this.subscribed = false;
          }
        });
    },
    createSubscriptionMG() {
        let subscriptionMG = {
        idPerson: localStorage.getItem("id"),
        idMGroup: this.mgroup.id,
      };
      this.__submitToServer(subscriptionMG);
    },
    deleteSubscriptionMG() {
      axios.delete(`${server.baseURL}/subscriptionMG/${localStorage.getItem("id")}/${this.mgroup.id}`).then(data => {
        if(data.data === true) {
          console.log("me he des-suscrito!");
          this.subscribed = false;
        }
        //router.push({ name: "GetMG" }); 
      });
    },
     reload(){
        window.location.reload();
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/subscriptionMG/create`, data)
      .then(data => {
        if(data.data === true) {
          console.log("me he suscrito!");
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
