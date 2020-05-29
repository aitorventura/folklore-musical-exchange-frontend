<template>
  <div class="background-table">
    <table>
      <tr>
        <td scope="col p-3" style="padding-right: 40px;">
          <div class="thumbnail" id="margin" v-if="chats.length !== 0">
            <!--
        <div v-if="mgroup.length !== 0">
          <table>
            <tr>
              <td scope="col p-3" style="padding-right: 40px;">
                <div class="bordered">
                  <img v-bind:src="mgroup.image" height="300" width="300" />
                </div>
              </td>
              <td scope="col" style="padding-left: 20px;">
                <div class="text-left">
                  <h2>{{ mgroup.name }}</h2>
                  <h4>Usuario: {{ mgroup.username }}</h4>
                </div>
                <div class="text-left">
                  <br />
                  <p>Email: {{ mgroup.email }}</p>
                  <p>Ciudad: {{ mgroup.city }}</p>
                  <p>Número de miembros: {{ mgroup.members }}</p>
                  <p>Tipo de agrupación: {{ mgroup.nameType }}</p>
                  <p>Descripción: {{ mgroup.description }}</p>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div v-if="mgroup.length == 0 && participants.length>0">
          <table>
            <tr>
              <td scope="col p-3" style="padding-right: 20px;">
                <div class="bordered">
                  <img v-bind:src="participants[0].profilePicture" height="200" width="200" />
                </div>
              </td>
              <td scope="col" style="padding-left: 10px;">
                <div class="text-left">
                  <h2>Nombre de usuario:</h2>
                  <h4>{{ participants[0].name }}</h4>
                </div>
              </td>
            </tr>
          </table>
        </div>
            -->

            <table>
              <!-- Debería actualizarse esto pero no sé cómo-->
              <tr v-for="chat in chats" :key="chat.id" scope="col p-3" style="padding-right: 40px;">
                <td scope="col p-3" style="padding-right: 40px;">
                  <div class="text-left">
                    <h4>{{ chat.name }}</h4>
                  </div>
                </td>

                <td scope="col" style="padding-left: 20px;">
                  <div class="btn-group" style="margin-bottom: 20px;">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      v-on:click="openChat(chat.idA == myId? chat.idB : chat.idA)"
                    >Ver chat</button>

                    <!--<router-link
                  :to="{ name: 'Chat', params: { id: (chat.idA == myId? chat.idB : chat.idA) } }"
                  v-on:click="reload()"
                  class="btn btn-sm btn-outline-primary"
                    >Ver chat</router-link>-->
                  </div>
                </td>
                <td scope="col" style="padding-left: 20px;">
                  <div v-if="chat.unread != 0">{{chat.unread}}</div>
                </td>
              </tr>
            </table>
          </div>
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
                <a href="/" class="btn btn-primary" th:align="left">Página principal</a>
              </div>
            </div>
          </div>
        </td>
        <td scope="col">
          <div class="ventana">
            <Chat
              v-if="visible"
              :participants="participants"
              :myself="myself"
              :messages="messages"
              :chat-title="chatTitle"
              :placeholder="placeholder"
              :colors="colors"
              :border-style="borderStyle"
              :hide-close-button="hideCloseButton"
              :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
              :async-mode="true"
              :scroll-bottom="scrollBottom"
              :display-header="true"
              :send-images="false"
              :profile-picture-config="profilePictureConfig"
              :timestamp-config="timestampConfig"
              @onClose="onClose"
              @onMessageSubmit="onMessageSubmit"
            ></Chat>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";
import moment from "moment";
import router from "../router";
// Load Locales ('en' comes loaded by default)
require("moment/locale/es");
// Choose Locale
moment.locale("es");

