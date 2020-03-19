<template>
  <div>
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
           
        <div class="form-group col-md-12">
          <label for="title">NameType</label>
          <input
            type="text"
            id="nametype"
            v-model="nametype"
            name="title"
            class="form-control"
            placeholder="Group type"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Userame</label>
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
          <label for="title">City</label>
          <input
            type="text"
            id="city"
            v-model="city"
            name="title"
            class="form-control"
            placeholder="Enter city"
            required
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
      description: "",
      members: "",
      nametype: "",
      username: "",
      password: "",
      email: "",
      city: "",
      image: ""
    };
  },
  methods: {
    createMusicalGroup() {
      let data = {
        name: this.name,
        description: this.description,
        members: this.members,
        nametype: this.nametype,
        username: this.username,
        password: this.password,
        email: this.email,
        city: this.city,
        image: this.image
      };
      this.__submitToServer(data);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/musicalgroup/create`, data).then(data => {
        router.push({ name: "home" });
      });
    }
  }
};
</script>