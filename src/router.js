import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/views/ListGroups';
import CreateComponent from '@/components/user/Create';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'ListGroups' } },
    { path: '/listGroups', name: 'ListGroups', component: HomeComponent },
    { path: '/create', name: 'Create', component: CreateComponent },
  ]
});