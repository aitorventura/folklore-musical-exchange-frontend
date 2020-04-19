<template>
<body>
  <br />
  <br />
  <br />
  <div class="container-fluid">
    <div class="text-center">
      <h1>Musical Exchange List</h1>

      <div v-if="musicalexchanges.length === 0">
        <h2>No user found at the moment</h2>
      </div>
    </div>

    <!-- Solo queda cambiar los valores de aquí y ya -->
    <div class>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Primera Agrupación</th>
            <th scope="col">Segunda Agrupación</th>
            <th scope="col">Date</th>
            <th scope="col">Place</th>
            <th scope="col">Description</th>
            <th scope="col">Repertoire</th>
            <th scope="col">Needed Money</th>
            <th scope="col">Crowdfunding Link</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="musicalexchange in musicalexchanges" :key="musicalexchange.id">
            <td>{{ musicalexchange.nombreMA }}</td>
            <td>{{ musicalexchange.nombreMB }}</td>
            <td>
              <span>{{ musicalexchange.date | moment }}</span>
            </td>
            <!--<td>{{ musicalexchange.date }}</td>-->
            <td>{{ musicalexchange.place }}</td>
            <td>{{ musicalexchange.description }}</td>
            <td>{{ musicalexchange.repertoire }}</td>
            <td>{{ musicalexchange.neededMoney }}</td>
            <td>{{ musicalexchange.crowdfundingLink }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{ name: 'EditME', params: { id: musicalexchange.id } }"
                    class="btn btn-sm btn-outline-secondary"
                  >Edit Exchange</router-link>

                  <router-link
                    :to="{ name: 'GetME', params: { id: musicalexchange.id } }"
                    class="btn btn-sm btn-outline-primary"
                  >Show Exchange</router-link>

                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteMGroup(musicalexchange.id)"
                  >Delete Exchange</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- </div> -->
  </div>
</body>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import moment from "moment";
//import moment from "moment-timezone";
//Vue.prototype.moment = moment;
// Load Locales ('en' comes loaded by default)
require("moment/locale/es");
// Choose Locale
moment.locale("es");

export default {
  data() {
    return {
      musicalexchanges: []
    };
  },
  created() {
    this.fetchMExchanges();
  },
  methods: {
    fetchMExchanges() {
      axios
        .get(`${server.baseURL}/musicalexchange`)
        .then(data => (this.musicalexchanges = data.data));
    },
    deleteMGroup(id) {
      axios.delete(`${server.baseURL}/musicalexchange/${id}`).then(data => {
        window.location.reload();
      });
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY, HH:mm");
    }
  }
};
</script>
