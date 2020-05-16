<template>
<body>
  

<table class="table text-center" style="padding: 30px">
        <tr v-for="mgroup in filterName" :key="mgroup.id" class="border" style="padding: 30px">
          <td scope="col border justify-content-center" style="padding-right: 40px;">
            <div class="p-3">
              <img v-bind:src="mgroup.image" height="160" width="160" />
            </div>
          </td>
          <td scope="col justify-content-center" style="padding-left: 20px;">
            <div class="text-left">
              <h2>{{ mgroup.name }}</h2>
            </div>
            <div class="text-left">
              <br />
              <p>
                <strong>Ciudad:</strong>
                {{ mgroup.city }}
              </p>
              <br />
              <p>{{ mgroup.nameType }}</p>
            </div>
          </td>
          <br />
          <br />
          <br />
          <br />
          <div class="btn-group justify-content-center" style="margin-bottom: 20px;">
            <router-link
              :to="{ name: 'GetMG', params: { id: mgroup.id } }"
              class="btn btn-sm btn-outline-primary p-3"
            >Más información</router-link>
             <br />
            <button
            class="btn btn-sm btn-outline-danger p-3"
            v-on:click="deleteSubscriptionMG()"
            >
            Dejar de seguir
            </button>
            <!--<router-link
              :to="{ name: '----', params: { idMGroupA: mgroup.id,  idPerson: this.id} }"
              class="btn btn-sm btn-outline-primary p-3"
            >Enviar mensaje</router-link>-->
          </div>
        </tr>
      </table>

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
      mgroups: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getFollowedMGroups();
  },
  methods: {
    getFollowedMGroups() {
      axios
        .get(`${server.baseURL}/subscriptionMG/${this.id}`)
        //.then(data => (this.mgroups = data.data)
        .then((data) => {
          console.log(data);
        });
    },
    deleteSubscriptionMG(id) {
      axios
        .delete(
          `${server.baseURL}/subscriptionMG/${localStorage.getItem("id")}/${id}`
        )
        .then((data) => {
          if (data.data === true) {
              window.location.reload();
          }
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
td {
  padding: 5px;
}
tr,
th,
table {
  border: 0cm;
  align-items: center;
}
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
/*
.oscuro {
  height: 100vh;
  background-color: #2d2d30;
}*/
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
   margin-left:auto;
   margin-right:auto;
   display:block;
}
</style>
