import 'vuex'
//  存储登录后的account数据
const account = {
  mutations: {
    CHANGE_INFO: (state, count) => {
      state.accountData = count
    //  console.log(state.account)
    }
  }
}

export default account
