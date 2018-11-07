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
      redirect: '/index'
    },
    /* 大盘 */
    {
      path: '/dashboard',
      name: 'dashboard',
      component: resolve => require(['@/backstage/dashboard/dashboard.vue'], resolve),
      meta: {
        title: '大盘',
        role: 'dashboard'
      }
    },
    /* 大盘 */
    {
      path: '/dashboard1',
      name: 'dashboard1',
      component: resolve => require(['@/backstage/dashboard/dashboard1.vue'], resolve),
      meta: {
        title: '大盘',
        role: 'dashboard1'
      }
    },
    /* 登录 */
    {
      path: '/adminlogin',
      name: 'login',
      component: resolve => require(['@/backstage/login.vue'], resolve),
      meta: {
        title: '登录',
        role: 'login'
      }
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
          path: '',
          redirect: 'home'
        },
        {
          path: 'login',
          name: 'login',
          component: resolve => require(['@/components/login.vue'], resolve),
        }, {
          path: 'register',
          name: 'register',
          component: resolve => require(['@/components/register.vue'], resolve),
        },
        {
          path: 'home',
          name: 'home',
          component: resolve => require(['@/components/page/home.vue'], resolve),
        },
        {
          path: 'HashRate',
          name: 'HashRate',
          component: resolve => require(['@/components/page/HashRate.vue'], resolve),
        },
        {
          path: 'calculator',
          name: 'calculator',
          component: resolve => require(['@/components/page/calculator.vue'], resolve),
        },
        {
          path: 'MillRental',
          name: 'MillRental',
          component: resolve => require(['@/components/page/MillRental.vue'], resolve),
        },
        {
          path: 'MillRoommates',
          name: 'MillRoommates',
          component: resolve => require(['@/components/page/MillRoommates.vue'], resolve),
        },

        {
          path: 'personalCenter',
          name: 'personalCenter',
          component: resolve => require(['@/components/page/personalCenter.vue'], resolve),
          children: [{
              path: '/',
              redirect: 'property'
            },
            {
              path: 'property',
              name: 'property ',
              component: resolve => require(['@/components/page/personalCenter/property.vue'], resolve),
            }, {
              path: 'hashrate',
              name: 'hashrate ',
              component: resolve => require(['@/components/page/personalCenter/hashrate.vue'], resolve),
            }, {
              path: 'mill',
              name: 'mill ',
              component: resolve => require(['@/components/page/personalCenter/mill.vue'], resolve),
            }, {
              path: 'millRoommates',
              name: 'millRoommates',
              component: resolve => require(['@/components/page/personalCenter/millRoommates.vue'], resolve),
            }, {
              path: 'pCenter',
              name: 'pCenter',
              component: resolve => require(['@/components/page/personalCenter/pCenter.vue'], resolve),
            }, {
              path: 'recharge',
              name: 'recharge',
              component: resolve => require(['@/components/page/personalCenter/recharge.vue'], resolve),
            }, {
              path: 'asset',
              name: 'asset',
              component: resolve => require(['@/components/page/personalCenter/asset.vue'], resolve),
            }, {
              path: 'billing',
              name: 'billing',
              component: resolve => require(['@/components/page/personalCenter/billing.vue'], resolve),
            }

          ]
        },
      ]
    },
    {
      path: '/admin/403',
      component: resolve => require(['@/backstage/403.vue'], resolve)
    },
    {
      path: '/admin',
      component: resolve => require(['../backstage/common/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [
        /*     基础管理 */
        {
          path: '/',
          redirect: 'siteConfiguration'
        },
        {
          path: 'siteConfiguration',
          name: 'siteConfiguration',
          component: resolve => require(['@/backstage/page/basicManagement/siteConfiguration.vue'], resolve),
          meta: {
            title: '网站配置',
            role: 'siteConfiguration'
          }
        },
        {
          path: 'myWorkOrder',
          name: 'myWorkOrder',
          component: resolve => require(['@/backstage/page/workorder/myWorkOrder.vue'], resolve),
          meta: {
            title: '我的工单',
            role: 'myWorkOrder'
          }
        },
        {
          path: 'errorTYpe',
          name: 'errorTYpe',
          component: resolve => require(['@/backstage/page/workorder/errorTYpe.vue'], resolve),
          meta: {
            title: '错误类型',
            role: 'errorTYpe'
          }
        },
      ]
    }
  ]
})


