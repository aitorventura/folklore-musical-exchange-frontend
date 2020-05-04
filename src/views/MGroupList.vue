<template>
  <body>
    <br />
    <br />
    <br />
    <div class="container-fluid">
      <div class="text-center">
        <h1>Musical Group List</h1>

        <div v-if="mgroups.length === 0">
          <div class="container">
            <div class="alert" classappend="alert-dark">
              <img src="../assets/logoBlanco.png" style="width:300px;" />

              <br />
              <!--<h2>No user found at the moment</h2>-->
              <h3>No user found at the moment</h3>
              <br />
              <p>
                Pulsa el botón de inicio para volver a la página principal o
                utiliza el navegador para volver atrás
              </p>
            </div>
            <div th:align="center">
              <a href="/" class="btn btn-primary" th:align="left"
                >Página principal</a
              >
            </div>
          </div>
        </div>
      </div>

    <div class="thumbnail">
      <!-- <div class="row"> -->
      <div class v-if="mgroups.length !== 0">
        <div>
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
        </div>

        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th class="centro" scope="col">Nombre</th>
              <th class="centro" scope="col">Ciudad</th>
              <th class="centro" scope="col">Tipo de agrupación</th>
              <th class="centro" scope="col">Imagen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mgroup in filterName" :key="mgroup.id">
              <td>{{ mgroup.name }}</td>
              <td>{{ mgroup.city }}</td>
              <td>{{ mgroup.nameType }}</td>
              <td>
                <img v-bind:src="mgroup.image" height="200" width="200" />
              </td>
              <td>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group" style="margin-bottom: 20px;">
                    <router-link
                      :to="{ name: 'GetMG', params: { id: mgroup.id } }"
                      class="btn btn-sm btn-outline-primary"
                      >Show MGroup</router-link
                    >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- </div> -->
    </div>
    </div>
  </body>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import Vue from "vue";
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
      fields: { text: "name", value: "name" },
      /*maximumSelectionLength: "",*/
      showSelectAll: true,
    };
  },
  created() {
    this.fetchMGroups();
    this.getNameTypes();
  },
  computed: {
    filterName() {
      return this.mgroups.filter((mgroup) => {
        return (
          mgroup.name.toLowerCase().match(this.searchName.toLowerCase()) &&
          mgroup.city.toLowerCase().match(this.searchCity.toLowerCase()) &&
          this.isType(mgroup.nameType)
        );
      });
    },
  },
  methods: {
    fetchMGroups() {
      axios
        .get(`${server.baseURL}/musicalgroup`)
        .then((data) => (this.mgroups = data.data));
    },
    deleteMGroup(id) {
      axios
        .delete(`${server.baseURL}/musicalgroup/${id}`, {
          headers: { token: localStorage.token },
        })
        .then((data) => {
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
          (data) => (
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
    },
  },
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
  line-height: 100%;
  border-color: #fff;
  border-left-width: 0.5cm;
  border-right-width: 0.5cm;
  color: #2d2d30;
} 
.centro {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
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
