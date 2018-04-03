import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(menus, route) {
  if (route.children && route.children.length > 0) {
    // 判断各分管理模块（客户、财务、成本）的子路由是否存在menus中，如果存在，左侧菜单栏展示总管理模块title
    var res = route.children.filter(route => menus.indexOf(route.menu) > -1)
    return res.length > 0
  }
  if (route.menu) {
    /*
     * 如果这个路由有menu属性,就需要判断用户是否拥有此menu权限
     */
    // console.log('menus', menus)
    // console.log('menus', route.menu)
    return menus.indexOf(route.menu) > -1
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) {
      // console.log('hasPermission true')
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, userInfo) {
      return new Promise(resolve => {
        const role = userInfo.roleName
        const menus = userInfo.menuList
        let accessedRouters
        // accessedRouters = asyncRouterMap
        if (role === '管理员') {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
        }
        // console.log('accessedRouters', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
