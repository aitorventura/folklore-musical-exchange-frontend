<template>
  <body>
    <br />
    <br />
    <br />
    <div class="thumbnail" id="margin">
      <div class="col-md-12 form-wrapper" id="centro">
        <h2>Create Musical Group</h2>
        <form
          id="create-post-form"
          @submit.prevent="createMusicalGroup"
          enctype="multipart/form-data"
        >
          <table border="0">
            <th>
              <tr>
                <td>
                  <label for="title">Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    name="title"
                    class="form-control"
                    placeholder="Enter name"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Username</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="username"
                    v-model="username"
                    name="title"
                    class="form-control"
                    placeholder="Enter username"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Password</label>
                </td>
                <td>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    name="title"
                    class="form-control"
                    placeholder="Enter password"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Email</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="email"
                    v-model="email"
                    name="title"
                    class="form-control"
                    placeholder="Enter email"
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
                  <label for="title">Members</label>
                </td>
                <td>
                  <input
                    type="number"
                    id="members"
                    v-model="members"
                    name="title"
                    min="1"
                    class="form-control"
                    placeholder="Members"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">NameType</label>
                </td>
                <td>
                  <tr>
                    <select v-model="nameType" id="nameType" required>
                      <option v-for="type in nameTypes" :key="type.name">{{
                        type.name
                      }}</option>
                    </select>
                  </tr>
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">City</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="city"
                    v-model="city"
                    name="title"
                    class="form-control"
                    placeholder="Enter city"
                    value="mgroup.city"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label for="title">Image</label>
                </td>
                <td>
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
                </td>
              </tr>

              <tr>
                <td></td>
                <td align="right">
                  <button class="btn" type="submit">
                    Create
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
      username: "",
      password: "",
      email: "",
      description: "",
      members: "",
      nameType: "",
      city: "",
      image: "",
      nameTypes: {},
    };
  },
  created() {
    this.getNameTypes();
  },
  methods: {
    createMusicalGroup() {
      let mgroupData = {
        name: this.name,
        username: this.username,
        password: this.password,
        email: this.email,
        description: this.description,
        members: this.members,
        nameType: this.nameType,
        city: this.city,
        image: this.image,
      };
      this.__submitToServer(mgroupData);
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
      axios
        .post(`${server.baseURL}/musicalgroup/create`, data, {
          onUploadProgress: (uploadEvent) => {
            console.log(
              "Upload progress: " +
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                "%"
            );
          },
        })
        .then((data) => {
          if (data.data === 0) {
            router.push({ name: "MGroupList" });
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
                    alert("Error al crear la agrupación");
                  }
                }
              }
            }
          }
        });
    },
    getNameTypes() {
      axios
        .get(`${server.baseURL}/type`)
        .then((data) => (this.nameTypes = data.data));
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
