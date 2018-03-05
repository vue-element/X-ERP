import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import search from './modules/search'
import user from './modules/user'
import account from './modules/account'
import getters from './getters'
import contractMsg from './modules/contractMsg'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    user,
    search,
    account,
    contractMsg
  },
  getters
})

export default store
