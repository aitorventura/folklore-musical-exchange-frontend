<template>
<body>
  <div class="container">
    <!--div class="text-center">
      <h1>Musical Group</h1>
    </div-->
    <div v-if="musicalexchange.id === null">
      <h2>No musical exchange found at the moment</h2>
    </div>
    <!-- <div class="row"> -->
    <div class="thumbnail">
      <div class="container">
        <!--table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">idMGroupA</th>
            <th scope="col">idMGroupB</th>
            <th scope="col">Date</th>
            <th scope="col">Place</th>
            <th scope="col">Description</th>
            <th scope="col">Repertoire</th>
            <th scope="col">Needed Money</th>
            <th scope="col">Crowdfunding Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ musicalexchange.idMGroupA }}</td>
            <td>{{ musicalexchange.idMGroupB }}</td>
            <td>{{ musicalexchange.date }}</td>
            <td>{{ musicalexchange.place }}</td>
            <td>{{ musicalexchange.description }}</td>
            <td>{{ musicalexchange.repertoire }}</td>
            <td>{{ musicalexchange.neededMoney }}</td>
            <td>{{ musicalexchange.crowdfundingLink }}</td>
          </tr>
        </tbody-->

        <div class="row">
          <div class="col-6">
            <img v-bind:src="hostMusicalGroup.image" height="300" width="300" />
            <p>Anfitrión: {{ hostMusicalGroup.name }}</p>
            <p>Fecha: {{ musicalexchange.date }}</p>
            <p>Descripción: {{ musicalexchange.description }}</p>
          </div>
          <div class="col-6">
            <img v-bind:src="invitedMusicalGroup.image" height="300" width="300" />
            <p>Invitado: {{ invitedMusicalGroup.name }}</p>
            <p>Lugar: {{ musicalexchange.place }}</p>
            <p>Repertorio: {{ musicalexchange.repertoire }}</p>
          </div>
        </div>
        <!--tr>
          <td>Anfitrión: {{ hostMusicalGroup.name }}</td>
          <td>Invitado: {{ invitedMusicalGroup.name }}</td>
        </tr>
        <tr>
          <td>Fecha: {{ musicalexchange.date }}</td>
          <td>Lugar: {{ musicalexchange.place }}</td>
        </tr>
        <tr>
          <td>Descripción: {{ musicalexchange.description }}</td>
          <td>Repertorio: {{ musicalexchange.repertoire }}</td>
        </tr-->
        <tr v-if="musicalexchange.neededMoney > 0">
          <td>Enlace para donar: {{ musicalexchange.crowdfundingLink }}</td>
          <td>Dinero necesario: {{ musicalexchange.neededMoney }}</td>
        </tr>
        <!--/table-->
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
      musicalexchange: {},
      hostMusicalGroup: {},
      invitedMusicalGroup: {}
    };
  },
  async created() {
    this.id = this.$route.params.id;
    await this.getMusicalExchange();
    this.getMusicalGroupHost(this.musicalexchange.idMGroupA);
    this.getMusicalGroupInvited(this.musicalexchange.idMGroupB);
  },
  methods: {
    async getMusicalExchange() {
      await axios
        .get(`${server.baseURL}/musicalexchange/${this.id}`)
        .then(data => (this.musicalexchange = data.data));
    },
    getMusicalGroupHost(id) {
      axios
        .get(`${server.baseURL}/musicalgroup/${id}`)
        .then(data => (this.hostMusicalGroup = data.data));
    },
    getMusicalGroupInvited(id) {
      axios
        .get(`${server.baseURL}/musicalgroup/${id}`)
        .then(data => (this.invitedMusicalGroup = data.data));
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
  height: 100vh;
  /*height: 100%;
  width: 100%;
  padding: 0;
  */
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
