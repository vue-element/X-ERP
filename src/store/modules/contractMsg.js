const contractMsg = {
  state: {
    contractMsg: {}
  },
  mutations: {
    getContractMsg(state, contractMsg) {
      state.contractMsg = contractMsg
    }
  },
  actions: {
    getContractMsg({ commit }, contractMsg) {
      commit('getContractMsg', contractMsg)
    }
  }
}
export default contractMsg
