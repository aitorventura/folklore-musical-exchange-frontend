<template>
<body>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create Person</h2>
      <form id="create-post-form" @submit.prevent="createPerson">
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
          <label for="title">Surname</label>
          <input
            type="text"
            id="surname"
            v-model="surname"
            name="title"
            class="form-control"
            placeholder="Enter surname"
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
          <button class="btn btn-success" type="submit">Create Username</button>
        </div>
      </form>
    </div>

  </div>
  </body>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
export default {
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
      city: "",
      image: ""
    };
  },
  methods: {
    createPerson() {
      let personData = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        password: this.password,
        email: this.email,
        city: this.city,
        image: this.image
      };
      this.__submitToServer(personData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/person/create`, data).then(data => {
        router.push({ name: "home" });
      });
    }
  }
};
</script>