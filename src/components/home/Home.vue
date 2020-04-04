<template>
<div >
        <div  id="myCarousel" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <div class="item active">

                <img src="../../assets/img/foto1.jpg" alt="Orquesta">
                <div class="carousel-caption">
                    <h3>Orquesta</h3>
                </div>
            </div>

            <div class="item">
                <img src="../../assets/img/foto2.jpg" alt="Rondalla">
                <div class="carousel-caption">
                    <h3>Rondalla</h3>
                </div>
            </div>

            <div class="item">
                <img src="../../assets/img/foto3.jpg" alt="Coro">
                <div class="carousel-caption">
                    <h3>Coro</h3>
                </div>
            </div>
        </div>

        <!-- Left and right controls -->
        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <div  class="jumbotron text-center">
        <img src="../../assets/logoBlanco.png" alt="logo" height="26%" width="26%">
        <br>
        <br>
        <h1>Folklore Musical Exchange</h1>
        <p><em>Tus aplicación web de intercambios musicales favorita.</em></p>
        <p>¿Quieres realizar un intercambio musical y no sabes cómo? Este es tu lugar.</p>
        <br>

        
        <p>Conoce ya los diferentes tipos de agrupación musical y comienza a hacer todos los preparativos para el intercambio.</p>

        <div class="row">
            <div class="col-sm-4">
                <p><strong>Dolçaina i tabal</strong></p><br>

                <a  title="DolçainaITabal" href="/" > <img src="../../assets/img/foto4.jpg" alt="Dolçaina i tabal" width="360" height="280"  class="img-circle person">
                </a></div>
            <div class="col-sm-4">
                <p><strong>Big band</strong></p><br>
                <a title="BigBand" href="/"> <img src="../../assets/img/foto5.jpg" alt="Big Band" width="360" height="280"  class="img-circle person"></a>
            </div>
            <div class="col-sm-4">
                <p><strong>Charanga</strong></p><br>
                <a title="Charanga" href="/"><img src="../../assets/img/foto6.jpg" alt="Charanga" width="360" height="280"  class="img-circle person"></a>
            </div>
        </div>

        <div class="form-group row">
            <div>
                <p>Si estas interesado en conocer todas las diferentes agrupaciones musicales que hay no dudes en entrar en el</p>
                <button onclick="location.href='/listMGroups'" class="btn btn-info">Listado de agrupaciones</button>
            </div>
        </div>


    </div>


    <div class="jumbotron text-center">
        <h1>Sobre nosotros:</h1>
        <p>
        El objetivo principal de esta plataforma es el de promover el interés por la música, tanto tradicional como más actual, tocada por las agrupaciones musicales folklóricas (rondallas, bandas, orquestas, etc.) de nuestro país. 
        También se quiere fomentar el turismo rural y de interior, puesto que este tipo de agrupaciones suelen ser típicas en pueblos. 
        Por otro lado, se quiere aprovechar el gran movimiento musical que existe especialmente en la Comunidad Valenciana, ya que es en esta comunidad donde se concentra una mayor cantidad de músicos.
        </p>

    </div>
      </div>


</template>

<script>

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

h1, h2, h3 {
    text-align: center
}

body{
  text-align: center
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
.navbar li a, .navbar .navbar-brand {
  color: #d5d5d5 !important;
}
/* On hover, the links will turn white */
.navbar-nav li a:hover {
  color: #fc4700 !important;
}
/* The active link */
.navbar-nav li.active a {
  color: #03c120 !important;
  background-color:#29292c !important;
}
/* Remove border color from the collapsible button */
.navbar-default .navbar-toggle {
  border-color: black;
}
/* Dropdown */
.open .dropdown-toggle {
  color: #fff ;
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
.derecha{
  text-align: right;
}


.btn {
    padding: 10px 20px;
    background-color: #333;
    color: #f1f1f1;
    border-radius: 0;
    transition: .2s;
  }
  .btn:hover, .btn:focus {
    border: 1px solid #333;
    background-color: #fff;
    color: #000;
  }
.email{
background-color: black;
  color: white;
  margin: 15px;
  padding: 15px;
}

table, th, td, tr{
    background-color: #F8F8F8;
    text-align: center;
}

  

  .main-section{
      margin:0 auto;
      margin-top:10%;
      padding: 0;
  }

  .modal-content{
      background-color: #F1F1F1;
      opacity: .75;
      padding: 0 5px;
      box-shadow: 0px 0px 3px #F1F1F1;
  }

  button{
      width: 20%;
      margin: 10px 0 30px;
  }

  .forgot{
      padding: 5px 0;
  }

  .forgot a{
      color: white;
  }
  /* Para el login */
IMG.imgcenter{
    display: block;
    margin-left: auto;
    margin-right: auto;
    border:none;
}

.errorRojo {
    color: red;
}


</style>