export const powerRouter = [{
  path: '/admin',
  component: resolve => require(['../backstage/common/Home.vue'], resolve),
  meta: {
    title: '自述文件'
  },
  children: [
    /*     基础管理 */
    // {
    //   path: '/',
    //   redirect: 'siteConfiguration'
    // },
    {
      path: 'siteConfiguration',
      name: 'siteConfiguration',
      component: resolve => require(['@/backstage/page/basicManagement/siteConfiguration.vue'], resolve),
      meta: {
        title: '网站配置',
        role: 'siteConfiguration'
      }
    },
    {
      path: 'contractTemplate',
      name: 'contractTemplate',
      component: resolve => require(['@/backstage/page/basicManagement/contractTemplate.vue'], resolve),
      meta: {
        title: '合同模板',
        role: 'contractTemplate'
      }
    },
    {
      path: 'minerBrandManagement',
      name: 'minerBrandManagement',
      component: resolve => require(['@/backstage/page/basicManagement/minerBrandManagement.vue'], resolve),
      meta: {
        title: '矿机品牌管理',
        role: 'minerBrandManagement'
      }
    },
    {
      path: 'mineModelNumberManagement',
      name: 'mineModelNumberManagement',
      component: resolve => require(['@/backstage/page/basicManagement/mineModelNumberManagement.vue'], resolve),
      meta: {
        title: '矿机型号管理',
        role: 'mineModelNumberManagement'
      }
    },
    {
      path: 'orePoolManagement',
      name: 'orePoolManagement',
      component: resolve => require(['@/backstage/page/basicManagement/orePoolManagement.vue'], resolve),
      meta: {
        title: '矿池管理',
        role: 'orePoolManagement'
      }
    }
    /*  管理员管理 */
    ,
    {
      path: 'authorityManagement',
      name: 'authorityManagement',
      component: resolve => require(['@/backstage/page/administratorManagement/authorityManagement.vue'], resolve),
      meta: {
        title: '权限管理',
        role: 'authorityManagement'
      }
    },
    {
      path: 'roleManagement',
      name: 'roleManagement',
      component: resolve => require(['@/backstage/page/administratorManagement/roleManagement.vue'], resolve),
      meta: {
        title: '角色管理',
        role: 'roleManagement'
      }
    },
    {
      path: 'administrator',
      name: 'administrator',
      component: resolve => require(['@/backstage/page/administratorManagement/administrator.vue'], resolve),
      meta: {
        title: '管理员',
        role: 'administrator'
      }
    },
    {
      path: 'invitationCode',
      name: 'invitationCode',
      component: resolve => require(['@/backstage/page/administratorManagement/invitationCode.vue'], resolve),
      meta: {
        title: '邀请码',
        role: 'invitationCode'
      }
    }
    /*  用户管理 */
    ,
    {
      path: 'userManagement',
      name: 'userManagement',
      component: resolve => require(['@/backstage/page/userManagement/userManagement.vue'], resolve),
      meta: {
        title: '用户管理',
        role: 'userManagement'
      }
    },
    {
      path: 'subAccountManagement',
      name: 'subAccountManagement',
      component: resolve => require(['@/backstage/page/userManagement/subAccountManagement.vue'], resolve),
      meta: {
        title: '子账户管理',
        role: 'subAccountManagement'
      }
    },
    {
      path: 'passApproval',
      name: 'passApproval',
      component: resolve => require(['@/backstage/page/userManagement/passApproval.vue'], resolve),
      meta: {
        title: '用户组管理',
        role: 'passApproval'
      }
    },
    {
      path: 'walletAddressManagement',
      name: 'walletAddressManagement',
      component: resolve => require(['@/backstage/page/userManagement/walletAddressManagement.vue'], resolve),
      meta: {
        title: '钱包地址管理',
        role: 'walletAddressManagement'
      }
    },
    {
      path: 'LogOnToLog',
      name: 'LogOnToLog',
      component: resolve => require(['@/backstage/page/userManagement/LogOnToLog.vue'], resolve),
      meta: {
        title: '登录日志',
        role: 'LogOnToLog'
      }
    }
    /*  矿机管理 */
    ,
    {
      path: 'millManagement',
      name: 'millManagement',
      component: resolve => require(['@/backstage/page/millManagement/millManagement.vue'], resolve),
      meta: {
        title: '矿机管理',
        role: 'millManagement'
      }
    },
    {
      path: 'mineManagement',
      name: 'mineManagement',
      component: resolve => require(['@/backstage/page/millManagement/mineManagement.vue'], resolve),
      meta: {
        title: '矿场管理',
        role: 'mineManagement'
      }
    },
    {
      path: 'changeManagementOfMinerPowerConsumption',
      name: 'changeManagementOfMinerPowerConsumption',
      component: resolve => require(['@/backstage/page/millManagement/changeManagementOfMinerPowerConsumption.vue'], resolve),
      meta: {
        title: '矿机功耗变化管理',
        role: 'changeManagementOfMinerPowerConsumption'
      }
    },
    {
      path: 'miningMachineWorkOrderManagement',
      name: 'miningMachineWorkOrderManagement',
      component: resolve => require(['@/backstage/page/millManagement/miningMachineWorkOrderManagement.vue'], resolve),
      meta: {
        title: '矿机工单管理',
        role: 'miningMachineWorkOrderManagement'
      }
    }
    /*   套餐管理 */
    ,
    {
      path: 'millSetMeal',
      name: 'millSetMeal',
      component: resolve => require(['@/backstage/page/packageManagement/millSetMeal.vue'], resolve),
      meta: {
        title: '矿机套餐',
        role: 'millSetMeal'
      }
    },
    {
      path: 'powerRentalPackages',
      name: 'powerRentalPackages',
      component: resolve => require(['@/backstage/page/packageManagement/powerRentalPackages.vue'], resolve),
      meta: {
        title: '算力租赁套餐',
        role: 'powerRentalPackages'
      }
    }
    /*  订单管理 */
    ,
    {
      path: 'minerOrderList',
      name: 'minerOrderList',
      component: resolve => require(['@/backstage/page/orderManagement/minerOrderList.vue'], resolve),
      meta: {
        title: '矿机订单列表',
        role: 'minerOrderList'
      }
    },
    {
      path: 'calculateTheForceOrderList',
      name: 'calculateTheForceOrderList',
      component: resolve => require(['@/backstage/page/orderManagement/calculateTheForceOrderList.vue'], resolve),
      meta: {
        title: '算力订单列表',
        role: 'calculateTheForceOrderList'
      }
    },
    {
      path: 'minerHostingList',
      name: 'minerHostingList',
      component: resolve => require(['@/backstage/page/orderManagement/minerHostingList.vue'], resolve),
      meta: {
        title: '矿机托管列表',
        role: 'minerHostingList'
      }
    },
    {
      path: 'rechargeOrderList',
      name: 'rechargeOrderList',
      component: resolve => require(['@/backstage/page/orderManagement/rechargeOrderList.vue'], resolve),
      meta: {
        title: '充值订单列表',
        role: 'rechargeOrderList'
      }
    },
    {
      path: 'electricityOrderList',
      name: 'electricityOrderList',
      component: resolve => require(['@/backstage/page/orderManagement/electricityOrderList.vue'], resolve),
      meta: {
        title: '电费订单列表',
        role: 'electricityOrderList'
      }
    }
    /*  财务 */
    ,
    {
      path: 'millProceeds',
      name: 'millProceeds',
      component: resolve => require(['@/backstage/page/finance/millProceeds.vue'], resolve),
      meta: {
        title: '矿机收益',
        role: 'millProceeds'
      }
    },
    {
      path: 'theUserBenefits',
      name: 'theUserBenefits',
      component: resolve => require(['@/backstage/page/finance/theUserBenefits.vue'], resolve),
      meta: {
        title: '用户收益',
        role: 'theUserBenefits'
      }
    },
    {
      path: 'cashManagement',
      name: 'cashManagement',
      component: resolve => require(['@/backstage/page/finance/cashManagement.vue'], resolve),
      meta: {
        title: '提现管理',
        role: 'cashManagement'
      }
    },
    {
      path: 'yield',
      name: 'yield',
      component: resolve => require(['@/backstage/page/finance/yield.vue'], resolve),
      meta: {
        title: '收益率管理',
        role: 'yield'
      }
    },
    {
      path: 'orderManagement',
      name: 'orderManagement',
      component: resolve => require(['@/backstage/page/finance/orderManagement.vue'], resolve),
      meta: {
        title: '订单收益管理',
        role: 'orderManagement'
      }
    }
    /*  资讯列表  */
    ,
    {
      path: 'informationManagement',
      name: 'informationManagement',
      component: resolve => require(['@/backstage/page/informationManagement/informationManagement.vue'], resolve),
      meta: {
        title: '提现管理',
        role: 'informationManagement'
      }
    }
    /*  三方管理 */
    ,
    {
      path: 'threePartiesList',
      name: 'threePartiesList',
      component: resolve => require(['@/backstage/page/threePartiesManagement/threePartiesList.vue'], resolve),
      meta: {
        title: '提现管理',
        role: 'threePartiesList'
      }
    },
    {
      path: 'myWorkOrder',
      name: 'myWorkOrder',
      component: resolve => require(['@/backstage/page/workorder/myWorkOrder.vue'], resolve),
      meta: {
        title: '我的工单',
        role: 'myWorkOrder'
      }
    },
    {
      path: 'errorTYpe',
      name: 'errorTYpe',
      component: resolve => require(['@/backstage/page/workorder/errorTYpe.vue'], resolve),
      meta: {
        title: '错误类型',
        role: 'errorTYpe'
      }
    },
  ]
}]
