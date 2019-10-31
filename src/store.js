import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dataSchemes from '@/data/dataSchemes.json'

export default new Vuex.Store({
  state: {
    dataSchemes: dataSchemes,
    data: null
  },
  mutations: {
  },
  actions: {
    loadInitialDataFromDatabase() {
      //do things
    }
  },
  getters: {
    schemas: state => {
      var stuff = state.dataSchemes.forEach(schema => {
        console.dir(schema.schemaName)
        switch (schema.schemaName) {
          case "products":
            schema.schema = require("./data/schemas/productSchema.json")
            break
           case "users":
            schema.schema = require("./data/schemas/userSchema.json")
            break;
           case "shareTypes":
            schema.schema = require("./data/schemas/shareTypeSchema.json")
            break;
           case "depots":
            schema.schema = require("./data/schemas/depotSchema.json")
            break;
          default:
            schema.schema = {}
        }
      })
      console.dir(stuff)
      return state.dataSchemes
    }
  }
})
