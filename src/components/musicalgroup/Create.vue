<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">View All Musicals Groups</button>
      </small>
    </h4>

    <div class="col-md-12 form-wrapper">
      <h2>Create Musical Group</h2>
      <form id="create-post-form" @submit.prevent="createMusicalGroup">
        <div class="form-group col-md-12">
          <label for="title">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            name="title"
            class="form-control"
            placeholder="Enter name"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            name="title"
            class="form-control"
            placeholder="Enter username"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            name="title"
            class="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Email</label>
          <input
            type="text"
            id="email"
            v-model="email"
            name="title"
            class="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Description</label>
          <input
            type="text"
            id="description"
            v-model="description"
            name="title"
            class="form-control"
            placeholder="Description"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Members</label>
          <input
            type="number"
            id="members"
            v-model="members"
            name="title"
            class="form-control"
            placeholder="Members"
            required
          />
        </div>
        <!-- Si no queréis que esté centrado quitadle el align="center"-->
        <div class="form-group col-md-12" align="center">
          <label for="title">NameType</label>
          <br />
          <tr>
            <select v-model="nameType" id="nameType">
              <option v-for="type in nameTypes" :key="type.name">{{type.name}}</option>
            </select>
          </tr>
        </div>

        <div class="form-group col-md-12">
          <label for="title">City</label>
          <input
            type="text"
            id="city"
            v-model="city"
            name="title"
            class="form-control"
            placeholder="Enter city"
            value="mgroup.city"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Image</label>
          <input type="file" id="image" name="title" class="form-control" placeholder="Enter image" />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create Musical group</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      email: "",
      description: "",
      members: "",
      nametype: "",
      city: "",
      image: "",
      nameTypes: {}
    };
  },
  created() {
    this.getNameTypes();
  },
  methods: {
    createMusicalGroup() {
      let mgroupData = {
        name: this.mgroup.name,
        username: this.mgroup.username,
        password: this.password,
        email: this.mgroup.email,
        description: this.mgroup.description,
        members: this.mgroup.members,
        nametype: this.mgroup.nametype,
        city: this.mgroup.city,
        image: this.mgroup.image
      };
      this.__submitToServer(mgroupData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/musicalgroup/create`, data).then(data => {
        router.push({ name: "home" });
      });
    },
    getNameTypes() {
      console.log("Entro en getNameTypes() en edit.vue");
      axios
        .get(`${server.baseURL}/type`)
        .then(data => (this.nameTypes = data.data));
    }
  }
};
</script>