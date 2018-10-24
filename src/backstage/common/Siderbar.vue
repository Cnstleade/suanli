<template>
    <div class="sidebar" id="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.list">
                    <el-submenu :index="item.nurl" :key="item.nurl">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.list" :key="i" :index="subItem.nurl">
                            <i :class="subItem.icon"></i><span slot="title">{{subItem.mname}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.nurl" :key="item.nurl">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import bus from "../../config/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "icon-yonhu",
          nurl: "basicManagement",
          mname: "基础管理",
          list: [
            {
              nurl: "siteConfiguration",
              mname: "网站配置"
            },
            {
              nurl: "contractTemplate",
              mname: "合同模板"
            },
            {
              nurl: "minerBrandManagement",
              mname: "矿机品牌管理"
            },
            {
              nurl: "mineModelNumberManagement",
              mname: "矿机型号管理"
            },
            {
              nurl: "orePoolManagement",
              mname: "矿池管理"
            }
          ]
        },
        {
          icon: "icon-dingdan",
          nurl: "administratorManagement",
          mname: "管理员管理",
          list: [
            {
              nurl: "authorityManagement",
              mname: "权限管理"
            },
            {
              nurl: "roleManagement",
              mname: "角色管理"
            },
            {
              nurl: "passApproval",
              mname: "用户组管理"
            },            
            {
              nurl: "administrator",
              mname: "管理员"
            },
            {
              nurl: "invitationCode",
              mname: "邀请码"
            }
          ]
        },
        {
          icon: "icon-zuanshi",
          nurl: "userManagement",
          mname: "用户管理",
          list: [
            {
              nurl: "userManagement",
              mname: "用户管理"
            },
            {
              nurl: "subAccountManagement",
              mname: "子账户管理"
            },

            {
              nurl: "walletAddressManagement",
              mname: "钱包地址管理"
            },
            {
              nurl: "LogOnToLog",
              mname: "登录日志"
            }
          ]
        },
        {
          icon: "icon-qian",
          nurl: "millManagement",
          mname: "矿机管理",
          list: [
            {
              nurl: "mineManagement",
              mname: "矿场管理"
            },
            {
              nurl: "millManagement",
              mname: "矿机管理"
            },
            {
              nurl: "changeManagementOfMinerPowerConsumption",
              mname: "矿机功耗变化管理"
            },
            {
              nurl: "miningMachineWorkOrderManagement",
              mname: "矿机工单管理"
            }
          ]
        },
        {
          icon: "icon-zuanshi-copy",
          nurl: "packageManagement",
          mname: "套餐管理",
          list: [
            {
              nurl: "millSetMeal",
              mname: "矿机套餐"
            },

            {
              nurl: "powerRentalPackages",
              mname: "算力租赁套餐"
            }
          ]
        },
        {
          icon: "icon-shuju",
          nurl: "orderManagement",
          mname: "订单电力管理",
          list: [
            {
              nurl: "minerOrderList",
              mname: "矿机订单列表"
            },
            {
              nurl: "calculateTheForceOrderList",
              mname: "算力订单列表"
            },
            {
              nurl: "minerHostingList",
              mname: "矿机托管列表"
            },
            {
              nurl: "rechargeOrderList",
              mname: "充值订单列表"
            },
            {
              nurl: "electricityOrderList",
              mname: "电费订单列表"
            }
          ]
        },
        {
          icon: "icon-yonhu",
          nurl: "finance",
          mname: "财务",
          list: [
            {
              nurl: "millProceeds",
              mname: "矿机收益"
            },
            {
              nurl: "theUserBenefits",
              mname: "用户收益"
            },
            {
              nurl: "cashManagement",
              mname: "提现管理"
            },
            {
              nurl: "yield",
              mname: "收益率管理"
            },
            {
              nurl: "orderManagement",
              mname: "订单管理"
            }
          ]
        },
        {
          icon: "icon-xitong",
          nurl: "informationManagement",
          mname: "资讯管理",
          list: [
            {
              nurl: "informationManagement",
              mname: "资讯列表"
            }
          ]
        },
        {
          icon: "icon-xitong",
          nurl: "threePartiesManagement",
          mname: "三方管理",
          list: [
            {
              nurl: "threePartiesList",
              mname: "三方列表"
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "loginId"
      // ...
    ])
  },
  methods: {
    getHttpGetCreditMenuList(id) {
      let _this = this;
    }
  },
  mounted() {
    // this.getHttpGetCreditMenuList(this.loginId);
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style>
#sidebar .el-submenu__title,
.el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
}
#sidebar .el-submenu .el-menu-item {
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  padding-left: 20px;
  min-width: 160px;
}
#sidebar .el-upload--text {
  height: 36px;
}
</style>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 185px;
}
.sidebar > ul {
  height: 100%;
}

.iconfont {
  margin-right: 5px;
}
</style>

