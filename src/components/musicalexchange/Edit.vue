<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">View All Musicals Exchanges</button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Edit Musical Exchange</h2>
      <form id="create-post-form" @submit.prevent="editMusicalExchange">
        <!-- Si no queréis que esté centrado quitadle el align="center"-->
        <div class="form-group col-md-12" align="center">
          <label for="title">idMGroupA</label>
          <br />
          <tr>
            <select v-model="musicalexchange.idMGroupA" id="idMGroupA">
              <option v-for="mgroup in mgroups" :key="mgroup.id" :value="mgroup.id">{{mgroup.name}}</option>
            </select>
          </tr>
        </div>

        <!-- Si no queréis que esté centrado quitadle el align="center"-->
        <div class="form-group col-md-12" align="center">
          <label for="title">idMGroupB</label>
          <br />
          <tr>
            <select v-model="musicalexchange.idMGroupB" id="idMGroupB">
              <option v-for="mgroup in mgroups" :key="mgroup.id" :value="mgroup.id">{{mgroup.name}}</option>
            </select>
          </tr>
        </div>

        <div class="form-group col-md-12">
          <label for="title">Date</label>
          <input
            type="datetime-local"
            id="date"
            v-model="musicalexchange.date"
            class="form-control"
            step="1"
            placeholder="Enter date"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Place</label>
          <input
            type="text"
            id="place"
            v-model="musicalexchange.place"
            name="title"
            class="form-control"
            placeholder="Enter place"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Description</label>
          <input
            type="text"
            id="description"
            v-model="musicalexchange.description"
            name="title"
            class="form-control"
            placeholder="Description"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Repertoire</label>
          <input
            type="text"
            id="repertoire"
            v-model="musicalexchange.repertoire"
            name="title"
            class="form-control"
            placeholder="Enter repertoire"
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Needed money</label>
          <input
            type="number"
            id="neededMoney"
            v-model="musicalexchange.neededMoney"
            name="title"
            class="form-control"
            placeholder="Needed money"
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Crowdfunding link</label>
          <input
            type="texto"
            id="crowdfundingLink"
            v-model="musicalexchange.crowdfundingLink"
            name="title"
            class="form-control"
            placeholder="Crowdfunding link"
          />
        </div>

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
      musicalexchange: {},
      nameTypes: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMusicalExchange();
    this.getNameTypes();
  },
  methods: {
    editMusicalExchange() {
      let musicalexchangeData = {
        idMGroupA: this.musicalexchange.idMGroupA,
        idMGroupB: this.musicalexchange.idMGroupB,
        date: this.musicalexchange.date,
        place: this.musicalexchange.place,
        description: this.musicalexchange.description,
        repertoire: this.musicalexchange.repertoire,
        neededMoney: this.musicalexchange.neededMoney,
        crowdfundingLink: this.musicalexchange.crowdfundingLink
      };
      axios
        .put(
          `${server.baseURL}/musicalexchange/${this.id}`,
          musicalexchangeData
        )
        .then(data => {
          router.push({ name: "home" });
        });
    },
    getMusicalExchange() {
      axios
        .get(`${server.baseURL}/musicalexchange/${this.id}`)
        .then(data => (this.musicalexchange = data.data));
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