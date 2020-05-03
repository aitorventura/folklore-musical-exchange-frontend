<template>
  <body>
    <br />
    <br />
    <br />
    <div class="thumbnail" id="margin">
      <div class="col-md-12 form-wrapper" id="centro">
        <!--
        <h4 class="text-center mt-20">
          <small>
            <button class="btn btn-success" v-on:click="navigate()">
              View All Musicals Exchanges
            </button>
          </small>
        </h4>
-->

        <div class="col-md-12 form-wrapper">
          <h2>Create Musical Exchange</h2>
          <br />
          <form id="create-post-form" @submit.prevent="createMusicalExchange">
            <table border="0">
              <th>
                <!-- Si no queréis que esté centrado quitadle el align="center"-->
                <!--
        <div class="form-group col-md-12" align="center">
          <label for="title">Nombre agrupación</label>
          <br />
          <tr>
            <select v-model="idMGroupA" id="idMGroupA">
              <option
                v-for="mgroup in mgroups"
                :key="mgroup.id"
                :value="mgroup.id"
              >{{ mgroup.name }}</option>
            </select>
          </tr>
        </div>
        -->

                <!-- Si no queréis que esté centrado quitadle el align="center"-->
                <tr>
                  <td>
                    <label for="title">Nombre agrupación</label>
                  </td>
                  <td>
                    <tr>
                      <select v-model="idMGroupB" id="idMGroupB">
                        <option
                          v-for="mgroup in mgroups"
                          :key="mgroup.id"
                          :value="mgroup.id"
                          >{{ mgroup.name }}</option
                        >
                      </select>
                    </tr>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label for="title">Date</label>
                  </td>
                  <td>
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
                  </td>
                </tr>

                <tr>
                  <td>
                    <label for="title">Place</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="place"
                      v-model="place"
                      name="title"
                      class="form-control"
                      placeholder="Enter place"
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label for="title">Description</label>
                  </td>
                  <td>
                    <textarea
                      rows="4"
                      cols="50"
                      type="textarea"
                      id="description"
                      v-model="description"
                      name="title"
                      class="form-control"
                      placeholder="Description"
                      required
                    ></textarea>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label for="title">Repertoire</label>
                  </td>
                  <td>
                    <textarea
                      rows="4"
                      cols="50"
                      type="textarea"
                      id="repertoire"
                      v-model="repertoire"
                      name="title"
                      class="form-control"
                      placeholder="Enter repertoire"
                    ></textarea>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label for="title">Needed money</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      id="neededMoney"
                      v-model="neededMoney"
                      name="title"
                      class="form-control"
                      min="0"
                      placeholder="0"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label for="title">Crowdfunding link</label>
                  </td>
                  <td>
                    <input
                      type="texto"
                      id="crowdfundingLink"
                      v-model="crowdfundingLink"
                      name="title"
                      class="form-control"
                      placeholder="Crowdfunding link"
                    />
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td align="right">
                    <button class="btn btn-success" type="submit">
                      Create Musical exchange
                    </button>
                  </td>
                </tr>
                <br />
              </th>
            </table>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
//import { locale } from "moment";

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
      mgroups: {},
    };
  },
  created() {
    this.getMGroups();
  },
  methods: {
    createMusicalExchange() {
      let musicalexchangeData = {
        idMGroupA: localStorage.getItem("id"),
        idMGroupB: this.idMGroupB,
        date: this.date,
        place: this.place,
        description: this.description,
        repertoire: this.repertoire,
        neededMoney: this.neededMoney,
        crowdfundingLink: this.crowdfundingLink,
      };
      this.__submitToServer(musicalexchangeData);
    },
    __submitToServer(data) {
      if (this.idMGroupA == this.idMGroupB) {
        alert("No puedes realizar un intercambio contigo mismo");
      } else {
        axios
          .post(`${server.baseURL}/musicalexchange/create`, data, {
            headers: { token: localStorage.token },
          })
          .then((data) => {
            if (data.data) {
              axios
                .get(`${server.baseURL}/login/update`, {
                  headers: { token: localStorage.token },
                })
                .then((data) => {
                  localStorage.clear();
                  localStorage.setItem("token", data.data.token);
                  localStorage.setItem("role", data.data.role);
                  localStorage.setItem("id", data.data.id);
                  localStorage.setItem("username", data.data.username); //
                  localStorage.setItem(
                    "listMusicalExchanges",
                    data.data.listMusicalExchanges
                  );
                });
              router.push({ name: "MusicalExchangeList" });
            } else {
              alert(
                "No puede haber dos intercambios de la misma persona a la misma hora."
              );
            }
            router.push({ name: "MusicalExchangeList" });
          });
      }
    },
    getMGroups() {
      axios //TODO: Estoyu haciendo la prueba
        .get(
          `${server.baseURL}/musicalgroup/others/` + localStorage.getItem("id")
        )
        .then((data) => (this.mgroups = data.data));
    },
  },
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
