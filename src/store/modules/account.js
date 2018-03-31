import { getToken, removeToken } from '@/utils/auth'
// import store from '../../store'
// import router from '../../router'
const user = {
  state: {
    // userInfo: {},
    token: getToken(),
    // roles: [],
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
      state.permissions = userInfo.permissionList
      state.roleCode = userInfo.roleCode
      state.roleId = userInfo.roleId
      state.roleName = userInfo.roleName
      state.userCode = userInfo.userCode
      state.userName = userInfo.userName
    },
    logout: (state) => {
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
    }
    // // 获取用户信息
    // GetInfo({commit, state}) {
    //   return new Promise((resolve, reject) => {
    //     api({
    //       url: '/SHIRO/getInfo',
    //       method: 'post'
    //     }).then(data => {
    //       // 储存用户信息
    //       commit('SET_USER', data.userPermission)
    //       // cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
    //       setToken()
    //       let userPermission = data.userPermission
    //       store.dispatch('GenerateRoutes', userPermission).then(() => {
    //         // 生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添
    //         router.addRoutes(store.getters.addRouters)
    //       })
    //       resolve(data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   }
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
