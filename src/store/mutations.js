import {
  ADD_LOGIN_USER,
  SIGN_OUT,
  SET_NEWROUER,
  USER_LOGIN,


  RECORD_ADDRESS,
  ADD_CART,
  REDUCE_CART,
  INIT_BUYCART,
  CLEAR_CART,
  RECORD_SHOPDETAIL,
  RECORD_USERINFO,
  GET_USERINFO,
  CONFIRM_REMARK,
  CONFIRM_INVOICE,
  CHOOSE_SEARCH_ADDRESS,
  SAVE_GEOHASH,
  CONFIRM_ADDRESS,
  CHOOSE_ADDRESS,
  NEED_VALIDATION,
  SAVE_CART_ID_SIG,
  SAVE_ORDER_PARAM,
  CHANGE_ORDER_PARAM,
  ORDER_SUCCESS,
  SAVE_SHOPID,
  SAVE_ORDER,
  OUT_LOGIN,
  RETSET_NAME,
  SAVE_AVANDER,
  SAVE_ADDRESS,
  SAVE_ADDDETAIL,
  SAVE_QUESTION,
  ADD_ADDRESS,
  BUY_CART,
} from './mutation-types.js'

import {
  setStore,
  getStore
} from '../config/session'


export default {
  //   ADD_LOGIN_USER (state,data) {  //登入，保存状态  
  //     sessionStorage.setItem("username", data);  //添加到sessionStorage  
  //     sessionStorage.setItem("isLogin",true);  
  //     state.username=data,             //同步的改变store中的状态  
  //     state.isLogin=true  
  // },  
  // SIGN_OUT (state) {   //退出，删除状态  
  //     sessionStorage.removeItem("username");  //移除sessionStorage  
  //     sessionStorage.removeItem("isLogin");  
  //     state.username=''                //同步的改变story中的状态  
  //     state.isLogin=false  
  // }

  /* 前台用户登录 */
  [USER_LOGIN](state, data) {
    sessionStorage.setItem("zby_isLogin", true);
    sessionStorage.setItem("zby_userInfo", JSON.stringify(data));
    state.userInfo = data, //同步的改变store中的状态  
      state.isLogin = true
  },



  /*  后台用户登录 */
  [ADD_LOGIN_USER](state, data) {
    // sessionStorage.setItem("zby_username", data); //添加到sessionStorage  
    sessionStorage.setItem("zby_isLogin", true);
    sessionStorage.setItem("zby_loginId", data.loginId);
    // sessionStorage.setItem("zby_role", data.data);
    sessionStorage.setItem("zby_role", ['myWorkOrder', 'errorType']);
    state.loginId = data.loginId, //同步的改变store中的状态  
      //  state.role = data.data, //同步的改变store中的状态  
      state.role = ['myWorkOrder', 'errorType'], //同步的改变store中的状态  
      state.isLogin = true
  },

  /*  用户退出 */
  [SIGN_OUT](state) {
    sessionStorage.removeItem("zby_loginId"); //移除sessionStorage  
    sessionStorage.removeItem("zby_isLogin");
    sessionStorage.removeItem("zby_userInfo");
    state.userInfo = {};
    state.loginId = '' //同步的改变story中的状态  
    state.isLogin = false
  },

  /*   存储最新的路由 */
  SET_NEWROUER: (state, newrouter) => {
    state.newrouter = newrouter;
  },



  // SIGN_OUT (state) {   //退出，删除状态  
  //     sessionStorage.removeItem("username");  //移除sessionStorage  
  //     sessionStorage.removeItem("isLogin");  
  //     state.username=''                //同步的改变story中的状态  
  //     state.isLogin=false  
  // }



  // 加入购物车
  [ADD_CART](state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
    packing_fee,
    sku_id,
    stock
  }) {
    let cart = state.cartList;
    let shop = cart[shopid] = (cart[shopid] || {});
    let category = (shop[category_id] || {});
    let item = category[item_id] = (category[item_id] || {});
    if (item[food_id]) {
      item[food_id]['num']++;
    } else {
      item[food_id] = {
        "num": 1,
        "id": food_id,
        "name": name,
        "price": price,
        "specs": specs,
        "packing_fee": packing_fee,
        "sku_id": sku_id,
        "stock": stock
      };
    }
    state.cartList = { ...cart
    };
    //存入localStorage
    setStore('buyCart', state.cartList);
  },
  // 移出购物车
  [REDUCE_CART](state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
  }) {
    let cart = state.cartList;
    let shop = (cart[shopid] || {});
    let category = (shop[category_id] || {});
    let item = (category[item_id] || {});
    if (item && item[food_id]) {
      if (item[food_id]['num'] > 0) {
        item[food_id]['num']--;
        state.cartList = { ...cart
        };
        //存入localStorage
        setStore('buyCart', state.cartList);
      } else {
        //商品数量为0，则清空当前商品的信息
        item[food_id] = null;
      }
    }
  },
  //网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART](state) {
    let initCart = getStore('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },
  //清空当前商品的购物车信息
  [CLEAR_CART](state, shopid) {
    state.cartList[shopid] = null;
    state.cartList = { ...state.cartList
    };
    setStore('buyCart', state.cartList);
  },
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore('user_id', info.user_id);
  },
  //获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    };
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = { ...info
      };
    } else {
      state.userInfo = null;
    }
  },
  //修改用户名
  [RETSET_NAME](state, username) {
    state.userInfo = Object.assign({}, state.userInfo, {
      username
    })
  },

  //退出登录
  [OUT_LOGIN](state) {
    state.userInfo = {};
    state.login = false;
  },
  //会员卡价格纪录
  [BUY_CART](state, price) {
    state.cartPrice = price;
  },

}
