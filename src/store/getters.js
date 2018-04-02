const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  setting: state => state.user.setting,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  permissions: state => state.account.permissions,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  searchObj: state => state.search.searchObj,
  doSearch: state => state.search.doSearch,

  userName: state => state.account.userName,
  accountName: state => state.account.accountName,
  token: state => state.account.token
  // roles: state => state.account.roles
}
export default getters
