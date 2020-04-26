<template>
  <body>
    <br />
    <br />
    <br />
    <div class="container-fluid">
      <div class="text-center">
        <h1>Person</h1>
      </div>
      <div v-if="person.id === null">
        <h2>No user found at the moment</h2>
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
            <tr>
              <td>{{ person.name }}</td>
              <td>{{ person.surname }}</td>
              <td>{{ person.username }}</td>
              <td>{{ person.email }}</td>
              <td>{{ person.city }}</td>
              <td>{{ person.image }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- </div> -->
      <div></div>
    </div>
  </body>
</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      person: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPerson();
  },
  methods: {
    getPerson() {
      axios
        .get(`${server.baseURL}/person/${this.id}` , {headers: {token: localStorage.token}})
        .then(data => (this.person = data.data));
    },
    /* getSubscription() {
      axios
        .get(`${server.baseURL}/person/${this.id}`)
        .then(data => (this.subscriptions = data.data));
    },*/

    navigate() {
      router.go(-1);
    }
  }
};
</script>
