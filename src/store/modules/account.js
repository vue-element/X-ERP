import { getToken, removeToken } from '@/utils/auth'
import { post } from '@/utils/request'
// import store from '../../store'
// import router from '../../router'
const user = {
  state: {
    // userInfo: {},
    token: getToken(),
    roles: [],
    // role: '',
    accountId: '',
    accountName: '',
    menus: [],
    permissions: [],
    roleCode: '',
    roleId: '',
    roleName: '',
    userCode: '',
    userName: ''
  },
  mutations: {
    login: (state, userInfo) => {
      state.accountId = userInfo.accountId
      state.accountName = userInfo.accountName
      state.menus = userInfo.menuList
      // state.permissions = [] // ['bussiness:findAllByPage']
      state.permissions = userInfo.permissionList
      state.roleCode = userInfo.roleCode
      state.roleId = userInfo.roleId
      state.roleName = userInfo.roleName
      state.userCode = userInfo.userCode
      state.userName = userInfo.userName
    },
    logout: state => {
      state.accountId = ''
      state.accountName = ''
      state.menus = []
      state.permissions = []
      state.roleCode = ''
      state.roleId = ''
      state.roleName = ''
      state.userCode = ''
      state.userName = ''
      state.token = ''
      removeToken()
    },
    setToken: (state, token) => {
      state.token = token
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
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        post('/shiro/getInfo').then((res) => {
          var userInfo = res.data.userPermission
          console.log('userInfo', userInfo)
          commit('login', userInfo)
          resolve(userInfo)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
