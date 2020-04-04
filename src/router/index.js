import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/ListGroups.vue";
import { BCalendar } from "bootstrap-vue";
Vue.component("b-calendar", BCalendar);
import { CalendarPlugin } from "bootstrap-vue";
Vue.use(CalendarPlugin);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List Groups",
    component: ListGroups
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
