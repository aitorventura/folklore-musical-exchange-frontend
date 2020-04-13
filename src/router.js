import Vue from "vue";
import Router from "vue-router";
import PeopleComponent from "@/views/PeopleList";
import MGroupsComponent from "@/views/MGroupList";
import MusicalExchangeComponent from "@/views/MusicalExchangeList";
import CreatePersonComponent from "@/components/person/Create";
import CreateMusicalGroupComponent from "@/components/musicalgroup/Create";
import CreateMusicalExchangeComponent from "@/components/musicalexchange/Create";
import EditComponent from "@/components/person/Edit";
import EditMGComponent from "@/components/musicalgroup/Edit";
import EditMEComponent from "@/components/musicalexchange/Edit";
import GetMGroupComponent from "@/components/musicalgroup/MGroup";
import GetMusicalExchangeComponent from "@/components/musicalexchange/MusicalExchange";
import GetPersonComponent from "@/components/person/Person";
import HomeComponent from "@/components/home/Home";
import LoginComponent from "@/views/Login";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Home", component: HomeComponent },
    { path: "/login", name: "Login", component: LoginComponent },
    { path: "/listPeople", name: "PeopleList", component: PeopleComponent },
    { path: "/listMGroups", name: "MGroupList", component: MGroupsComponent },
    {
      path: "/listMusicalExchanges",
      name: "MusicalExchangeList",
      component: MusicalExchangeComponent
    },
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
    {
      path: "/musicalexchange/create",
      name: "CreateME",
      component: CreateMusicalExchangeComponent
    },
    { path: "/person/:id", name: "Edit", component: EditComponent },
    { path: "/musicalgroup/:id", name: "EditMG", component: EditMGComponent },
    {
      path: "/musicalexchange/:id",
      name: "EditME",
      component: EditMEComponent
    },
    { path: "/person/:id", name: "GetP", component: GetPersonComponent },
    { path: "/musicalgroup/:id", name: "GetMG", component: GetMGroupComponent },
    {
      path: "/musicalexchange/:id",
      name: "GetME",
      component: GetMusicalExchangeComponent
    }
  ]
});
