<template>
  <div id="app">
    <div>
      <nav id="nav" class="navbar navbar-default navbar-fixed-top">
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
                <img src="./assets/logoBlanco.png" alt="logo" style="width:40px;" />
              </a>
            </a>
            <ul class="nav navbar-nav navbar-left">
              <li class="nav-item">
                <a class="nav-link" href="/contacto">Contáctanos</a>
              </li>
            </ul>
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
                <a class="nav-link" href="/listPeople">ListPeople</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/person/create">Create A Person</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/musicalgroup/create">Create A Musical Group</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listMGroups">List Musical Groups</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listMusicalExchanges">List Musical Exchanges</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/musicalexchange/create">Create Musical Exchanges</a>
              </li>
               <li class="nav-item">
                <a class="nav-link" href ="#" @click="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>



<script>
import router from './router'
export default {
  methods: {
    logout(){
      localStorage.clear()
      router.push({ name: "Home" });

    }
  }
}
</script>
<style scoped>
.jumbotron {
  background-color: #465bff;
  color: #fff;
  padding: 100px 25px;
}
.container {
  margin-top: 80px;
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
.navbar li a,
.navbar .navbar-brand {
  color: #d5d5d5 !important;
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
  background-color: #f8f8f8;
  text-align: center;
}

.main-section {
  margin: 0 auto;
  margin-top: 10%;
  padding: 0;
}

.modal-content {
  background-color: #f1f1f1;
  opacity: 0.75;
  padding: 0 5px;
  box-shadow: 0px 0px 3px #f1f1f1;
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

