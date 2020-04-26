<template>
  <body>
    <br />
    <br />
    <br />
    <div class="container-fluid">
      <div class="text-center">
        <h1>Musical Exchange List</h1>

        <div v-if="musicalexchanges.length === 0">
          <h2>No user found at the moment</h2>
        </div>
      </div>

      <!-- Solo queda cambiar los valores de aquí y ya -->
      <div class>
        <div>
          <ejs-textbox
            id="textbox"
            v-model="searchPlace"
            floatLabelType="Never"
            showClearButton="true"
            placeholder="Search by place"
            width="200px"
          ></ejs-textbox>

          <!--<button v-on:click="prueba">Prueba</button>-->

          <ejs-datepicker
            v-model="searchDate"
            :placeholder="waterMark"
            :format="dateFormat"
            width="150px"
            hide="hideS"
          ></ejs-datepicker>

          <ejs-multiselect
            :id="searchMGroup"
            v-model="searchMGroup"
            :dataSource="mgroups"
            placeholder="Select an agrupation"
            mode="CheckBox"
            :fields="fields"
            :showSelectAll="showSelectAll"
            selectAllText="Seleccionar todos"
            unSelectAllText="Deseleccionar todos"
            width="300px"
          ></ejs-multiselect>
        </div>

        <!--<ejs-multiselect
          v-model="dateType"
          :dataSource="dateTypes"
          placeholder="Select how to search a date"
          :fields="fieldsDate"
          width="300px"
          :value="simple"
          :maximumSelectionLength="1"
        ></ejs-multiselect>-->

        <!--<ejs-splitbutton v-model="dateType" :items="dateTypes" :fields="fieldsDate" content="simple"></ejs-splitbutton>-->
        <!--<ejs-combobox
          v-model="dateType"
          :fields="fieldsDate"
          :dataSource="dateTypes"
          placeholder="Select how to search a date"
          width="300px"
        ></ejs-combobox>-->

        <!--
        <ejs-daterangepicker
          v-model="searchDates"
          :placeholder="placeholder"
          width="200px"
          format="dd/MM/yyyy"
        ></ejs-daterangepicker>
        -->

        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Primera Agrupación</th>
              <th scope="col">Segunda Agrupación</th>
              <th scope="col">Date</th>
              <th scope="col">Place</th>
              <th scope="col">Description</th>
              <th scope="col">Repertoire</th>
              <th scope="col">Needed Money</th>
              <th scope="col">Crowdfunding Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="musicalexchange in filterName" :key="musicalexchange.id">
              <td>{{ musicalexchange.nombreMA }}</td>
              <td>{{ musicalexchange.nombreMB }}</td>
              <td>
                <span>{{ musicalexchange.date | moment }}</span>
              </td>
              <!--<td>{{ musicalexchange.date }}</td>-->
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
                      >Edit Exchange</router-link
                    >

                    <router-link
                      :to="{
                        name: 'GetME',
                        params: { id: musicalexchange.id },
                      }"
                      class="btn btn-sm btn-outline-primary"
                      >Show Exchange</router-link
                    >

                    <button
                      class="btn btn-sm btn-outline-secondary"
                      v-on:click="deleteMGroup(musicalexchange.id)"
                    >
                      Delete Exchange
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script>
import { server } from "../helper";
import axios from "axios";
import moment from "moment";
//import moment from "moment-timezone";
//Vue.prototype.moment = moment;
// Load Locales ('en' comes loaded by default)
require("moment/locale/es");
// Choose Locale
moment.locale("es");
import Vue from "vue";
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { MultiSelect, CheckBoxSelection } from "@syncfusion/ej2-dropdowns";
MultiSelect.Inject(CheckBoxSelection);
Vue.use(MultiSelectPlugin);
import {
  DatePickerPlugin,
  DateRangePickerPlugin,
} from "@syncfusion/ej2-vue-calendars";
Vue.use(DatePickerPlugin);
import { TextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
Vue.use(TextBoxPlugin);
/*
import { SplitButtonPlugin } from "@syncfusion/ej2-vue-splitbuttons";
import { enableRipple } from "@syncfusion/ej2-base";
enableRipple(true);
Vue.use(SplitButtonPlugin);*/
import { ComboBoxPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(ComboBoxPlugin);
Vue.use(DateRangePickerPlugin);

export default {
  data() {
    return {
      musicalexchanges: [],
      mgroups: [],
      searchPlace: "",
      searchMGroup: [],
      searchDate: new Date(),
      fields: { text: "name", value: "name" },
      showSelectAll: true,
      waterMark: "Select a date",
      dateFormat: "dd-MM-yyyy",
      searchDates: null,
      fechas: [],
      /*
      dateType: "",
      dateTypes: [
        { name: "range", text: "Search between dates" },
        { name: "simple", text: "Search from a date" },
      ],
      fieldsDate: { text: "text", value: "name" },
      hideS: false, //
      hideR: false,*/
      placeholder: "Search between dates",
    };
  },
  created() {
    this.fetchMExchanges();
    this.getAgrupaciones();
  },
  computed: {
    filterName() {
      return this.musicalexchanges.filter((musicalexchange) => {
        return (
          musicalexchange.place
            .toLowerCase()
            .match(this.searchPlace.toLowerCase()) &&
          this.matchAgrupation(
            musicalexchange.nombreMA,
            musicalexchange.nombreMB
          ) &&
          this.filterByDate(
            moment(musicalexchange.date).format("DD/MM/YYYY, HH:mm")
          ) &&
          this.inRange(moment(musicalexchange.date).format("DD/MM/YYYY, HH:mm"))
        );
      });
    },
    showDate() {
      if (
        this.dateType === undefined ||
        this.dateType === null ||
        this.dateType === "simple"
      ) {
        //Seleccionar fecha simple
        return this.showSimple;
      } else {
        //Seleccionar rango de fechas
        return this.showRange;
      }
    },
  },
  methods: {
    fetchMExchanges() {
      axios
        .get(`${server.baseURL}/musicalexchange`)
        .then((data) => (this.musicalexchanges = data.data));
    },
    deleteMGroup(id) {
      axios.delete(`${server.baseURL}/musicalexchange/${id}`, {headers: {token: localStorage.token}}).then((data) => {
        window.location.reload();
      });
    },
    getAgrupaciones() {
      axios
        .get(`${server.baseURL}/musicalgroup`)
        .then((data) => (this.mgroups = data.data));
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
    }, //date es el valor que se compara de cada unos de los intercambios
    filterByDate(date) {
      if (
        moment(date, "DD/MM/YYYY").diff(moment(this.searchDate, "DD/MM/YYYY")) >
        0
      ) {
        return true;
      }
      return false;
    } /*
    showSimple() {
      this.hideS = true;
      this.hideR = false;
    },
    showRange() {
      this.hideR = true;
      this.hideS = false;
    },*/,
    inRange(date) {
      if (this.searchDates) {
        //alert(" : " + this.searchDates);
        this.fechas = this.searchDates.split(",");
        alert(this.searchDates.split(","));
        //alert("fechas[0]: " + moment(this.fechas[0], "DD/MM/YYYY"));
        if (
          moment(date, "DD/MM/YYYY").diff(
            moment(this.fechas[0], "DD/MM/YYYY")
          ) >= 0 &&
          moment(date, "DD/MM/YYYY").diff(
            moment(this.fechas[1], "DD/MM/YYYY")
          ) <= 0
        ) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    prueba: function() {
      alert("searchDates " + this.searchDates + " length: ");
    },
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY, HH:mm");
    },
  },
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
.wrap {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 20px 10px;
  width: 340px;
}
.wrapper {
  max-width: 250px;
  margin: 0 auto;
}
</style>
