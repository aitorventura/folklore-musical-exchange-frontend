import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bootstrapvue from "bootstrap-vue"


Vue.config.productionTip = false
Vue.use(Bootstrapvue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
