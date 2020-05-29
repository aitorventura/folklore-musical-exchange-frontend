<template>
<body>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">View All Musicals Exchanges</button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Edit Musical Exchange</h2>
      <form id="create-post-form" @submit.prevent="editMusicalExchange">
        <div class="form-group col-md-12">
          <label for="title">Date</label>
          <input
            type="datetime-local"
            id="date"
            v-model="musicalexchange.date"
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
            v-model="musicalexchange.place"
            maxlength="50"
            name="title"
            class="form-control"
            placeholder="Enter place"
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
            v-model="musicalexchange.description"
            name="title"
            class="form-control"
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div class="form-group col-md-12">
          <label for="title">Repertoire</label>
          <textarea
            rows="4"
            cols="50"
            type="textarea"
            id="repertoire"
            maxlength="255"
            v-model="musicalexchange.repertoire"
            name="title"
            class="form-control"
            placeholder="Enter repertoire"
          ></textarea>
        </div>

        <div class="form-group col-md-12">
          <label for="title">Needed money</label>
          <input
            type="number"
            id="neededMoney"
            min="0"
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
            maxlength="255"
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
</body>
</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
import moment from "moment";
// Load Locales ('en' comes loaded by default)
require("moment/locale/es");
// Choose Locale
moment.locale("es");

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
          musicalexchangeData, {headers: {token: localStorage.token}}
        )
        .then(data => {
          router.push({ name: "MusicalExchangeList" });
        });
    },
    getMusicalExchange() {
      //TODO: Revisar tipos: https://momentjs.com/docs/
      //Mirar si coincide en la BBDD con lo que muestra en el list, y lo que muestra en el edit (Creo que la hora cambiaba)
      axios
        .get(`${server.baseURL}/musicalexchange/${this.id}`)
        .then(
          data => (
            (this.musicalexchange = data.data),
            (this.musicalexchange.date = moment().format(
              this.musicalexchange.date.substring(0, 16),
              "YYYY/MM/DD HH:mm"
            ))
          )
        );
    },
    getNameTypes() {
      axios
        .get(`${server.baseURL}/type`)
        .then(data => (this.nameTypes = data.data));
    }
  }
};
</script>
