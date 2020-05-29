<template>
  <body>
    <div class="thumbnail" id="margin">
      <div class="col-md-12 form-wrapper" id="centro">
        <h2>Registro como persona interesada</h2>
        <br>
        <br>
        <form id="create-post-form" @submit.prevent="createPerson">
          <table border="0">
            <th>
              <tr>
                <td>
                  <label for="title">Nombre</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="name"
                    maxlength="50"
                    v-model="name"
                    name="title"
                    class="form-control"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Apellidos</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="surname"
                    maxlength="80"
                    v-model="surname"
                    name="title"
                    class="form-control"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Nombre de usuario</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="username"
                    maxlength="15"
                    v-model="username"
                    name="title"
                    class="form-control"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Contraseña</label>
                </td>
                <td>
                  <input
                    type="password"
                    id="password"
                    minlength="8"
                    maxlength="20"
                    v-model="password"
                    name="title"
                    class="form-control"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Correo electrónico</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="email"
                    v-model="email"
                    maxlength="30"
                    name="title"
                    class="form-control"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Ciudad</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="city"
                    v-model="city"
                    maxlength="80"
                    name="title"
                    class="form-control"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Imagen</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="image"
                    @change="onFileChange"
                    name="title"
                    class="form-control"
                    accept="image/*"
                    multiple="false"
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td align="right">
                  <button class="btn" type="submit">
                    Registrarse
                  </button>
                </td>
              </tr>
              <br />
            </th>
          </table>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
export default {
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
      city: "",
      image: "",
    };
  },
  methods: {
    createPerson() {
      let personData = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        password: this.password,
        email: this.email,
        city: this.city,
        image: this.image,
      };
      this.__submitToServer(personData);
    },
    onFileChange(e) {
      //this.image = e.target.files[0];
      //console.log("Nombre imagen: ", this.image.name);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
      this.image = image;
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/person/create`, data).then((data) => {
        if (data.data === 0) {
          router.push({ name: "Home" });
        } else {
          if (data.data === 1) {
            alert(
              "El correo que quiere usar ya está registrado en la plataforma, por favor, pruebe con otro."
            );
          } else {
            if (data.data === 2) {
              alert(
                "El usuario que quiere emplear ya está registrado en la plataforma, por favor, pruebe con otro."
              );
            } else {
              if (data.data === 3) {
                alert("Error al crear el usuario");
              } else {
                if (data.data === 4) {
                  alert("Error al crear la persona");
                }
              }
            }
          }
        }
      });
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

  align-items: center;
}
.btn:hover,
.btn:focus {
  border: 1px solid #333;
  background-color: #fff;
  color: #000;
}
</style>
