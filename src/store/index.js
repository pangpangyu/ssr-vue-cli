import Vue from 'vue'
import Vuex from 'vuex'

import api from '../utils/api'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      data1: {},
      data2: {}
    },
    mutations: {
      set_data1 (state, data1) {
        state.data1 = data1
      },
      set_data2 (state, data2) {
        state.data2 = data2
      }
    },
    actions: {
      getText ({ commit }) {
        return api.getTest().then(res => {
          commit('set_data1', res)
        })
      },
      getText2 ({ commit }) {
        return api.getTest().then(res => {
          commit('set_data2', res)
        })
      }
    },
    modules: {
    },
    getters: {
      data1: state => state.data1,
      data2: state => state.data2
    }
  })
}
