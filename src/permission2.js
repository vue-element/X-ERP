import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken, getSession } from '@/utils/auth' // 验权
import { Message } from 'element-ui'

// permissiom judge
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

const whiteList = ['/login', '/authredirect']// 不重定向白名单

router.beforeEach((to, from, next) => {
  if (getToken() || getSession()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // 结束Progress
    } else if (!store.getters.role) {
      store.dispatch('GetInfo').then(() => {
        next({...to})
      })
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    // 如果前往的路径是白名单内的,就可以直接前往
    next()
  } else {
    // 如果路径不是白名单内的,而且又没有登录,就跳转登录页面
    next('/login')
    NProgress.done() // 结束Progress
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
