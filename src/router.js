import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import DeliveryView from '@/views/DeliveryView.vue'
import DeliveryManagementView from '@/views/DeliveryManagementView.vue'
import DeliverySummaryView from '@/views/DeliverySummaryView.vue'
import DepotView from '@/views/DepotView.vue'
import DataAdminView from '@/views/DataAdminView.vue'
import FeedbackSummaryView from '@/views/FeedbackSummaryView.vue'
import PollConfigurationView from '@/views/PollConfiguration.vue'
import DeliveryFeedbackView from '@/views/DeliveryFeedbackView.vue'
import Inventory from '@/views/InventoryView.vue'
import CSVImport from '@/views/CSVImport.vue'

Vue.use(Router)

export const DASHBOARD = 'dashboard'
export const DELIVERY_MANAGMENT = 'delivery-management'
export const DELIVERY_CONFIGURATION = 'delivery-configuration'
export const DELIVERY_FEEDBACK  = 'delivery-feedback'
export const DELIVERY_SUMMARY  = 'delivery-summary'
export const FEEDBACK_SUMMARY  = 'feedback-summary'
export const POLL_CONFIGURATION  = 'poll-configuration'
export const CSV_IMPORT  = 'csv-import'
export const INVENTORY = 'inventory'
export const DATA_ADMIN_VIEW = 'data-admin'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: DASHBOARD,
      component: Dashboard
    },
    {
      path: '/delivery/management',
      name: DELIVERY_MANAGMENT,
      component: DeliveryManagementView
    },
    {
      path: '/delivery/summary',
      name: DELIVERY_SUMMARY,
      component: DeliverySummaryView
    },
    {
      path: '/feedback/summary',
      name: FEEDBACK_SUMMARY,
      component: FeedbackSummaryView
    },
    {
      path: '/feedback/poll-configuration',
      name: POLL_CONFIGURATION,
      component: PollConfigurationView
   },
   {
      path: '/feedback/delivery-feedback',
      name: DELIVERY_FEEDBACK,
      component: DeliveryFeedbackView
   },

   {
      path: '/delivery/configuration',
      name: DELIVERY_CONFIGURATION,
      component: DeliveryView
    },
    {
      path: '/inventory',
      name: INVENTORY,
      component: Inventory
    },
    {
      path: '/depots',
      name: 'depots',
      component: DepotView
    },
    {
      path: '/data-admin',
      name: DATA_ADMIN_VIEW,
      component: DataAdminView
    },
    {
      path: '/data-admin/csv-import',
      name: 'csv-import',
      component: CSVImport
    }

  ]
})
