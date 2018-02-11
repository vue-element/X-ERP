// import Cookies from 'js-cookie'
import { getToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    userInfo: {},
    token: getToken()
  },
  mutations: {
    login (state, userInfo) {
      state.userInfo = userInfo
    },
    setToken: (state, token) => {
      state.token = token
    },
    logout: (state) => {
      state.userInfo = {}
      state.token = ''
      removeToken()
    }
  },
  actions: {
    login({ commit }, userInfo) {
      commit('login', userInfo)
    },
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    logout({ commit }) {
      commit('logout')
    }
  }
}
export default user
