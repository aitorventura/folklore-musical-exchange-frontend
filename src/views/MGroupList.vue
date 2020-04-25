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
      <div>
        <input type="text" v-model="searchName" placeholder="Search by name" style="margin: 10px" />
        <input type="text" v-model="searchCity" placeholder="Search by city" style="margin: 10px" />

        <ejs-multiselect
          :id="searchType"
          v-model="searchType"
          :dataSource="nameTypes"
          placeholder="Select a type"
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
            <td>
              <img v-bind:src="mgroup.image" />
              <!--<img v-bind: charset="UTF-8" src="mgroup.image" />-->
            </td>
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

<style>
@import url(http://cdn.syncfusion.com/ej2/material.css);
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
</style>
