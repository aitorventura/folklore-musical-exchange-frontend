<template>
<body>
  <br />
  <div class="container" id="margin">
    <div class="thumbnail col-md-12 form-wrapper" id="centro">
     
    <div class="col-md-12 form-wrapper">
      <h2>Editar perfil</h2>
      <br />
      <br />
      <form id="create-post-form" @submit.prevent="editMGroup">
        <div class="form-group col-md-12">
          <label for="title">Name</label>
          <input
            type="text"
            id="name"
            v-model="mgroup.name"
            maxlength="50"
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
            maxlength="15"
            v-model="mgroup.username"
            name="title"
            class="form-control"
            placeholder="Enter username"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Email</label>
          <input
            type="text"
            id="email"
            maxlength="30"
            v-model="mgroup.email"
            name="title"
            class="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Description</label>
          <textarea
            rows="4"
            cols="50"
            type="textarea"
            id="description"
            maxlength="255"
            v-model="mgroup.description"
            name="title"
            class="form-control"
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div class="form-group col-md-12">
          <label for="title">Members</label>
          <input
            type="number"
            id="members"
            min="1"
            v-model="mgroup.members"
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
            <select v-model="mgroup.nameType" id="mgroup.nameType">
              <option v-for="type in nameTypes" :key="type.name">{{type.name}}</option>
            </select>
          </tr>
        </div>

        <div class="form-group col-md-12">
          <label for="title">City</label>
          <input
            type="text"
            id="city"
            v-model="mgroup.city"
            name="title"
            class="form-control"
            placeholder="Enter city"
            maxlength="80"
            value="mgroup.city"
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

          <br>
            <h2> Current profile picture: </h2>
             <img v-bind:src="mgroup.image" height="400" width="400"/>
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Guardar cambios</button>
        </div>
      </form>
    </div>
    </div>
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
      mgroup: {},
      nameTypes: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMGroup();
    this.getNameTypes();
  },
  methods: {
    editMGroup() {
      let mgroupData = {
        name: this.mgroup.name,
        username: this.mgroup.username,
        email: this.mgroup.email,
        description: this.mgroup.description,
        members: this.mgroup.members,
        nameType: this.mgroup.nameType,
        city: this.mgroup.city,
        image: this.image,

      };
      axios
        .put(`${server.baseURL}/musicalgroup/${this.id}`, mgroupData, {headers: {token: localStorage.token}})
        .then(data => {
          if (data.data === 0) {
            router.push({ name: "GetMG" });
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
              }
            }
          }
        });
    },
    getMGroup() {
      axios
        .get(`${server.baseURL}/musicalgroup/${this.id}`)
        .then(data => (this.mgroup = data.data));
    },

    getNameTypes() {
      axios
        .get(`${server.baseURL}/type`)
        .then(data => (this.nameTypes = data.data));
    }, onFileChange(e) {

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
      console.log(image)
      this.image = image;
    },

    navigate() {
      router.go(-1);
    }
  }
};
</script>

<style scoped>
td {
  padding: 3px;
}
.thumbnail {
  line-height: 100%;
  border-color: #fff;
  border-left-width: 1cm;
  border-right-width: 1cm;
}
#margin {
  margin-left: 2cm;
  margin-right: 2cm;
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
  /*height: 100vh;*/
  height: 100%;
  width: 100%;
  padding: 0;
  
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
}
.btn {
  padding: 6px 15px;
  background-color: #333;
  color: #f1f1f1;
  border-radius: 0;
  transition: 0.2s;
}
.btn:hover,
.btn:focus {
  border: 1px solid #333;
  background-color: #fff;
  color: #000;
}
</style>