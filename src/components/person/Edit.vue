<template>
<body>
<br />
  <div class="container" id="margin">
    <div class="thumbnail col-md-12 form-wrapper" id="centro">
      <div class="col-md-12 form-wrapper">
        <h2>Editar perfil</h2>
        <form id="create-post-form" @submit.prevent="editPerson">
          <div class="form-group col-md-6">
            <label for="title">Nombre</label>
            <input
              type="text"
              id="name"
              v-model="person.name"
              maxlength="50"
              name="title"
              class="form-control"
              placeholder="Enter name"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="title">Apellidos</label>
            <input
              type="text"
              id="surname"
              v-model="person.surname"
              name="title"
              maxlength="80"
              class="form-control"
              placeholder="Enter surname"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="title">Usuario</label>
            <input
              type="text"
              id="username"
              v-model="person.username"
              maxlength="15"
              name="title"
              class="form-control"
              placeholder="Enter username"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="title">Email</label>
            <input
              type="text"
              id="email"
              maxlength="30"
              v-model="person.email"
              name="title"
              class="form-control"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="title">Ciudad</label>
            <input
              type="text"
              id="city"
              v-model="person.city"
              maxlength="80"
              name="title"
              class="form-control"
              placeholder="Enter city"
              value="person.city"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="title">Selecciona tus intereses:</label>
            <br />
            <ejs-multiselect
              :id="currentSubscriptions"
              v-model="currentSubscriptions"
              :dataSource="nameTypes"
              placeholder="Select your interests"
              mode="CheckBox"
              :fields="fields"
              :showSelectAll="showSelectAll"
              selectAllText="Seleccionar todos"
              unSelectAllText="Deseleccionar todos"
              width="200px"
            ></ejs-multiselect>
          </div>

          <div class="form-group col-md-12">
            <label for="title">Imagen</label>
            <input
              type="file"
              id="image"
              @change="onFileChange"
              name="title"
              class="form-control"
              placeholder="Enter image"
              accept="image/*"
              multiple="false"
            />
          </div>
          <div class="form-group col-md-12">
            <h2>Imagen actual de perfil:</h2>
            <img v-bind:src="person.image" height="400" width="400" />
          </div>
          <div class="form-group col-md-12 pull-right">
            <button class="btn" type="submit">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
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
      person: {},
      currentSubscriptions: [],
      nameTypes: [],
      fields: { text: "name", value: "name" },
      showSelectAll: true
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPerson();
    this.getNameTypes();
    this.getSubscriptions();
  },
  methods: {
    editPerson() {
      let personAndSubscriptionsData = {
        person: {
          username: this.person.username,
          city: this.person.city,
          image: this.image,
          name: this.person.name,
          surname: this.person.surname,
          email: this.person.email
        },
        subscriptions: {
          subs: this.currentSubscriptions
        }
      };

      axios
        .put(
          `${server.baseURL}/person/${this.id}`,
          personAndSubscriptionsData,
          { headers: { token: localStorage.token } }
        )
        .then(data => {
          if (data.data === 0) {
            router.push({ name: "GetP" });
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
                  alert("Error al modifar el usuario");
                } else {
                  if (data.data === 4) {
                    alert("Error al modificar la persona");
                  }
                }
              }
            }
          }
        });
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

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log(image);
      this.image = image;
    },
    getPerson() {
      axios
        .get(`${server.baseURL}/person/${this.id}`, {
          headers: { token: localStorage.token }
        })
        .then(data => (this.person = data.data));
    },
    getSubscriptions() {
      axios.get(`${server.baseURL}/subscription/${this.id}`, {}).then(data => {
        let subs = Object.values(data);
        let s = subs[0];
        if (subs.length !== 0) {
          var i = 0;
          for (i = 0; i < s.length; i++) {
            var type = "" + Object.values(s[i]);
            console.log("" + Object.values(s[i]));
            this.currentSubscriptions.push(type.split(",")[1]);
          }

          //this.currentSubscriptions.push("Banda");
          //this.currentSubscriptions.push(subs);
        }
      });
    },
    getNameTypes() {
      axios
        .get(`${server.baseURL}/type`)
        .then(
          data => (
            (this.nameTypes = data.data),
            (this.maximumSelectionLength = data.data.length)
          )
        );
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
  /*height: 100vh;*/
  height: 100%;
  width: 100%;
  padding: 0;
  
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

