import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@fortawesome/fontawesome-free/css/all.css'

import Buefy from 'buefy'
Vue.use(Buefy, {defaultIconPack: 'fas',})
import 'buefy/dist/buefy.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
