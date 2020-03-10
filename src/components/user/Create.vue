<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Create User </h2>
          <form id="create-post-form" @submit.prevent="createUser">
               <div class="form-group col-md-12">
                <label for="title"> Userame </label>
                <input type="text" id="username" v-model="username" name="title" class="form-control" placeholder="Enter username" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"> Password </label>
                <input type="password" id="password" v-model="password" name="title" class="form-control" placeholder="Enter password" required>
               </div>

             <div class="form-group col-md-12">
                <label for="title"> Email </label>
                <input type="text" id="email" v-model="email" name="title" class="form-control" placeholder="Enter email" required>
            </div>

             <div class="form-group col-md-12">
                <label for="title"> City </label>
                <input type="text" id="city" v-model="city" name="title" class="form-control" placeholder="Enter city" required>
            </div>

             <div class="form-group col-md-12">
                <label for="title"> Image </label>
                <input type="file" id="image"  name="title" class="form-control" placeholder="Enter image">
            </div>


              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create User </button>
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
};
</script>