// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import './assets/css/bootstrap.min.css';
import './assets/css/iconfont.css';
import store from './store/index.js';
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import echarts from 'echarts'
import * as custom from './config/dateFilter';
import ElementLocale from 'element-ui/lib/locale'
import 'babel-polyfill'
import {
  messages
} from './config/language'
import {
  powerRouter
} from './router';

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.prototype.$echarts = echarts
// Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});
// const i18n = new VueI18n({
//   locale: 'zh', // 语言标识
//   messages
// })
// ElementLocale.i18n((key, value) => i18n.t(key, value))
FastClick.attach(document.body);

Vue.config.productionTip = false;




router.beforeEach((to, from, next) => {
  if (/index/.test(to.fullPath.slice(1)) || /dashboard/.test(to.fullPath.slice(1))) {
    next();
  } else
  if (store.getters.role) { //判断role 是否存在
    let arr = Array.isArray(store.getters.role) ? store.getters.role : store.getters.role.split(',');
    console.log(store.getters.newrouter)
    if (store.getters.newrouter.length !== 0) {

      let ar = arr.concat(['admin', '404', '403', 'login', 'appRegister', 'download'])
      next();
      if (ar.some(v => {
          return ((to.fullPath.slice(1) == 'admin/' + v) || (to.fullPath.slice(1) == 'adminlogin'))
        })) {
        next();
      } else {
        if (/appRegister/.test(to.fullPath.slice(1))) {
          next();
        } else {
          next('/admin/403')
        }
      }
    } else {
      let newrouter, roles = [];
      arr.forEach(role => {
        if (powerRouter[0].children.filter(route => {
            if (route.meta) {
              return route.meta.role == role
            } else {
              return true
            }
          })[0] !== undefined) {
          roles.push(
            powerRouter[0].children.filter(route => {
              if (route.meta) {
                return route.meta.role == role
              } else {
                return true
              }
            })[0]
          )
        }
      })
      newrouter = powerRouter
      newrouter[0].children = roles;
      router.addRoutes(newrouter) //添加动态路由
      store.dispatch('Roles', newrouter).then(res => {
        next({ ...to
        })
      }).catch(() => {

      })
    }
  } else {
    if (['/adminlogin'].indexOf(to.path) !== -1) {
      next()
    } else {
      sessionStorage.removeItem('hsjr_username');
      next('/adminlogin')
    }
  }
  // store.dispatch('SETLogin')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
