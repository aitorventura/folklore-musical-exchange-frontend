<template>
<body>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Listado de intercambios musicales</h1>

      <div v-if="musicalexchanges.length === 0">
        <div class="container">
          <div class="alert" classappend="alert-dark">
            <img src="../assets/logoBlanco.png" style="width:300px;" />

            <br />
            <h3>No user found at the moment</h3>
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
      <!--</div> -->
      <div class="centrado" v-if="musicalexchanges.length !== 0">
        <div class="thumbnail">
          <br />
          <ejs-textbox
            id="textbox"
            v-model="searchPlace"
            floatLabelType="Never"
            showClearButton="true"
            placeholder="Filtra por lugar"
            width="150px"
          ></ejs-textbox>

          <ejs-datepicker
            v-model="searchDateS"
            :placeholder="start"
            :format="dateFormat"
            width="140px"
          ></ejs-datepicker>

          <ejs-datepicker
            v-model="searchDateE"
            :placeholder="end"
            :format="dateFormat"
            width="143px"
          ></ejs-datepicker>

          <ejs-multiselect
            :id="searchMGroup"
            v-model="searchMGroup"
            :dataSource="mgroups"
            placeholder="Selecciona una agrupación"
            mode="CheckBox"
            :fields="fields"
            :showSelectAll="showSelectAll"
            selectAllText="Seleccionar todos"
            unSelectAllText="Deseleccionar todos"
            width="300px"
          ></ejs-multiselect>

          <div class="centrado row justify-content-center p-4" align-v="centrado">
            <div
              v-for="musicalexchange in filterName"
              :key="musicalexchange.id"
              class="col-4 p-4 justify-content-center centrado"
            >
              <b-card
                style="max-width: 35rem;"
                class="mb-2"
              >
                <div class="row">
                  <div class="col pb-3">
                    <img v-bind:src="musicalexchange.imageA" class="img-fluid" alt="Responsive image" />
                  </div>
                  <div class="col pb-3">
                    <img v-bind:src="musicalexchange.imageB" class="img-fluid" alt="Responsive image" />
                  </div>
                </div>
                <b-card-text>
                  <div class="row">
                    <div class="col">
                      Grupo anfitrión:
                      <strong>{{ musicalexchange.nombreMA }}</strong>
                    </div>
                    <div class="col">
                      Grupo invitado:
                      <strong>{{ musicalexchange.nombreMB }}</strong>
                    </div>
                  </div>
                </b-card-text>

                <b-card-text>
                  <br />
                  <div class="font-italic">Lugar del encuentro: {{ musicalexchange.place }}</div>
                </b-card-text>
                <div class="pt-4">
                  <router-link
                    :to="{
                              name: 'GetME',
                              params: { id: musicalexchange.id },
                            }"
                    class="btn btn-sm btn-outline-primary"
                  >Más información</router-link>
                </div>
              </b-card>
            </div>
          </div>

          <!--<table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Primera Agrupación</th>
              <th scope="col">Segunda Agrupación</th>
              <th scope="col">Fecha</th>
              <th scope="col">Lugar</th>
              <th scope="col">Descripcióin</th>
              <th scope="col">Repertorio</th>
              <th scope="col">Dinero que se necesita</th>
              <th scope="col">Link de Crowdfunding</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="musicalexchange in filterName" :key="musicalexchange.id">
              <td>{{ musicalexchange.nombreMA }}</td>
              <td>{{ musicalexchange.nombreMB }}</td>
              <td>
                <span>{{ musicalexchange.date | moment }}</span>
              </td>
              <td>{{ musicalexchange.place }}</td>
              <td>{{ musicalexchange.description }}</td>
              <td>{{ musicalexchange.repertoire }}</td>
              <td>{{ musicalexchange.neededMoney }}</td>
              <td>{{ musicalexchange.crowdfundingLink }}</td>
              <td>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group" style="margin-bottom: 20px;">
                    <router-link
                      :to="{
                            name: 'EditME',
                            params: { id: musicalexchange.id },
                          }"
                      class="btn btn-sm btn-outline-secondary"
                    >Edit Exchange</router-link>

                    <router-link
                      :to="{
                            name: 'GetME',
                            params: { id: musicalexchange.id },
                          }"
                      class="btn btn-sm btn-outline-primary"
                    >Show Exchange</router-link>

                    <button
                      class="btn btn-sm btn-outline-secondary"
                      v-on:click="deleteMGroup(musicalexchange.id)"
                    >Delete Exchange</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          </table>-->
        </div>
      </div>
    </div>
  </div>
