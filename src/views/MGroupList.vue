<template>
<body>
  <br />
  <br />
  <br />
  <div class="container-fluid">
    <div class="text-center">
      <h1>Musical Group List</h1>

      <div v-if="mgroups.length === 0">
        <h2>No user found at the moment</h2>
      </div>
    </div>

    <!-- <div class="row"> -->
    <div class>
      <input type="text" v-model="searchName" placeholder="Search by name" style="margin: 10px" />
      <input type="text" v-model="searchCity" placeholder="Search by city" style="margin: 10px" />
      <input type="text" v-model="searchType" placeholder="Search by city" style="margin: 10px" />
      <ejs-multiselect
        :id="searchType"
        v-model="searchTypeA"
        :dataSource="nameTypes"
        placeholder="Select a type"
        mode="CheckBox"
        :fields="fields"
        :showSelectAll="showSelectAll"
        selectAllText="Select All"
        unSelectAllText="Unselect All"
      ></ejs-multiselect>
      <!--<button v-on:click="mostrarValor">Valor</button>-->

      <!--:maximumSelectionLength="maximumSelectionLength"-->
      <!--<input type="text" v-model="searchType" placeholder="Search by type" style="margin: 10px" />-->
      <select v-model="searchTypeA" :options="nameTypes" id="nameType">
        <option v-for="type in nameTypes" :key="type.name">
          {{
          type.name
          }}
        </option>
      </select>

      <!--b-dropdown id="dropdown-1" text="Select a group type">
        <b-dropdown-item>Charanga</b-dropdown-item>
        <b-dropdown-item>Rondalla</b-dropdown-item>
        <b-dropdown-item>Orquesta</b-dropdown-item>
        <b-dropdown-item>Banda</b-dropdown-item>
      </b-dropdown-->
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">City</th>
            <th scope="col">NameType</th>
            <th scope="col">Description</th>
            <th scope="col">Members</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mgroup in filterName" :key="mgroup.id">
            <td>{{ mgroup.name }}</td>
            <td>{{ mgroup.email }}</td>
            <td>{{ mgroup.username }}</td>
            <td>{{ mgroup.city }}</td>
            <td>{{ mgroup.nameType }}</td>
            <td>{{ mgroup.description }}</td>
            <td>{{ mgroup.members }}</td>
            <td>{{ mgroup.image }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{ name: 'EditMG', params: { id: mgroup.id } }"
                    class="btn btn-sm btn-outline-secondary"
                  >Edit MGroup</router-link>
                  <router-link
                    :to="{ name: 'GetMG', params: { id: mgroup.id } }"
                    class="btn btn-sm btn-outline-primary"
                  >Show MGroup</router-link>

                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteMGroup(mgroup.id)"
                  >Delete MGroup</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- </div> -->
  </div>
</body>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import Vue from "vue";
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { MultiSelect, CheckBoxSelection } from "@syncfusion/ej2-dropdowns";
MultiSelect.Inject(CheckBoxSelection);

Vue.use(MultiSelectPlugin);

export default {
  data() {
    return {
      mgroups: [],
      searchName: "",
      searchCity: "",
      searchType: [],
      searchType1: [],
      searchTypeA: [],
      nameTypes: [],
      fields: { text: "name", value: "name" },
      /*maximumSelectionLength: "",*/
      showSelectAll: true
    };
  },
  created() {
    this.fetchMGroups();
    this.getNameTypes();
  },
  computed: {
    filterName() {
      return this.mgroups.filter(mgroup => {
        //TODO: Se ha de buscar alguna manera para que coincida con toda la array, no sé si se usa match o no
        //https://stackoverflow.com/questions/49895936/vue-js-how-to-split-string-to-array-and-use-in-v-for-list-renderer
        return (
          mgroup.name.toLowerCase().match(this.searchName.toLowerCase()) &&
          mgroup.city.toLowerCase().match(this.searchCity.toLowerCase()) &&
          mgroup.nameType.match(this.searchTypeA)
          //this.searchNameTypes()
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
    deleteMGroup(id) {
      axios.delete(`${server.baseURL}/musicalgroup/${id}`).then(data => {
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
    searchNameTypes() {
      if (this.searchTypeA.length != 0) {
        //alert("searchNameTypes");
        //var length = this.searchTypeA.length;
        //alert("lenght: " + this.searchTypeA.length);
        for (var i = 0; i < this.searchTypeA.length; i++) {
          //this.searchType1 = this.mgroups.nameType.match(this.searchTypeA[i]);
          alert(
            "SearchaType 1: " + this.mgroups.nameType.match(this.searchTypeA[i])
          );
          for (
            var j = 0;
            j < this.mgroups.nameType.match(this.searchTypeA[i]).length;
            j++
          ) {
            this.searchType.push(
              this.mgroups.nameType.match(this.searchTypeA[i])[j]
            );
          }
          //alert("Search name types: " + this.searchType);
          return this.searchType;
        }
      } else {
        return this.mgroups;
      }
    }
  }
};
</script>

<style>
@import url(http://cdn.syncfusion.com/ej2/material.css);
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
</style>
