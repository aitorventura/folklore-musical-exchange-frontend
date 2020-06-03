<template>
  <body>
  <br />

    <div class="container-fluid" border="0.5cm">
      <div class="text-center" heigth="100vh">
        <h1>Lista de chats</h1>
        <br />
        <div v-if="chats.length === 0">
          <div class="container">
            <div class="alert" classappend="alert-dark">
              <img src="../assets/logoBlanco.png" style="width:300px;" />

              <br />
              <!--<h2>No user found at the moment</h2>-->
              <h3>No se ha encontrado ningún chat</h3>
              <br />
              <p>
                Pulsa el botón de inicio para volver a la página principal o
                utiliza el navegador para volver atrás
              </p>
            </div>
            <div th:align="center">
              <a href="/" class="btn btn-primary" th:align="left"
                >Página principal</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row"> -->

      <div class="thumbnail" id="margin" v-if="chats.length !== 0">
        <!--
      <ejs-textbox
        id="textbox"
        v-model="searchName"
        floatLabelType="Never"
        showClearButton="true"
        placeholder="Filtra por nombre"
        width="200px"
      ></ejs-textbox>
      -->

        <table>
          <!-- Debería actualizarse esto pero no sé cómo-->
          <tr
            v-for="chat in chats"
            :key="chat.id"
            scope="col p-3"
            style="padding-right: 40px;"
          >
            <td scope="col p-3" style="padding-right: 40px;">
              <div class="text-left">
                <h2>{{ chat.name }}</h2>
              </div>
            </td>

            <td scope="col" style="padding-left: 20px;">
              <div class="btn-group" style="margin-bottom: 20px;">
                <router-link
                  :to="{
                    name: 'Chat',
                    params: { id: chat.idA == myId ? chat.idB : chat.idA },
                  }"
                  class="btn btn-sm btn-outline-primary"
                  >Ver chat</router-link
                >
              </div>
            </td>
            <td scope="col" style="padding-left: 20px;">
              <div v-if="chat.unread != 0">
                <h4>
                  <strong> {{ chat.unread }} </strong>
                </h4>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import Vue from "vue";
/*TEXTO*/
import { TextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
Vue.use(TextBoxPlugin);

export default {
  data() {
    return {
      chats: [],
      myId: 0,
      //searchName: ""
      //searchType: [],
      //fields: { text: "name", value: "name" },
      /*maximumSelectionLength: "",*/
      //showSelectAll: true
    };
  },
  created() {
    this.myId = localStorage.getItem("id");
    //setInterval(this.fetchChats(), 1000);
    this.startInterval();
    //setInterval(window.location.reload(), 500);
  },
  /*computed: {
    filterName() {
      return this.chats.filter(chat => {
        return chat.name.toLowerCase().match(this.searchName.toLowerCase());
      });
    }
  },*/
  methods: {
    async fetchChats() {
      let myId = await localStorage.getItem("id");
      axios
        .get(`${server.baseURL}/chat/all/${myId}`)
        .then((data) => (this.chats = data.data));
    },
    startInterval: async function () {
      setInterval(async () => {
                        await this.fetchChats();
                   }, 1000);
    }
  },
};
</script>

<!--Imports para los componentes-->
<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";

.wrapper {
  max-width: 250px;
  margin: 0 auto;
}
</style>

<style scoped>
td {
  padding: 5px;
}
tr,
th,
table {
  border: 0cm;
  align-items: center;
  align-content: center;
}
.thumbnail {
  align-content: center;
  align-items: center;
  text-align: center;
  line-height: 100%;
  border-color: #fff;
  border-left-width: 1cm;
  border-right-width: 1cm;
  color: #2d2d30;
} /*
table {
  border: 0cm;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}*/
body {
  background-color: #2d2d30;
  font: 400 15px/1.8 Lato, sans-serif;
  color: whitesmoke;
   height: 100vh;

  /*
  height: 90.9vh;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;*/
}
.blanco {
  background-color: white;
}
/*
.oscuro {
  height: 100vh;
  background-color: #2d2d30;
}*/

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
