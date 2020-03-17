import Vue from "vue";
import Router from "vue-router";
import HomeComponent from "@/views/PeopleList";
import CreatePersonComponent from "@/components/person/Create";
import CreateMusicalGroupComponent from "@/components/musicalgroup/Create";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: { name: "PeopleList" } },
    { path: "/listPeople", name: "PeopleList", component: HomeComponent },
    {
      path: "/person/create",
      name: "Create",
      component: CreatePersonComponent
    },
    {
      path: "/musicalgroup/create",
      name: "Create",
      component: CreateMusicalGroupComponent
    }
  ]
});
