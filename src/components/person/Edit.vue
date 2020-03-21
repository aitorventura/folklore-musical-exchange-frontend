<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">View All People</button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Edit Person</h2>
      <form id="create-post-form" @submit.prevent="editPerson">
        <div class="form-group col-md-12">
          <label for="title">Name</label>
          <input
            type="text"
            id="name"
            v-model="person.name"
            name="title"
            class="form-control"
            placeholder="Enter name"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Surname</label>
          <input
            type="text"
            id="surname"
            v-model="person.surname"
            name="title"
            class="form-control"
            placeholder="Enter surname"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Username</label>
          <input
            type="text"
            id="username"
            v-model="person.username"
            name="title"
            class="form-control"
            placeholder="Enter username"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Email</label>
          <input
            type="text"
            id="email"
            v-model="person.email"
            name="title"
            class="form-control"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">City</label>
          <input
            type="text"
            id="city"
            v-model="person.city"
            name="title"
            class="form-control"
            placeholder="Enter city"
            value="person.city"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title">Image</label>
          <input type="file" id="image" name="title" class="form-control" placeholder="Enter image" />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Edit person</button>
        </div>
      </form>
    </div>
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
      person: {




      }
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPerson();
  },
  methods: {
    editPerson() {
      let personData = {
        username: this.person.username,
        city: this.person.city,
        image: this.person.image,
        name: this.person.name,
        surname: this.person.surname,
        email: this.person.email
      };
      axios
        .put(`${server.baseURL}/person/${this.id}`, personData)
        .then(data => {
          router.push({ name: "home" });
        });
    },
    getPerson() {
      axios
        .get(`${server.baseURL}/person/${this.id}`)
        .then(data => (this.person = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>