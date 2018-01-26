const searchObj = {
  state: {
    searchObj: {},
    doSearch: false
  },
  mutations: {
    setSearchObj(state, searchObj) {
      state.searchObj = searchObj
      state.doSearch = true
    },
    resetSearch(state) {
      state.searchObj = {}
      state.doSearch = false
    },
  },
  actions: {
    setSearchObj({ commit }, searchObj) {
      commit('setSearchObj', searchObj)
    },
    resetSearch({ commit }) {
      commit('resetSearch')
    }
  }
}
export default searchObj
