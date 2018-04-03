import store from '../store'

export function hasPermission(permission) {
  const myPermissions = store.getters.permissions // 所有接口权限
  return myPermissions.indexOf(permission) > -1
}
