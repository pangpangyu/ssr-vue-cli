import Vue from 'vue'
import Vuex from 'vuex'

import api from '../utils/api'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      data1: {}
    },
    mutations: {
      set_data1 (state, data1) {
        state.data1 = data1
      }
    },
    actions: {
      getText ({ commit }) {
        return api.getTest().then(res => {
          commit('set_data1', res)
        })
      }
    },
    modules: {
    },
    getters: {
      data1: state => state.data1
    }
  })
}

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