export default {
  components: {
    Chat
  },
  data() {
    return {
      visible: true,
      participants: [],
      myself: {},
      messages: [],
      msgIndex: "",
      chatTitle: "Chat privado",
      placeholder: "Enviar mensaje",
      colors: {
        header: {
          bg: "#d30303",
          text: "#fff"
        },
        message: {
          myself: {
            bg: "#fff",
            text: "#bdb8b8"
          },
          others: {
            bg: "#fb4141",
            text: "#fff"
          },
          messagesDisplay: {
            bg: "#f7f3f3"
          }
        },
        submitIcon: "#b91010",
        submitImageIcon: "#b91010"
      },
      borderStyle: {
        topLetft: "0px",
        topRigh: "0px",
        bottomLeft: "0px",
        bottomRight: "0px"
      },
      hideCloseButton: true,
      submitIconSize: 30,
      closeButtonIconSize: "20px",
      toLoad: [{}],
      scrollBottom: {
        messageSent: true,
        messageReceived: true
      },
      displayHeader: true,
      profilePictureConfig: {
        others: true,
        myself: true,
        styles: {
          width: "30px",
          height: "30px",
          borderRadius: "50%"
        }
      },
      timestampConfig: {
        format: "dd-MM-yyyy HH:mm",
        relative: true
      },
      //idChat lo cogeré de la ruta cuando esté la lista de chats
      idP: 0,
      myId: 0,
      newMessage: false,
      mgroup: {},
      person: {},
      first: true,
      chats: []
    };
  },
  async created() {
    //this.getMyId();
    this.myId = localStorage.getItem("id");
    //this.getIdP();
    this.idP = this.$route.params.id;
    this.getMGroup();
    this.getPerson();
    this.fetchChats();
    await this.getParticipant();
    await this.getMyself();

    //await setInterval(this.loadMoreMessages, 1000);
    //await this.loadMoreMessages;
  },

  methods: {
    async loadMoreMessages(resolve) {
      setInterval(async () => {
        await this.getMessages();
        //setTimeout(() => {
        if (
          this.messages.length !== this.toLoad.length ||
          this.newMessage ||
          this.first
        ) {
          this.first = false;

          resolve(this.toLoad); //We end the loading state and add the messages
          //Make sure the loaded messages are also added to our local messages copy or they will be lost
          if (this.newMessage) {
            setTimeout(500);
          }
          //console.log(this.messages.length + " - " + this.toLoad.length);

          this.messages.length = 0;
          this.messages.unshift(...this.toLoad);
          this.toLoad = [];
          this.newMessage = false;
        }
      }, 1000);
      //}, 1000);
      //this.tratarToLoad();
    },
    onMessageSubmit: function(message) {
      if (message.content !== " " || message.content.length === 0) {
        this.newMessage = true;
        let fecha = new Date(message.timestamp).toISOString();

        let messageData = {
          idChat: this.idChat,
          content: message.content,
          timestamp: fecha.substring(0, fecha.length - 2),
          uploaded: "true",
          viewed: "false",
          participantId: parseInt(message.participantId)
        };

        if(messageData.content.length > 16777214){
          alert("No puedes enviar un mensaje de más de 255 caracteres")
        }else {
          this.__submitToServer(messageData);
        }
        //console.log("Se va a hacer messageData");

        /*
         * example simulating an upload callback.
         * It's important to notice that even when your message wasn't send
         * yet to the server you have to add the message into the array
         */
        //console.log("Mensaje: " + Object.values(message));
        this.messages.push(this.message);
        //console.log("Mensajes: " + Object.values(this.messages));

        /*
         * you can update message state after the server response
         */
        // timeout simulating the request

        setTimeout(() => {
          message.uploaded = true;
        }, 2000);
      }
    },
    onClose() {
      this.visible = false;
    },
    getMGroup() {
      console.log("Entramos en getMGroup " + this.$route.params.id);
      axios
        .get(`${server.baseURL}/musicalgroup/${this.$route.params.id}`)
        .then(data => (this.mgroup = data.data));

      Object.values(this.mgroup);
    },
    getPerson() {
      console.log("Entramos en getPerson " + this.idP);
      axios
        .get(`${server.baseURL}/person/${this.idP}`, {
          headers: { token: localStorage.token }
        })
        .then(data => (this.person = data.data));

      Object.values(this.person);
    },
    async getMessages() {
      await axios
        .get(`${server.baseURL}/chat/${this.myId}/${this.idP}`, {
          headers: { token: localStorage.token }
        })
        .then(data => (this.toLoad = data.data));
      this.tratarToLoad();
    },
    async getParticipant() {
      await axios
        .get(`${server.baseURL}/chat/participant/${this.idP}`)
        .then(data => (this.participants = data.data));
    },
    async getMyself() {
      await axios
        .get(`${server.baseURL}/chat/myself/${this.myId}`, {
          headers: { token: localStorage.token }
        })
        .then(data => (this.myself = data.data));
    },
    tratarToLoad() {
      for (var i in this.toLoad) {
        this.toLoad[i].participantId = parseInt(this.toLoad[i].participantId);
        this.toLoad[i].viewed = this.toLoad[i].viewed === "true";

        //this.toLoad[i].uploaded = true;
      }
    },
    __submitToServer(data) {
      console.log("Se envía el mensaje");
      axios
        .post(`${server.baseURL}/chat/newmsg/${this.myId}/${this.idP}`, data)
        .then(data => {
          if (data.data === 1) {
            alert("No se ha podido enviar el mensaje");
          }
        });
    },
    async fetchChats() {
      let myId = await localStorage.getItem("id");
      axios
        .get(`${server.baseURL}/chat/all/${myId}`)
        .then(data => (this.chats = data.data));
    },
    openChat(id) {
      router.push({ name: "Chat", params: { id: id } });

      window.location.reload();
    }
  }
};
</script>

<style>
td {
  width: 50vw;
}
.background-table {
  background-color: #2d2d30;
}
.message-content {
  width: 150%;
}
.container-message-manager {
  height: 100px;
}
.ventana {
  height: 90vh;
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

  /*height: 90.9vh;*/
  /*height: 100%;
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