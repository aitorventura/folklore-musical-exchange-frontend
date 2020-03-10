<template>
    <div class="container-fluid">

      <div class="text-center">
        <h1> User List </h1>

       <div v-if="users.length === 0">
            <h2> No user found at the moment </h2>
        </div>
      </div>
       
      <!-- <div class="row"> -->
        <div class="">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Password</th>
                  <th scope="col">Email</th>
                  <th scope="col">City</th>
                  <th scope="col">Image</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user._id">
                  <td>{{ user.username }}</td>
                  <td>{{ user.password }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.city }}</td>
                  <td>{{ user.image }}</td>
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
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get(`${server.baseURL}/user/users`)
        .then(data => (this.users = data.data));
    },
    deleteUser(id) {
      axios
        .delete(`${server.baseURL}/user/delete?userID=${id}`)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  }
};
</script>