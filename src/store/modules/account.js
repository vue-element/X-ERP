import { getToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    userInfo: {},
    token: getToken(),
    roles: []
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
    },
    setRoles: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    login({ commit }, userInfo) {
      commit('login', userInfo)
    },
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setRoles({ commit }, roles) {
      commit('setRoles', roles)
    },
    logout({ commit }) {
      commit('logout')
    }
    // // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error')
    //       }
    //       const data = response.data
    //       commit('setRoles', data.role)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }
  }
}
export default user
// export function getUserInfo(token) {
//   return new Promise((resolve, reject) => {
//     resolve({
//       data: { username: 'admin', name: 'admin', 'role': ['admin'] }
//       // console.log('getUserInfo', data)
//     })
//   })
// }
