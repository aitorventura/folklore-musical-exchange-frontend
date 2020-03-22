<template>
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
          <input
            type="text"
            id="description"
            v-model="mgroup.description"
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
            v-model="mgroup.members"
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
            id="nameType"
            v-model="mgroup.nameType"
            name="title"
            class="form-control"
            placeholder="Group type"
            required
          />
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
        <!--
        <div class="form-group col-md-12">
          <label for="title">Image</label>
          <input type="file" id="image" name="title" class="form-control" placeholder="Enter image" />
        </div>
        -->
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Edit musical group</button>
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
      mgroup: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMGroup();
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
        .put(`${server.baseURL}/musicalgroup/${this.id}`, mgroupData)
        .then(data => {
          router.push({ name: "home" });
        });
    },
    getMGroup() {
      axios
        .get(`${server.baseURL}/musicalgroup/${this.id}`)
        .then(data => (this.mgroup = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>