<template>

  <div id="app">
    <head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

  </head>
   

    <!-- Falta que los elementos se alinean al centro de cada columna -->
      <div v-if="logged">
        <b-navbar toggleable="lg" type="dark">
          <b-navbar-brand href="/">
            <img
              src="./assets/logoBlanco.png"
              alt="logo"
              style="width:40px;"
                />
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="/">Home</b-nav-item>
              
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="/listMGroups" right>Agrupaciones Musicales</b-nav-item> 
              <b-nav-item href="/listMusicalExchanges">Intercambios Musicales</b-nav-item> 
              <b-nav-item v-if="!person" href="/musicalexchange/create">Crear Intercambio Musical</b-nav-item> 
              <b-nav-item v-if="!person">
                <router-link :to="{ name: 'GetMG', params: { id: id } }"
                            class="b-nav-item href">Perfil
                </router-link>
              </b-nav-item>
              <b-nav-item v-if="person">
                <router-link :to="{ name: 'GetP', params: { id: id } }"
                            class="b-nav-item href">Perfil
                </router-link>
              </b-nav-item>
              <b-nav-item href="#" @click="logout">Desconectarse</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        
       <!-- <b-row class="row p-3 background">
          <b-col class="mr-auto"> 
            <a class="navbar-brand" href="/">
         
                <img
                  src="./assets/logoBlanco.png"
                  alt="logo"
                  style="width:40px;"
                />
              
            </a>
          </b-col>
          <b-col class="col-1 nav-item">
            <a class="nav-link" href="/">Home</a>
          </b-col>
          <b-col class="col-2 nav-item">
            <a class="nav-link" href="/listMGroups">Agrupaciones Musicales</a>
          </b-col>
          <b-col class="col-2 nav-item">
            <a class="nav-link" href="/listMusicalExchanges"
                    >Intercambios Musicales</a>
          </b-col>
          <b-col class="col-2 nav-item" v-if="!person">
            <a class="nav-link" href="/musicalexchange/create"
              >Crear Intercambio Musical</a
            >     
          </b-col>
          <b-col v-if="person" class="col-1 nav-item">
            <router-link
                        :to="{ name: 'GetP', params: { id: id } }"
                        class="nav-link"
                        >Perfil</router-link
                      >
          </b-col>
          <b-col v-if="!person" class="col-1 nav-item">
            <router-link
                        :to="{ name: 'GetMG', params: { id: id } }"
                        class="nav-link"
                        >Perfil</router-link
                      >
          </b-col>
        </b-row> -->
      <!--<nav id="nav" class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
              <a>
                <img
                  src="./assets/logoBlanco.png"
                  alt="logo"
                  style="width:40px;"
                />
              </a>
            </a>
           
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
              </li> -->
              <!-- <li v-if="person" class="nav-item">
                <a class="nav-link" href="/listPeople">ListPeople</a>
              </li> -->
              <!--<li class="nav-item">
                <a class="nav-link" href="/listMGroups">Agrupaciones Musicales</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listMusicalExchanges"
                  >Intercambios Musicales</a
                >
              </li>
              <li v-if="!person" class="nav-item">
                <a class="nav-link" href="/musicalexchange/create"
                  >Crear Intercambio Musical</a
                >
              </li>
              <li v-if="person" class="nav-item">
                 <router-link
                      :to="{ name: 'GetP', params: { id: id } }"
                      class="nav-link"
                      >Perfil</router-link
                    >
              </li>

               <li v-if="!person" class="nav-item">
                 <router-link
                      :to="{ name: 'GetMG', params: { id: id } }"
                      class="nav-link"
                      >Perfil</router-link
                    >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout">Cerrar Sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> -->
      </div> 
      <div v-if="!logged">
        <b-navbar toggleable="lg" type="dark">
          <b-navbar-brand href="/">
            <img
              src="./assets/logoBlanco.png"
              alt="logo"
              style="width:40px;"
                />
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="/">Home</b-nav-item>
              
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="/listMGroups" right>Agrupaciones Musicales</b-nav-item>
              <b-nav-item href="/listMusicalExchanges">Intercambios Musicales</b-nav-item>
              <b-nav-item href="/user/create">Registro</b-nav-item>
              <b-nav-item href="/login">Login</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

