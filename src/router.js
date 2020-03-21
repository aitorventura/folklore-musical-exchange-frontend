import Vue from "vue";
import Router from "vue-router";
import HomeComponent from "@/views/PeopleList";
import MGroupsComponent from "@/views/MGroupList";
import CreatePersonComponent from "@/components/person/Create";
import CreateMusicalGroupComponent from "@/components/musicalgroup/Create";
import EditComponent from "@/components/person/Edit";

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
    { path: '/person/:id', name: 'Edit', component: EditComponent },
    {
      path: "/musicalgroup/create",
      name: "Create",
      component: CreateMusicalGroupComponent
    }
  ]
});
