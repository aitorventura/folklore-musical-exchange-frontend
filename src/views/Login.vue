<style scoped>
body {
  font: 400 15px/1.8 Lato, sans-serif;
  color: #777;
  background: #2d2d30;
} /*
.bg-1 {
  background: #2d2d30;
}*/
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
.modal-header,
.close {
  background-color: #333;
  text-align: center;
  font-size: 30px;
}
.modal-header,
.modal-body {
  padding: 40px 50px;
}
#app {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  height: 100%;
  background: #2d2d30;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

<template>
<body>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"
  />
  <br />
  <br />
  <br />
  <div id="app" class="bg-1">
    <div class="thumbnail">
      <h4>
        <strong>LOG IN</strong>
      </h4>
      <form id="create-post-form" @submit.prevent="login">
        <div class="form-group col-md-12">
          <label for="title">Userame</label>
          <input
            type="text"
            id="username"
            v-model="username"
            name="title"
            class="form-control"
            placeholder="Enter username"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label for="title">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            name="title"
            class="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        <!--<div class="form-group col-md-4 pull-right">-->
        <button class="btn" data-toggle="modal" type="submit">Log in</button>
        <!--</div>-->
      </form>
    </div>
  </div>
</body>
</template>
