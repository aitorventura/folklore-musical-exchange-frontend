<template>
<body>
<div class="p-4" v-if="mgroups.length === 0">
  <h3>No sigues a ningún grupo</h3>
</div>
<div class="thumbnail p-3" v-if="mgroups.length !== 0">
    <div class="text-center p-3" style="padding: 30px; text-align: center;">
      <h2>Suscripciones</h2>
    </div>
    <div v-for="mgroup in mgroups" :key="mgroup.id" class="border row magen" >
      <div class="col-2 p-4">
         <img v-bind:src="mgroup.image" class="img-fluid" alt="Musical Group image" />
      </div>
      <div class="col-1">
      </div>
       <div class="col p-4">
        <div class="row">
          <div class="col p-3 justify-content-start">
            <h4>{{mgroup.name}}</h4>
            <p>{{mgroup.nameType}}</p>
            <br />
          </div>
        </div>
         <div class="row centrado">
            <div class="col-4 p-3"></div>
            <div class="col-2 p-3">
              <div>
                <div
                  class="btn btn-sm btn-outline-danger"
                  v-on:click="deleteSubscriptionMG(mgroup.id)"
                  >Dejar de seguir
                </div>
              </div>
            </div>
            <div class="col-2 p-3">
              <div>
                <router-link
                  :to="{ name: 'Chat', params: { id: mgroup.id }}"
                  class="btn btn-sm btn-outline-primary"
                >Enviar mensaje
                </router-link>
              </div>
            </div>
            <div class="col-4 p-3"></div>
        </div>
      </div>
    </div>
  <!--</div>-->
</div>  
</body>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import Vue from "vue";
/*STYLES*/
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-vue/dist/bootstrap-vue.css";

/*DESPLEGABLE MULTISELECT*/
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { MultiSelect, CheckBoxSelection } from "@syncfusion/ej2-dropdowns";
MultiSelect.Inject(CheckBoxSelection);
Vue.use(MultiSelectPlugin);
/*TEXTO*/
import { TextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
Vue.use(TextBoxPlugin);

export default {
  data() {
    return {
      id: 0,
      myId: 0,
      mgroups: {}
    };
  },
  created() {
    this.myId = localStorage.getItem("id");
    this.id = this.$route.params.id;
    this.getFollowedMGroups();
  },
  methods: {
    getFollowedMGroups() {
      axios
        .get(`${server.baseURL}/subscriptionMG/${this.id}`)
        .then(data => (this.mgroups = data.data)
        );
    },
    deleteSubscriptionMG(idMG) {
      axios
        .delete(
          `${server.baseURL}/subscriptionMG/${localStorage.getItem("id")}/${idMG}`
        )
        .then(data => {
            
            console.log("he borrado la suscripción de la agrupación");
            window.location.reload();
      
        });
    }
  }
};
</script>

<!--Imports para los componentes-->
<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";

.wrapper {
  max-width: 250px;
  margin: 0 auto;
}
</style>

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
} 

.image-size {
  height: 20px;
  width: 20px;
}

.magen {
  padding: 10px;
  margin: 30px;
}

body {
  font: 400 15px/1.8 Lato, sans-serif;
  color: whitesmoke;
  background-color: #2d2d30;
  height: 100%;
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

.centrado {
  align-content: center;
  align-items: center;
  text-align: center;
}

.centerBlock {
  display: table;
  margin: auto;
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

.texto-centrado {
  text-align: center;
}

.center-block {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
