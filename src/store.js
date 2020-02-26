import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getData, buildBody, postJson } from '@/services/data-service.js'
import { generateUid, resolveToName } from '@/utils/utils.js'
import { pivotizeInventory } from '@/utils/inventory/inventory.js'

export default new Vuex.Store({
  state: {
    dataSchemas: null,
    data: {} 
  },
  mutations: {
    loadData(state, loadConfig){
      Vue.set(state.data, loadConfig.spec.schemaName, loadConfig.data)
    },
    deleteFromDatabase(state, config){
      let url = process.env.VUE_APP_SCHEMA_API_ROOT + "/delete"
      let body = buildBody(config)
      postJson(url, body)
    },
    upsertInDatabase(state, config){
      let url = process.env.VUE_APP_SCHEMA_API_ROOT + "/save"
      let body = buildBody(config)
      postJson(url, body)
    }
  },
  actions: {
    async setDataSchemas(context, schemas) {
      this.state.dataSchemas = schemas
    },
    remove(context, config) {
      console.dir(config)
      let data = this.getters.data[config.schema.schemaName]
      let i = data.findIndex(item => item.uid == config.item.uid)
      data.splice(i,1)
      this.commit('deleteFromDatabase', config)
    },
    async addOrUpdate(context, config) {
      let data = this.getters.data[config.schema.schemaName]

      if (!config.item.uid)
      {
        config.item.uid = generateUid(config.schema.schema.xUidPrefix)
      }

      let exists = data.findIndex(i => i.uid == config.item.uid)
      if(exists != -1)
        Vue.set(data, exists, config.item)
      else
        data.push(config.item)

      this.commit('upsertInDatabase', config)
    },
    async loadForSpec(context, spec) {
      if (!this.getters.data[spec.schemaName]){
        let data = await getData(spec)
        this.commit('loadData', {spec: spec, data: data} )
      }
    },
    async loadSchemaDefinitions() {
      this.state.dataSchemas.forEach(async schema => {
      let url = process.env.VUE_APP_SCHEMA_API_ROOT + "/schema"
      let body = {"schemaName": schema.schemaName }
      let json = await postJson(url, body)
      Vue.set(schema, 'schema', json)
      })
    }
  },
  getters: {
    schemas: state => {
      return state.dataSchemas
    },
    data: state => {
      return state.data;
    },
    products: (state, getters) => {
      let products =  getters.data.products
      return products ? products : []
    },
    polls: (state, getters) => {
      let polls = getters.data.poll
      return polls ? polls : []
    },
    depots: (state, getters) => {
      let depots =  getters.data.depots
      return depots ? depots : []
    },
    deliveries: (state, getters) => {
      if (getters.data.deliveries)
        getters.data.deliveries.sort((a,b) => a.date > b.date ? -1 : 1)
      return getters.data.deliveries
    },
    categories: (state, getters) => {
      return getters.data.categories
    },
    users: (state, getters) => {
      let users = getters.data.users
      return users ? users : []
    },
    shareTypes: (state, getters) => {
      let shareTypes = getters.data.shareTypes
      return shareTypes ? shareTypes : []
    },

    inventoryAtoms: (state, getters) => {
      let prods = getters.products
      if (getters.data.inventory && prods){
        getters.data.inventory.forEach(i => i.displayString = resolveToName(prods, i, 'product'))
        return getters.data.inventory
      }
      return []
    },
    inventory: (state, getters) => {
      return pivotizeInventory(getters.inventoryAtoms, ['product'], ['unit'])
    }
  }
})
