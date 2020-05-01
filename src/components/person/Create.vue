<template>
<body>
  <br />
  <br />
  <br />
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
          <input
            type="file"
            id="image"
            @change="onFileChange"
            name="title"
            class="form-control"
            placeholder="Enter image"
            accept="image/*"
            multiple="false"
          />
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
     onFileChange(e) {
      //this.image = e.target.files[0];
      //console.log("Nombre imagen: ", this.image.name);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
      this.image = image;
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/person/create`, data).then(data => {
        if (data.data === 0) {
          router.push({ name: "Home" });
        } else {
          if (data.data === 1) {
            alert(
              "El correo que quiere usar ya está registrado en la plataforma, por favor, pruebe con otro."
            );
          } else {
            if (data.data === 2) {
              alert(
                "El usuario que quiere emplear ya está registrado en la plataforma, por favor, pruebe con otro."
              );
            } else {
              if (data.data === 3) {
                alert("Error al crear el usuario");
              } else {
                if (data.data === 4) {
                  alert("Error al crear la persona");
                }
              }
            }
          }
        }
      });
    }
  }
};
</script>