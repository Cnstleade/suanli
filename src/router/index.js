import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/page/home'
import HashRate from '@/components/page/HashRate'
import calculator from '@/components/page/calculator'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    children: [{
        path: '/',
        name: 'home',
        component: Home,
      }, {
        path: 'home',
        name: 'home',
        component: Home,
      },
      {
        path: 'HashRate',
        name: 'HashRate',
        component: HashRate,
      },
      {
        path: 'calculator',
        name: 'calculator',
        component: calculator,
      },
    ]
  }, {
    path: '/admin',
    component: resolve => require(['../backstage/common/Home.vue'], resolve),
    meta: {
      title: '自述文件'
    },
  }]
})
