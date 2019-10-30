import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dataSchemes from '@/data/dataSchemes.json'

export default new Vuex.Store({
  state: {
    vegetables: null,
  },
  mutations: {
    addProduct(state, product) {
      let exists = state.questions.findIndex(q => q.uid == product.uid)
      if(exists != -1)
        Vue.set(state.questions, exists, product)
      else
        state.questions.push(product)
    },
    removeProduct(state, uid){
      let i = state.questions.findIndex(q => q.uid == uid)
      state.questions.splice(i, 1)      
    },

  },
  actions: {
    loadInitialDataFromDatabase() {
      //do things
    },
    addProduct({ commit, state }, product) {
      addProductToDatabase(product)
        .then(() => commit('addProduct', product))
        .catch(err => state.error = { message: "product could not be persisted to DB: " + err, timestamp: new Date() })
    },
    removeProduct({ commit, state }, uid) {
      removeProductFromDatabase(uid)
        .then(() => commit('removeProduct', uid))
        .catch(err => state.error = { message: "product could not be removed from DB: " + err, timestamp: new Date() })
    }
  },
  getters: {
    vegetables: state => state.vegetables,

  }
})
