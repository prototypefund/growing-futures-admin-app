import Vue from 'vue'
import Router from 'vue-router'

import DeliveryView from '@/views/DeliveryView.vue'
import DepotView from '@/views/DepotView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/delivery'
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: DeliveryView
    },
    {
      path: '/depots',
      name: 'depots',
      component: DepotView
    }

  ]
})
