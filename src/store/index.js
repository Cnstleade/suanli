import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

const state = {
  isLogin: false,
  username: "",
  loginId: sessionStorage.getItem('zby_loginId'),
  role: sessionStorage.getItem('zby_role'),
  newrouter: [],
  userInfo: {}, //用户信息
  cartList: {}, // 加入购物车的商品列表
  remarkText: null, //可选备注内容
  login: true, //是否登录
  cartPrice: null, //会员卡价格 价格很好了
  count: 0,
  color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
