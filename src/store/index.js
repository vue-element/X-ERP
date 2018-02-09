import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import search from './modules/search'
import user from './modules/user'
import getters from './getters'
import account from './modules/account'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tab: 'listTab',
    accountData: ''
  },
  mutations: {
  },
  modules: {
    app,
    permission,
    tagsView,
    user,
    search,
    account
  },
  getters
})

export default store
