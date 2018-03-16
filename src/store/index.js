import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module

import app from './modules/app'
import menu from './modules/menu'
import userState from './state'
import mutations from './mutations'

import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  mutations,
  modules: {
    app,
    menu
  },
  state: {
    userState
  }
})

Vue.use(VuexI18n.plugin, store)

export default store