</body>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script>
/*STYLES*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { server } from "../helper";
import axios from "axios";
import Vue from "vue";
/*MOMENT PARA LA FECHA*/
import moment from "moment";
require("moment/locale/es");
moment.locale("es");
/*DESPLEGABLES*/
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { MultiSelect, CheckBoxSelection } from "@syncfusion/ej2-dropdowns";
MultiSelect.Inject(CheckBoxSelection);
Vue.use(MultiSelectPlugin);
/*FECHA*/
import {
  DatePickerPlugin,
  DateRangePickerPlugin
} from "@syncfusion/ej2-vue-calendars";
Vue.use(DatePickerPlugin);
Vue.use(DateRangePickerPlugin);
/*ÁREA DE TEXTO*/
import { TextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
Vue.use(TextBoxPlugin);
/*DESPLEGABLE SIMPLE*/
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);
/*DESPLEGABLE SIMPLE + TEXTO*/
import { ComboBoxPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(ComboBoxPlugin);
/*FILTRO supuestamente para el orderBy (no funciona)*/
import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);
/*GRID donde se ven los datos, permite ordenar*/
import { GridPlugin, Page, Sort } from "@syncfusion/ej2-vue-grids";
Vue.use(GridPlugin);

export default {
  data() {
    return {
      musicalexchanges: [],
      mgroups: [],
      searchPlace: "",
      searchMGroup: [],
      searchDateS: null,
      searchDateE: null,
      start: "Desde",
      end: "Hasta",
      fields: { text: "name", value: "name" },
      showSelectAll: true,
      dateFormat: "dd-MM-yyyy"
      /*sort: ["nombreMA", "nombreMB", "date", "place", "neededMoney"],
      sortBy: "nombreMA",*/
      //pageSettings: { pageSize: 20 } (Para la versión nueva)
    };
  },
  created() {
    this.fetchMExchanges();
    this.getAgrupaciones();
  },
  computed: {
    filterName() {
      return this.musicalexchanges.filter(musicalexchange => {
        return (
          musicalexchange.place
            .toLowerCase()
            .match(this.searchPlace.toLowerCase()) &&
          this.matchAgrupation(
            musicalexchange.nombreMA,
            musicalexchange.nombreMB
          ) &&
          this.inRange(moment(musicalexchange.date).format("DD/MM/YYYY, HH:mm"))
        );
      });
    }
  },
  methods: {
    fetchMExchanges() {
      axios
        .get(`${server.baseURL}/musicalexchange`)
        .then(data => (this.musicalexchanges = data.data));
    },
    deleteMGroup(id) {
     /* axios
        .delete(`${server.baseURL}/musicalexchange/${id}`, {
          headers: { token: localStorage.token }
        })
        .then(data => {
          window.location.reload();
        });*/
    },
    getAgrupaciones() {
      axios
        .get(`${server.baseURL}/musicalgroup`)
        .then(data => (this.mgroups = data.data));
    },
    matchAgrupation(nombreMA, nombreMB) {
      if (this.searchMGroup.length != 0) {
        for (var i = 0; i < this.searchMGroup.length; i++) {
          if (
            nombreMA.toLowerCase() === this.searchMGroup[i].toLowerCase() ||
            nombreMB.toLowerCase() === this.searchMGroup[i].toLowerCase()
          ) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    },
    /*
    //date es el valor que se compara de cada unos de los intercambios
    filterByDate(date) {
      if (
        moment(date, "DD/MM/YYYY").diff(moment(this.searchDate, "DD/MM/YYYY")) >
        0
      ) {
        return true;
      }
      return false;
    },*/
    inRange(date) {
      if (this.searchDateS && this.searchDateE) {
        /*
        alert(
          "searchDateS: " +
            this.searchDateS +
            " searchDateE: " +
            this.searchDateE +
            " ambos valores están completos"
        );
        */
        if (
          moment(date, "DD/MM/YYYY").diff(
            moment(this.searchDateS, "DD/MM/YYYY")
          ) >= 0 &&
          moment(date, "DD/MM/YYYY").diff(
            moment(this.searchDateE, "DD/MM/YYYY")
          ) <= 0
        ) {
          return true;
        }
        return false;
      } else {
        if (this.searchDateS) {
          //alert("entro en searchDateS");
          if (
            moment(date, "DD/MM/YYYY").diff(
              moment(this.searchDateS, "DD/MM/YYYY")
            ) >= 0
          ) {
            //alert("Es mayor");
            return true;
          }
          return false;
        } else {
          if (this.searchDateE) {
            if (
              moment(date, "DD/MM/YYYY").diff(
                moment(this.searchDateE, "DD/MM/YYYY")
              ) <= 0
            ) {
              return true;
            }
            return false;
          }
        }
      }
      return true;
    }
    /*LO HE USADO PARA HACER PRUEBAS
    prueba: function() {
      alert("searchDates " + this.searchDates + " length: ");
    }*/
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY, HH:mm");
    }
  }
  /*SE USA PARA EL GRID PARA PODER ORDENAR Y MOSTRAR LA CANTIDAD DE PÁGINAS
  provide: {
    grid: [Page, Sort]
  }*/
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

.centrado {
  align-content: center;
  align-items: center;
  text-align: center;
}

.center-block {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
