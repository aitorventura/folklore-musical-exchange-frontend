<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>People List</h1>

      <div v-if="people.length === 0">
        <h2>No user found at the moment</h2>
      </div>
    </div>

    <!-- <div class="row"> -->
    <div class>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in people" :key="person.id">
            <td>{{ person.name }}</td>
            <td>{{ person.surname }}</td>
            <td>{{ person.username }}</td>
            <td>{{ person.email }}</td>
            <td>{{ person.city }}</td>
            <td>{{ person.image }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{ name: 'Edit', params: { id: person.id } }"
                    class="btn btn-sm btn-outline-secondary"
                  >Edit person</router-link>

                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deletePerson(person.id)"
                  >Delete Person</button>
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
      people: []
    };
  },
  created() {
    this.fetchPeople();
  },
  methods: {
    fetchPeople() {
      axios
        .get(`${server.baseURL}/person`)
        .then(data => (this.people = data.data));
    },
    deletePerson(id) {
      axios.delete(`${server.baseURL}/person/${id}`).then(data => {
        console.log(data);
        window.location.reload();
      });
    }
  }
};
</script>
