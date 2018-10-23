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
import ElementLocale from 'element-ui/lib/locale'
import {
  messages
} from './config/language'

Vue.prototype.$echarts = echarts
// Vue.use(VueI18n);
Vue.use(ElementUI, {
  locale,
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
