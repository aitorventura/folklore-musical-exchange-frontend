<template>
<body>
  <br />
  <br />
  <br />
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">View All Musicals Groups</button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Edit Musical Group</h2>
      <form id="create-post-form" @submit.prevent="editMGroup">
        <div class="form-group col-md-12">
          <label for="title">Name</label>
          <input
            type="text"
            id="name"
            v-model="mgroup.name"
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
            value="mgroup.city"
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Image</label>
          <input type="file" id="image" name="title" class="form-control" placeholder="Enter image" />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Edit musical group</button>
        </div>
      </form>
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
        image: this.mgroup.image
      };
      axios
        .put(`${server.baseURL}/musicalgroup/${this.id}`, mgroupData, {headers: {token: localStorage.token}})
        .then(data => {
          if (data.data === 0) {
            router.push({ name: "MusicalExchangeList" });
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
              /*
              else {
                if (data.data === 3){
                  alert("Error al crear el usuario");
                }
                else {
                if (data.data === 4){
                  alert("Error al crear la agrupación");
                }
              }
              }
              */
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
    },

    navigate() {
      router.go(-1);
    }
  }
};
</script>