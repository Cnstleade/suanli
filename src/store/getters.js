//getters



export default {
  isLogin(state) {
    if (!state.isLogin) {
      state.isLogin = sessionStorage.getItem('isLogin'); //从sessionStorage中读取状态  
      state.username = sessionStorage.getItem('username');
    }
    return state.isLogin
  },
  username(state) {
    if (!state.isLogin) {
      state.isLogin = sessionStorage.getItem('isLogin'); //从sessionStorage中读取状态  
      state.username = sessionStorage.getItem('username');
    }
    return state.username
  }
}
