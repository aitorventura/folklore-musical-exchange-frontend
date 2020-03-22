<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Musical Group List</h1>

      <div v-if="mgroups.length === 0">
        <h2>No user found at the moment</h2>
      </div>
    </div>

    <!-- <div class="row"> -->
    <div class>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">NameType</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mgroup in mgroups" :key="mgroup.id">
            <td>{{ mgroup.name }}</td>
            <td>{{ mgroup.username }}</td>
            <td>{{ mgroup.email }}</td>
            <td>{{ mgroup.city }}</td>
            <td>{{ mgroup.nameType }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{ name: 'EditMG', params: { id: mgroup.id } }"
                    class="btn btn-sm btn-outline-secondary"
                  >Edit MGroup</router-link>

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
</template>

<script>
import { server } from "../helper";
import axios from "axios";
export default {
  data() {
    return {
      mgroups: []
    };
  },
  created() {
    this.fetchMGroups();
  },
  methods: {
    fetchMGroups() {
      axios
        .get(`${server.baseURL}/musicalgroup`)
        .then(data => (this.mgroups = data.data));
    },
    deleteMGroup(id) {
      axios.delete(`${server.baseURL}/musicalgroup/${id}`).then(data => {
        console.log(data);
        window.location.reload();
      });
    }
  }
};
</script>
