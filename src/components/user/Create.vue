<template>
 <!-- <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create User</h2>
      <form id="create-post-form" @submit.prevent="createUser">
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
          <button class="btn btn-success" type="submit">Create User</button>
        </div>
      </form>
    </div>
  </div>-->

  <body>
  <br />
  <br />
  <br />

  <div class="thumbnail">
    <h3>
      <strong>REGISTER</strong>
    </h3>
    <br />
      <div class="col-md-6 p-3">
         <p>Are you an interested person in musical exchanges?</p>
          <a href="/person/create">Click here to register as a person</a>
      </div>

      <div class="col-md-6 p-3">
        <p>Are you a musical group interested in musical exchanges?</p>
        <a href="/musicalgroup/create">Click here to register as a person</a>
      </div>
     <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  
  </div>
</body>
          
</template>


<style scoped>
.thumbnail {
  line-height: 100%;
  border-color: #fff;
  border-left-width: 0.5cm;
  border-right-width: 0.5cm;
}
#centro {
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
body {
  font: 400 15px/1.8 Lato, sans-serif;
  color: #777;
  background-color: #2d2d30;
  height: 100vh;
  /*height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;*/
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
}
</style>

<script>
/*import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      city: "",
      image: ""
    };
  },
  methods: {
    createUser() {
      let userData = {
        username: this.username,
        password: this.password,
        email: this.email,
        city: this.city,
        image: this.image
      };
      this.__submitToServer(userData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/user/create`, data).then(data => {
        router.push({ name: "home" });
      });
    }
  }
};*/
</script>