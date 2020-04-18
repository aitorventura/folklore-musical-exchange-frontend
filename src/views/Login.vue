
<template>
<body>

  <br />
  <br />
  <br />
  <div id="app" class="bg-1">
    <div class="thumbnail">
      <h4>
        <strong>LOG IN</strong>
      </h4>
      <form id="create-post-form" @submit.prevent="login">
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

        <!--<div class="form-group col-md-4 pull-right">-->
        <button class="btn" data-toggle="modal" type="submit">Log in</button>
        <!--</div>-->
      </form>
    </div>
  </div>
</body>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import router from "../router"
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      let userData = {
        username: this.username,
        password: this.password,
      };
      this.__submitToServer(userData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/login`, data).then(data => {
        if(!data.data){
          alert("Incorrect user or password")
        } else { 
          localStorage.setItem("token", data.data.token)
          localStorage.setItem("role", data.data.role)
          localStorage.setItem("id", data.data.id)
          localStorage.setItem("listMusicalExchanges", data.data.listMusicalExchanges)
          console.log( data.data.listMusicalExchanges)

          router.push({ name: "Home" });
        }
      });
    }
  }
};
</script>