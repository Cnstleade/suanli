//getters



export default {
  isLogin(state) {
    if (!state.isLogin) {
      state.isLogin = sessionStorage.getItem('zby_isLogin'); //从sessionStorage中读取状态  
      state.loginId = sessionStorage.getItem('zby_loginId');
    }
    return state.isLogin
  },
  loginId(state) {
    if (!state.isLogin) {
      state.isLogin = sessionStorage.getItem('zby_isLogin'); //从sessionStorage中读取状态  
      state.loginId = sessionStorage.getItem('zby_loginId');
    }
    return state.loginId
  },
  role(state) {
    if (!state.isLogin) {
      state.role = sessionStorage.getItem('zby_role'); //从sessionStorage中读取状态  
    }
    return state.role
  },
  userInfo(state) {
    state.userInfo = JSON.parse(sessionStorage.getItem('zby_userInfo')); //从sessionStorage中读取状态  
    return state.userInfo
  },
  newrouter: state => state.newrouter,
  username: state => state.username,
}
