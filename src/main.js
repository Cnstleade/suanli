// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import './assets/css/bootstrap.min.css';
import './assets/css/iconfont.css';
import store from './store/index.js';
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import {messages} from './config/language'

Vue.use(VueI18n);
Vue.use(ElementUI, {
  locale,
  size: 'small',
  zIndex: 3000
});
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages
})
FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
