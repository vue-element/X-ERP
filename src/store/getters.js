const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  searchObj: state => state.search.searchObj,
  doSearch: state => state.search.doSearch,

  userName: state => state.account.userName,
  accountName: state => state.account.accountName,
  token: state => state.account.token,
  permissions: state => state.account.permissions,
  roleCode: state => state.account.roleCode,
  roleName: state => state.account.roleName
}
export default getters
