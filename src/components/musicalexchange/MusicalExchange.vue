<template>
<body>
  <div class="container">
    <div class="text-center" style="color: whitesmoke;">
      <h1>Información del intercambio musical</h1>
      <br />
    </div>
    <div v-if="musicalexchange.id === null">
      <h2>No se puede mostrar la información del intercambio</h2>
    </div>
    <!-- <div class="row"> -->
    <div class="thumbnail">
      <div class="">
        <div class="row p-3">
          <div class="col-6">
            <div>
              <img v-bind:src="hostMusicalGroup.image" height="300" width="300" />
              <br />
              <br />
              <p>Anfitrión: {{ hostMusicalGroup.name }}</p>
              <p>Fecha: {{ musicalexchange.date | moment }}</p>
              <p>Descripción: {{ musicalexchange.description }}</p>
            </div>
          </div>
          <div class="col-6">
            <div>
              <img v-bind:src="invitedMusicalGroup.image" height="300" width="300" />
              <br />
              <br />
              <p>Invitado: {{ invitedMusicalGroup.name }}</p>
              <p>Lugar: {{ musicalexchange.place }}</p>
              <p v-if="musicalexchange.repertoire!=null || musicalexchange.repertoire!=undefined">Repertorio: {{ musicalexchange.repertoire }}</p>
            </div>
          </div>
        </div>
  
        <tr>
          <td v-if="musicalexchange.neededMoney > 0">Dinero necesario: {{ musicalexchange.neededMoney }} €</td>
          <td v-if="musicalexchange.crowdfundingLink!=null || musicalexchange.crowdfundingLink!=undefined">Enlace para donar: {{ musicalexchange.crowdfundingLink }}</td>
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
/*MOMENT PARA LA FECHA*/
import moment from "moment";
require("moment/locale/es");
moment.locale("es");
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
    await this.getMusicalGroupHost(this.musicalexchange.idMGroupA);
    await this.getMusicalGroupInvited(this.musicalexchange.idMGroupB);
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY, HH:mm");
    },
  },
  methods: {
    async getMusicalExchange() {
      await axios
        .get(`${server.baseURL}/musicalexchange/${this.id}`)
        .then(data => (this.musicalexchange = data.data));
    },
    async getMusicalGroupHost(id) {
      await axios
        .get(`${server.baseURL}/musicalgroup/${id}`)
        .then(data => (this.hostMusicalGroup = data.data));
    },
    async getMusicalGroupInvited(id) {
      await axios
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
/*  height: 100%;
  width: 100%;
  padding: 0;*/
  
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
