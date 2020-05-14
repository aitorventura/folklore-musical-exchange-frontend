<template>
<body>
  <div class="thumbnail">
    <h3>
      <strong>Iniciar sesión</strong>
    </h3>
    <br />
    <form @submit.prevent="login">
      <div id="centro" class="form-group col-md-12">
        <label for="title">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          v-model="username"
          name="title"
          class="form-control"
          placeholder="Introduzca nombre de usuario"
          required
        />
      </div>

      <div class="form-group col-md-12">
        <label for="title">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          name="title"
          class="form-control"
          placeholder="Introduzca contraseña"
          required
        />
      </div>
      <button class="btn" type="submit">Iniciar sesión</button>
    </form>
    <br />
  </div>
</body>
</template>

<script>

import { server } from "../helper";
import axios from "axios";
import router from "../router";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      let userData = {
        username: this.username,
        password: this.password
      };
      this.__submitToServer(userData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/login`, data).then(data => {
        if (!data.data) {
          alert("Incorrect user or password");
        } else {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("role", data.data.role);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("username", data.data.username); //
          localStorage.setItem(
            "listMusicalExchanges",
            data.data.listMusicalExchanges
          );
          window.location.reload()
          console.log(data.data.listMusicalExchanges);
          router.push({ name: "Home" });
        }
      });
    }
  }
};
</script>


<style scoped>
.thumbnail {
  line-height: 100%;
  border-color: #fff;
  border-left-width: 0.5cm;
  border-right-width: 0.5cm;
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
  margin: 0;*/
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