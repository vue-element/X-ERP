import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import search from './modules/search'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tab: 'listTab'
  },
  mutations: {
  },
  modules: {
    app,
    permission,
    tagsView,
    user,
    search
  },
  getters
})

export default store
