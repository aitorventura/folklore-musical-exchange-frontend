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
import ErrorComponent from "@/views/Error"

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {path: "*", redirect: '/'},

    { path: "/", 
      name: "Home", 
      component: HomeComponent ,
      meta: {
        authenticated: false,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      }},

    { path: "/login", 
      name: "Login", 
      component: LoginComponent,
      meta: {
        authenticated: false,
        isLogin:  true,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      } },

      { path: "/error", 
      name: "Error", 
      component: ErrorComponent,
      meta: {
        authenticated: false,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      } },

    { path: "/listPeople", 
      name: "PeopleList", 
      component: PeopleComponent ,
      meta: {
        authenticated: true,
        isLogin:  false,
        hasToBePerson: true,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      }},

    { path: "/listMGroups", 
      name: "MGroupList", 
      component: MGroupsComponent ,
      meta: {
        authenticated: false,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      }},

    {
      path: "/listMusicalExchanges",
      name: "MusicalExchangeList",
      component: MusicalExchangeComponent,
      meta: {
        authenticated: false,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      }

    },
    {
      path: "/person/create",
      name: "Create",
      component: CreatePersonComponent,
      meta: {
        authenticated: false,
        isLogin:  true,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      }
    },
    {
      path: "/musicalgroup/create",
      name: "CreateMG",
      component: CreateMusicalGroupComponent,
      meta: {
        authenticated: false,
        isLogin:  true,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      }
    },
    {
      path: "/musicalexchange/create",
      name: "CreateME",
      component: CreateMusicalExchangeComponent,
      meta: {
        authenticated: true,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: true,
        needId: false,
        isMusicalExchange : false
      }
    },

    { path: "/person/:id", 
      name: "Edit", 
      component: EditComponent ,
      meta: {
        authenticated: true,
        isLogin:  false,
        hasToBePerson: true,
        hasToBeGroup: false,
        needId: true,
        isMusicalExchange : false
      }},

    { path: "/musicalgroup/:id", 
      name: "EditMG", 
      component: EditMGComponent ,
      meta: {
        authenticated: true,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: true,
        needId: true,
        isMusicalExchange : false
      }},

    {
      path: "/musicalexchange/:id",
      name: "EditME",
      component: EditMEComponent,
      meta: {
        authenticated: true,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: true,
        needId: true,
        isMusicalExchange : true
      }
    },

    { path: "/person/:id", 
      name: "GetP", 
      component: GetPersonComponent ,
      meta: {
        authenticated: false,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      }},

    { path: "/musicalgroup/:id", 
      name: "GetMG", 
      component: GetMGroupComponent,
      meta: {
        authenticated: false,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      } },

    {
      path: "/musicalexchange/:id",
      name: "GetME",
      component: GetMusicalExchangeComponent,
      meta: {
        authenticated: false,
        isLogin:  false,
        hasToBePerson: false,
        hasToBeGroup: false,
        needId: false,
        isMusicalExchange : false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let authentication = to.matched.some(record => record.meta.authenticated)
  let isLogin = to.matched.some(record => record.meta.isLogin)
  let hasToBeGroup = to.matched.some(record => record.meta.hasToBeGroup)
  let hasToBePerson = to.matched.some(record => record.meta.hasToBePerson)
  let isMusicalExchange = to.matched.some(record => record.meta.isMusicalExchange)

  let needId = to.matched.some(record => record.meta.needId)
  let array = to.path.split("/")
  
  let idPath = array[array.length-1]
    
  

  if(isLogin && localStorage.getItem("token")){
    router.push({ name: "Home" });
  } else {

    if(authentication){
      if(!localStorage.getItem("token")){
        next('login')
      } else if (!hasToBePerson && !hasToBeGroup){
        next()
      } else if(hasToBeGroup && localStorage.getItem('role') === "MGROUP") {
        if(needId){
          if(idPath === localStorage.getItem("id") && !isMusicalExchange ){
            next();
          }else if(isMusicalExchange) {
            const array = localStorage.getItem("listMusicalExchanges").split("#");
            console.log(array)
            console.log(idPath)
            if(array.includes(idPath)){
              next()
            } else {
              router.push({ name: "Error" });

            }

          } else {
            router.push({ name: "Error" });
          }
        } else {
          next();
        }
        
      } else if(hasToBeGroup && localStorage.getItem('role') !== "MGROUP"){
        router.push({ name: "Error" });
      } else if(hasToBePerson && localStorage.getItem('role') === "PERSON") {
        
        if(needId){
          if(idPath === localStorage.getItem("id") ){
            next();
          }else {
            router.push({ name: "Error" });
          }
        } else {
          next();
        }
      } else if(hasToBePerson && localStorage.getItem('role') !== "PERSON"){
        router.push({ name: "Error" });
      } 

  } else {
    next()

  }
}
    

})
export default router;