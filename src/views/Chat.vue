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
      :async-mode="asyncMode"
      :scroll-bottom="scrollBottom"
      :display-header="true"
      :send-images="true"
      :profile-picture-config="profilePictureConfig"
      @onImageClicked="onImageClicked"
      @onImageSelected="onImageSelected"
      @onMessageSubmit="onMessageSubmit"
      @onClose="onClose"
    >
      <!--@onType="onType"-->
      <!--
      <template v-slot:header>
        <div>
          <p
            v-for="(participant, index) in participants"
            :key="index"
            class="custom-title"
          >
            {{ participant.name }}
          </p>
        </div>
      </template>
      -->
    </Chat>
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
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px"
      },
      hideCloseButton: false,
      submitIconSize: 30,
      closeButtonIconSize: "20px",
      asyncMode: false,
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
      myId: 0
    };
  },
  async created() {
    //this.getMyId();
    this.myId = localStorage.getItem("id");
    //this.getIdP();
    this.idP = this.$route.params.id;
    await this.getParticipant();
    await this.getMyself();
    await this.getMessages();
  },
  methods: {
    async loadMoreMessages(resolve) {
      //console.log("loadMoreMessages");
      await this.getMessages();
      setTimeout(() => {
        resolve(this.toLoad); //We end the loading state and add the messages
        //Make sure the loaded messages are also added to our local messages copy or they will be lost

        this.messages.unshift(...this.toLoad);

        this.toLoad = [];
      }, 1000);
      //console.log("Voy a cargar mensajes: ");
      //console.log(Object.values(this.toLoad));
    },
    onMessageSubmit: function(message) {
      let fecha = new Date(message.timestamp).toISOString();

      let messageData = {
        idChat: this.idChat,
        content: message.content,
        timestamp: fecha.substring(0, fecha.length - 2),
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
    },
    onClose() {
      this.visible = false;
    },
    onImageSelected(files, message) {
      let src =
        "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg";
      this.messages.push(message);
      /**
       * This timeout simulates a requisition that uploads the image file to the server.
       * It's up to you implement the request and deal with the response in order to
       * update the message status and the message URL
       */
      setTimeout(
        res => {
          message.uploaded = true;
          message.src = res.src;
        },
        3000,
        { src }
      );
    },
    onImageClicked(message) {
      /**
       * This is the callback function that is going to be executed when some image is clicked.
       * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
       */
      console.log("Image clicked", message.src);
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
      //console.log("participant: ");
      //console.log(this.idP);
      await axios
        .get(`${server.baseURL}/chat/participant/${this.idP}`)
        .then(data => (this.participants = data.data));
      //console.log("participant");
      //console.log(Object.values(this.participants));
    },
    async getMyself() {
      //console.log("myself");
      //console.log(this.myId);
      await axios
        .get(`${server.baseURL}/chat/myself/${this.myId}`, {
          headers: { token: localStorage.token }
        })
        .then(data => (this.myself = data.data));
      //console.log(Object.values(this.myself));
    },
    tratarToLoad() {
      for (var i in this.toLoad) {
        this.toLoad[i].participantId = parseInt(this.toLoad[i].participantId);
      }
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}/chat/newmsg/${this.myId}/${this.idP}`, data)
        .then(data => {
          if (data.data === 1) {
            alert("No se ha podido enviar el mensaje");
          }
        });
    } /*,
    getMyId() {
      this.myId = localStorage.getItem("id");
      console.log("My id is: ");
      console.log(parseInt(this.myId));
      return localStorage.getItem("id");
    },
    getIdP() {
      let myIdd = localStorage.getItem("id");
      if (myIdd === this.$route.params.idA) {
        this.idP = this.$route.params.idB;
        console.log("The idP: " + this.idP);
        return this.$route.params.idB;
      } else {
        this.idP = this.$route.params.idA;
        console.log("The idP: " + this.idP);
        return this.$route.params.idA;
      }
    }*/
  }
};
</script>
