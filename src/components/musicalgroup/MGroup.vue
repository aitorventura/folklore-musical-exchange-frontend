<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Musical Group</h1>
    </div>
    <div v-if="mgroup === null">
      <h2>No user found at the moment</h2>
    </div>
    <!-- <div class="row"> -->
    <div class>
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
          <tr>
            <td>{{ mgroup.name }}</td>
            <td>{{ mgroup.email }}</td>
            <td>{{ mgroup.username }}</td>
            <td>{{ mgroup.city }}</td>
            <td>{{ mgroup.nameType }}</td>
            <td>{{ mgroup.description }}</td>
            <td>{{ mgroup.members }}</td>
            <td>{{ mgroup.image }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      mgroup: {}
    };
  },
  methods: {
    created() {
      this.id = this.$route.params.id;
      this.getMGroup();
    },
    getMGroup() {
      axios
        .get(`${server.baseURL}/musicalgroup/${this.id}`)
        .then(data => (this.mgroup = data.data));
    },

    navigate() {
      router.go(-1);
    }
  }
};
</script>
