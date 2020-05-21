<template>
<body>
  <div class="container-fluid" border="0.5cm">
    <div class="text-center" heigth="100vh">
      <h1>Agrupaciones musicales</h1>

      <div v-if="mgroups.length === 0">
        <div class="container">
          <div class="alert" classappend="alert-dark">
            <img src="../assets/logoBlanco.png" style="width:300px;" />

            <br />
            <!--<h2>No user found at the moment</h2>-->
            <h3>No se ha encontrado ninguna agrupación</h3>
            <br />
            <p>
              Pulsa el botón de inicio para volver a la página principal o
              utiliza el navegador para volver atrás
            </p>
          </div>
          <div th:align="center">
            <a href="/" class="btn btn-primary" th:align="left">Página principal</a>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row"> -->

    <div class="thumbnail" v-if="mgroups.length !== 0">
      <ejs-textbox
        id="textbox"
        v-model="searchName"
        floatLabelType="Never"
        showClearButton="true"
        placeholder="Filtra por nombre"
        width="200px"
      ></ejs-textbox>

      <ejs-textbox
        id="textbox"
        v-model="searchCity"
        floatLabelType="Never"
        showClearButton="true"
        placeholder="Filtra por ciudad"
        width="200px"
      ></ejs-textbox>

      <ejs-multiselect
        :id="searchType"
        v-model="searchType"
        :dataSource="nameTypes"
        placeholder="Filtra por tipo"
        mode="CheckBox"
        :fields="fields"
        :showSelectAll="showSelectAll"
        selectAllText="Seleccionar todos"
        unSelectAllText="Deseleccionar todos"
        width="200px"
      ></ejs-multiselect>

      <br />
      <!--
      <div class="p-3" v-for="mgroup in filterName" :key="mgroup.id">
        <div class="row p-4 border" >
          <div class="col-2 ">
            <img v-bind:src="mgroup.image" height="160" width="160" />
          </div>
          <div class="col justify-content-start">
            <h2>{{ mgroup.name }}</h2>
          </div>
          <div class="col-2 justify-content-center texto-centrado">
            <div class="btn-group justify-content-center texto-centrado">
              <router-link
                :to="{ name: 'GetMG', params: { id: mgroup.id } }"
                class="btn btn-sm btn-outline-primary"
              >Más información</router-link>
            </div>
          </div>
        </div>
      </div>
      -->
      <div class="row justify-content-center" align-v="center">
        <div v-for="mgroup in filterName" :key="mgroup.id" class="col-3 justify-content-center">
          <img class="card-img-top" v-bind:src="mgroup.image" alt="Card image" />
          <b-card>
            <b-card-text>
              <div class="row">
                <div class="col">
                  <strong>{{ mgroup.name }}</strong>
                </div>
                <div class="col">
                  Tipo de grupo:
                  <strong>{{ mgroup.nameType }}</strong>
                </div>
              </div>
            </b-card-text>
            <br />
            <div class="btn-group justify-content-center" style="margin-bottom: 20px;">
              <router-link
                :to="{ name: 'GetMG', params: { id: mgroup.id } }"
                class="btn btn-sm btn-outline-primary"
              >Más información</router-link>
              <br />
              <div v-if="mgroup.id != myId">
                <br />
                <br />
                <router-link
                  :to="{ name: 'Chat', params: { id: mgroup.id }}"
                  class="btn btn-sm btn-outline-primary"
                >Enviar mensaje</router-link>
              </div>
            </div>
          </b-card>
        </div>
      </div>

      <!--table class="table text-center" style="padding: 30px">
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
                class="btn btn-sm btn-outline-primary"
              >Más información</router-link>

      <div v-if="isMGroup"-->
      <!-- <router-link
                :to="{ name: '----', params: { idMGroupA: mgroup.id, idMGroupB: localStorage.getItem("id")} }"
                class="btn btn-sm btn-outline-primary"
      >Enviar mensaje</router-link>-->
      <!--/div>
            </div>
          </tr>
        </table>
      </div-->
    </div>
  </div>
</body>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import Vue from "vue";
/*STYLES*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

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
      mgroups: [],
      searchName: "",
      searchCity: "",
      searchType: [],
      nameTypes: [],
      myId: 0,
      fields: { text: "name", value: "name" },
      /*maximumSelectionLength: "",*/
      showSelectAll: true,
      isMGroup: false
    };
  },
  created() {
    this.myId = localStorage.getItem("id");
    this.fetchMGroups();
    this.getNameTypes();
    this.getRole();
  },
  computed: {
    filterName() {
      return this.mgroups.filter(mgroup => {
        return (
          mgroup.name.toLowerCase().match(this.searchName.toLowerCase()) &&
          mgroup.city.toLowerCase().match(this.searchCity.toLowerCase()) &&
          this.isType(mgroup.nameType)
        );
      });
    }
  },
  methods: {
    fetchMGroups() {
      axios
        .get(`${server.baseURL}/musicalgroup`)
        .then(data => (this.mgroups = data.data));
    },
    getRole() {
      if (localStorage.getItem("role") != "PERSON") {
        this.isMGroup = true;
      }
    },
    deleteMGroup(id) {
      axios
        .delete(`${server.baseURL}/musicalgroup/${id}`, {
          headers: { token: localStorage.token }
        })
        .then(data => {
          if (data.data) {
            window.location.reload();
          } else {
            alert(
              "No puede darse de baja mientras tenga intercambios pendientes."
            );
          }
        });
    },
    getNameTypes() {
      axios
        .get(`${server.baseURL}/type`)
        .then(
          data => (
            (this.nameTypes = data.data),
            (this.maximumSelectionLength = data.data.length)
          )
        );
    },
    isType(mgroupType) {
      if (this.searchType.length != 0) {
        for (var i = 0; i < this.searchType.length; i++) {
          if (mgroupType.toLowerCase() === this.searchType[i].toLowerCase()) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
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
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
