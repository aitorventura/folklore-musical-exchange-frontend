import Vue from "vue";
import Router from "vue-router";
import HomeComponent from "@/views/PeopleList";
import MGroupsComponent from "@/views/MGroupList";
import CreatePersonComponent from "@/components/person/Create";
import CreateMusicalGroupComponent from "@/components/musicalgroup/Create";
import EditComponent from "@/components/person/Edit";
import EditMGComponent from "@/components/musicalgroup/Edit";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: { name: "PeopleList" } },
    { path: "/listPeople", name: "PeopleList", component: HomeComponent },
    { path: "/listMGroups", name: "MGroupList", component: MGroupsComponent },
    {
      path: "/person/create",
      name: "Create",
      component: CreatePersonComponent
    },
    {
      path: "/musicalgroup/create",
      name: "CreateMG",
      component: CreateMusicalGroupComponent
    },
    { path: "/person/:id", name: "Edit", component: EditComponent },
    { path: "/musicalgroup/:id", name: "EditMG", component: EditMGComponent }
  ]
});