<!--
        <b-row class="row p-3 background">
          <b-col class="mr-auto"> 
            <a class="navbar-brand" href="/">
              <a>
                <img
                  src="./assets/logoBlanco.png"
                  alt="logo"
                  style="width:40px;"
                />
              </a>
            </a>
          </b-col>
          <b-col class="col-1 nav-item">
            <a class="nav-link" href="/">Home</a>
          </b-col>
          <b-col class="col-2 nav-item">
            <a class="nav-link" href="/listMGroups">Agrupaciones Musicales</a>
          </b-col>
          <b-col class="col-2 nav-item">
            <a class="nav-link" href="/listMusicalExchanges"
                    >Intercambios Musicales</a>
          </b-col>
          <b-col class="col-1 nav-item">
             <a class="nav-link" href="/user/create">Registro</a>
          </b-col>
          <b-col class="col-1 nav-item">
             <a class="nav-link" href="/login">Login</a>
          </b-col>
        </b-row> -->
     <!-- <nav id="nav" class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
              <a>
                <img
                  src="./assets/logoBlanco.png"
                  alt="logo"
                  style="width:40px;"
                />
              </a>
            </a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/user/create">Registro</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listMGroups">Agrupaciones Musicales</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listMusicalExchanges"
                  >Intercambios Musicales</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav> -->
      </div>
      <router-view />
   
  </div>
  
</template>

<script>
import router from "./router";
export default {
  data() {
    return {
      logged: false,
      person: false,
      id : -1
    };
  },
  created() {
    this.samePerson();
    this.getRole();
  },
  methods: {
    samePerson() {
      if (localStorage.getItem("id") != null) {
        this.logged = true;
        this.id = localStorage.getItem("id")
                console.log(this.logged)

      } else {
        this.logged = false;
                console.log(this.logged)

      }
    },
    getRole(){
      if(localStorage.getItem("role") == "PERSON"){
        this.person = true;
      } else {
        this.person = false;
      }
    },
    logout() {
      localStorage.clear();
      router.push({ name: "Home" });
      window.location.reload()

    }
  }
};
</script>
<style scoped>
.jumbotron {
  background-color: #465bff;
  color: #fff;
  padding: 100px 25px;
}
.container {
  margin-top: 180px;
}
.person {
  border: 10px solid transparent;
  margin-bottom: 25px;
  width: 80%;
  height: 80%;
  opacity: 0.7;
}
.person:hover {
  border-color: #5dd0ef;
}
.carousel-inner img {
  -webkit-filter: grayscale(90%);
  filter: grayscale(90%); /* make all photos black and white */
  width: 100%; /* Set width to 100% */
  margin: auto;
}
.carousel-caption h3 {
  color: #fff !important;
}

h1,
h2,
h3 {
  text-align: center;
}

body {
  text-align: center;
}

.background {
  background-color: black;
}

@media (max-width: 600px) {
  .carousel-caption {
    display: none; /* Hide the carousel text when the screen is less than 600 pixels wide */
  }
}
/* Add a dark background color with a little bit see-through */
.navbar {
  margin-bottom: 0;
  background-color: #000000;
  border: 0;
  font-size: 12px !important;
  letter-spacing: 4px;
  opacity: 0.9;
}
/* Add a gray color to all navbar links - COLOR DE LETRA*/
.b-nav-item {
  color: #ffffff !important;
  display: block;
}
/* On hover, the links will turn white */
.navbar-nav li a:hover {
  color: #fc4700 !important;
}
/* The active link */
.navbar-nav li.active a {
  color: #03c120 !important;
  background-color: #29292c !important;
}
/* Remove border color from the collapsible button */
.navbar-default .navbar-toggle {
  border-color: black;
}
/* Dropdown */
.open .dropdown-toggle {
  color: #fff;
  background-color: #555 !important;
}
/* Dropdown links */
.dropdown-menu li a {
  color: #000 !important;
}
/* On hover, the dropdown links will turn red */
.dropdown-menu li a:hover {
  background-color: red !important;
}

/*alinear a la derecha*/
.derecha {
  text-align: right;
}

.btn {
  padding: 10px 20px;
  background-color: #333;
  color: #ffffff;
  border-radius: 0;
  transition: 0.2s;
}
.btn:hover,
.btn:focus {
  border: 1px solid #333;
  background-color: #fff;
  color: #000;
}
.email {
  background-color: black;
  color: white;
  margin: 15px;
  padding: 15px;
}

table,
th,
td,
tr {
  background-color: #ffffff;
  text-align: center;
}

.main-section {
  margin: 0 auto;
  margin-top: 10%;
  padding: 0;
}

.modal-content {
  background-color: #ffffff;
  opacity: 0.75;
  padding: 0 5px;
  box-shadow: 0px 0px 3px #ffffff;
}

.button {
  width: 20%;
  margin: 10px 0 30px;
}

.forgot {
  padding: 5px 0;
}

.forgot a {
  color: white;
}
/* Para el login */
img.imgcenter {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: none;
}

.errorRojo {
  color: red;
}
</style>
