import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dataSchemas from '@/data/dataSchemes.json'
import { getData } from '@/services/data-service.js'

export default new Vuex.Store({
  state: {
    dataSchemas: dataSchemas,
    data: {}
  },
  mutations: {
    loadData(state, loadConfig){
      Vue.set(state.data, loadConfig.spec.schemaName, loadConfig.data)
    },
    upsertInDatabase(state, config){
      // no-op
    }
  },
  actions: {
    async addOrUpdate(context, config) {
      let data = this.getters.data[config.schema.schemaName]
      let exists = data.findIndex(i => i.uid == config.item.uid)

      console.dir("existing")
      console.dir(exists)
      console.dir(data)
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
    async loadSchemaDefinitions(context) {
      this.state.dataSchemas.forEach(async schema => {
      let url = process.env.VUE_APP_SCHEMA_API_ROOT + schema.schemaUrl
      let response = await fetch(url, {headers: { "Accept": "application/json" },
                  credentials: 'omit', 
                  mode: 'cors'})
      let json = await response.json()
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
      return getters.data.products
    },
    categories: (state, getters) => {
      let stuff = getters.data.categories
      console.dir("GETTER")
      console.dir(stuff)
      return stuff
    }

  }
})
