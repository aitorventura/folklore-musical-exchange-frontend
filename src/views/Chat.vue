<template>
  <div>
    <Chat
      :participants="participants"
      :myself="myself"
      :messages="messages"
      :chat-title="chatTitle"
      :placeholder="placeholder"
      :colors="colors"
      :border-style="borderStyle"
      :hide-close-button="hideCloseButton"
      :close-button-icon-size="closeButtonIconSize"
      :submit-icon-size="submitIconSize"
      :submit-image-icon-size="submitImageIconSize"
      :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
      :async-mode="true"
      :scroll-bottom="true"
      :display-header="true"
      :send-images="false"
      :profile-picture-config="profilePictureConfig"
      @onClose="onClose"
      @onMessageSubmit="onMessageSubmit"
    ></Chat>
  </div>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";
import moment from "moment";
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
        messageReceived: false
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
      //idChat lo cogeré de la ruta cuando esté la lista de chats
      idP: 0,
      myId: 0,
      newMessage: false
    };
  },
  async created() {
    //this.getMyId();
    this.myId = localStorage.getItem("id");
    //this.getIdP();
    this.idP = this.$route.params.id;
    await this.getParticipant();
    await this.getMyself();
    //await setInterval(this.loadMoreMessages, 1000);
    //await this.loadMoreMessages;
  },
  methods: {
    async loadMoreMessages(resolve) {
      setInterval(async () => {
        await this.getMessages();
        setTimeout(() => {
          resolve(this.toLoad); //We end the loading state and add the messages
          //Make sure the loaded messages are also added to our local messages copy or they will be lost

          console.log(this.messages.length + " - " + this.toLoad.length);
          if (this.messages.length !== this.toLoad.length || this.newMessage) {
            this.messages.length = 0;
            this.messages.unshift(...this.toLoad);
            this.toLoad = [];
            this.newMessage = false;
          }
        }, 1000);
      }, 1000);
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

        //console.log("Se va a hacer messageData");
        this.__submitToServer(messageData);

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
    }
  }
};
</script>

<style>
.message-content {
  width: 150%;
}
.container-message-manager {
  height: 100px;
}
</style>