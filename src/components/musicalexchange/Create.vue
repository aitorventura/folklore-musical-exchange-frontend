<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">View All Musicals Exchanges</button>
      </small>
    </h4>

    <div class="col-md-12 form-wrapper">
      <h2>Create Musical Exchange</h2>
      <form id="create-post-form" @submit.prevent="createMusicalExchange">
        <!-- Si no queréis que esté centrado quitadle el align="center"-->
        <div class="form-group col-md-12" align="center">
          <label for="title">idMGroupA</label>
          <br />
          <tr>
            <select v-model="idMGroupA" id="idMGroupA">
              <option v-for="mgroup in mgroups" :key="mgroup.id" :value="mgroup.id">{{mgroup.name}}</option>
            </select>
          </tr>
        </div>

        <!-- Si no queréis que esté centrado quitadle el align="center"-->
        <div class="form-group col-md-12" align="center">
          <label for="title">idMGroupB</label>
          <br />
          <tr>
            <select v-model="idMGroupB" id="idMGroupB">
              <option v-for="mgroup in mgroups" :key="mgroup.id" :value="mgroup.id">{{mgroup.name}}</option>
            </select>
          </tr>
        </div>

        <div class="form-group col-md-12">
          <label for="title">Date</label>
          <input
            type="datetime-local"
            id="date"
            v-model="date"
            min="2020-01-01T00:00:00"
            max="2030-12-31T23:59:59"
            class="form-control"
            placeholder="Enter date"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Place</label>
          <input
            type="text"
            id="place"
            v-model="place"
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
            v-model="description"
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
            v-model="repertoire"
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
            v-model="neededMoney"
            name="title"
            class="form-control"
            min="0"
            placeholder="0"
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Crowdfunding link</label>
          <input
            type="texto"
            id="crowdfundingLink"
            v-model="crowdfundingLink"
            name="title"
            class="form-control"
            placeholder="Crowdfunding link"
          />
        </div>

        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create Musical exchange</button>
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
      idMGroupA: "",
      idMGroupB: "",
      date: "",
      place: "",
      description: "",
      repertoire: "",
      neededMoney: "",
      crowdfundingLink: "",
      mgroups: {}
    };
  },
  created() {
    this.getMGroups();
  },
  methods: {
    createMusicalExchange() {
      let musicalexchangeData = {
        idMGroupA: this.idMGroupA,
        idMGroupB: this.idMGroupB,
        date: this.date,
        place: this.place,
        description: this.description,
        repertoire: this.repertoire,
        neededMoney: this.neededMoney,
        crowdfundingLink: this.crowdfundingLink
      };
      this.__submitToServer(musicalexchangeData);
    },
    __submitToServer(data) {
      if (this.idMGroupA == this.idMGroupB) {
        alert("No puedes realizar un intercambio contigo mismo");
      } else {
        axios
          .post(`${server.baseURL}/musicalexchange/create`, data)
          .then(data => {
            router.push({ name: "home" });
          });
      }
    },
    getMGroups() {
      axios
        .get(`${server.baseURL}/musicalgroup`)
        .then(data => (this.mgroups = data.data));
    }
  }
};
</script>