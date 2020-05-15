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
      submitIconSize: 25,
      closeButtonIconSize: "20px",
      asyncMode: false,
      //Aquí se tienen que cargar los mensajes
      //PROBLEMA: participantId en lugar de ser 2, es "2", y no lo detecta como un número
      toLoad: [
        /*
        {
          content: "Hola!",
          participantId: 7,
          timestamp: "2020-03-19T16:38:43.000Z",
          type: "text"
        },
        {
          content: "Hola! Qué tal??",
          participantId: 2,
          timestamp: "2020-03-19T16:38:43.000Z",
          type: "text"
        },
        {
          content: "Bien y tú?",
          participantId: 7,
          timestamp: "2020-03-19T16:38:43.000Z",
          type: "text"
        },
        {
          content: "Bieeeen",
          participantId: 2,
          timestamp: "2020-03-19T16:38:44.000Z",
          type: "text"
        },
        {
          content: "Te gustaría que hicieramos un intercambio?",
          participantId: 2,
          timestamp: "2020-03-19T16:38:44.000Z",
          type: "text"
        }*/
      ],
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
      }
    };
  },
  created() {
    this.getMessages();
    this.getParticipant();
    this.getMyself();
  },
  methods: {
    /*onType: function(event) {
      //here you can set any behavior
    },*/
    loadMoreMessages(resolve) {
      this.tratarToLoad();
      setTimeout(() => {
        resolve(this.toLoad); //We end the loading state and add the messages
        //Make sure the loaded messages are also added to our local messages copy or they will be lost
        this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 1000);
    },
    onMessageSubmit: function(message) {
      /*
       * example simulating an upload callback.
       * It's important to notice that even when your message wasn't send
       * yet to the server you have to add the message into the array
       */
      console.log("Mensaje: " + Object.values(message));
      this.messages.push(this.message);
      console.log("Mensajes: " + Object.values(this.messages));

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
    getMessages() {
      axios
        .get(`${server.baseURL}/chat/1`, {
          headers: { token: localStorage.token }
        })
        .then(data => this.tratarToLoad(data.data));
      //this.tratarToLoad();
    },
    getParticipant() {
      axios
        .get(`${server.baseURL}/chat/participant/1/7`, {
          headers: { token: localStorage.token }
        })
        .then(data => (this.participants = data.data));
    },
    getMyself() {
      axios
        .get(`${server.baseURL}/chat/myself/7`, {
          headers: { token: localStorage.token }
        })
        .then(data => (this.myself = data.data));
    },
    tratarToLoad(toLoadMsg) {
      console.log("Voy a entrar");
      console.log(Object.values(toLoadMsg));
      for (var i in toLoadMsg) {
        console.log("Prueba: ");
        console.log(toLoadMsg[i].participantId);
        console.log(Object.values(toLoadMsg));
        toLoadMsg[i].participantId = parseInt(toLoadMsg[i].participantId);
        console.log(toLoadMsg[i].participantId);
        console.log(Object.values(toLoadMsg));
      }
      console.log(Object.values(toLoadMsg));
    }
  }
};
</script>
