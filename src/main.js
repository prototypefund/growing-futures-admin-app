import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { utils } from '@/mixins/utils.js'
import { SessionState } from '@/mixins/SessionState.js'

import '@fortawesome/fontawesome-free/css/all.css'

import Buefy from 'buefy'
Vue.use(Buefy, {defaultIconPack: 'fas',})

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents, {
    swipeTolerance: 30,
})

import 'buefy/dist/buefy.css'

Vue.mixin(utils)
Vue.mixin(SessionState)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
