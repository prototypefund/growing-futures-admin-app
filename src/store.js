import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getData, buildBody, fetchJson, postJson } from '@/services/data-service.js'

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
      console.log("delete")
      let url = process.env.VUE_APP_SCHEMA_API_ROOT + "/delete"
      console.log("delete")
      let body = buildBody(config)
      console.dir(url)
      console.dir(body)
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
      let exists = data.findIndex(i => i.uid == config.item.uid)
      if(exists != -1)
        Vue.set(data, exists, config.item)
      else
        data.push(config.item)

      this.commit('upsertInDatabase', config)
    },
    async loadForSpec(context, spec) {
      console.dir("starting to load")
      if (!this.getters.data[spec.schemaName]){
        let data = await getData(spec)
        this.commit('loadData', {spec: spec, data: data} )
      }
    },
    async loadSchemaDefinitions(context) {
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
