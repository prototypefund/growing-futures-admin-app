import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dataSchemes from '@/data/dataSchemes.json'
import { getData } from '@/services/data-service.js'

export default new Vuex.Store({
  state: {
    dataSchemes: dataSchemes,
    data: {}
  },
  mutations: {
    loadData(state, loadConfig){
      Vue.set(state.data, loadConfig.spec.schemaName, loadConfig.data)
    }
  },
  actions: {
    loadForSpec(context, spec) {
        if (!this.getters.data[spec.schemaName]){
        getData(spec).then(data => {
          this.commit('loadData', {spec: spec, data: data} )
        })
      }
    }
  },
  getters: {
    schemas: state => {
      state.dataSchemes.forEach(schema => {
        let url = process.env.VUE_APP_SCHEMA_API_ROOT + schema.schemaUrl
        fetch(url, {headers: { "Accept": "application/json" },
                            credentials: 'omit', 
                            mode: 'cors'})
                        .then(response => response.json())
                        .then(function(json) { 
                          schema.schema = json
                        })
       }
      )
      return state.dataSchemes
    },
    data: state => {
      return state.data;
    }
  }
})
