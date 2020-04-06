<template>
<body>
   <br>
  <br>
  <br>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Musical Group</h1>
    </div>
    <div v-if="musicalexchange.id === null">
      <h2>No musical exchange found at the moment</h2>
    </div>
    <!-- <div class="row"> -->
    <div class>
      <table class="table table-bordered">
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
        </tbody>
      </table>
    </div>
    <!-- </div> -->
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
      musicalexchange: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMusicalExchange();
  },
  methods: {
    getMusicalExchange() {
      axios
        .get(`${server.baseURL}/musicalexchange/${this.id}`)
        .then(data => (this.musicalexchange = data.data));
    },

    navigate() {
      router.go(-1);
    }
  }
};
</script>
