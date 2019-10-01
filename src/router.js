import Vue from 'vue'
import Router from 'vue-router'

import DeliveryView from '@/views/DeliveryView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/share'
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: DeliveryView
    }
  ]
})
