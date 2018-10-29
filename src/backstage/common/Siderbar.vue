<template>
    <div class="sidebar" id="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.list">
                    <el-submenu :index="'/admin/'+item.nurl" :key="'/admin/'+item.nurl">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.list" :key="i" :index="'/admin/'+subItem.nurl">
                            <i :class="subItem.icon"></i><span slot="title">{{subItem.mname}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="'/admin/'+item.nurl" :key="'/admin/'+item.nurl">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.mname }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { httpGetMenu } from "@/service/http";
import { mapGetters } from "vuex";
import bus from "../../config/bus";
export default {
  data() {
    return {
      collapse: false,
      items: []
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("", "");
    },
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "loginId"
      // ...
    ])
  },
  methods: {
    getHttpGetCreditMenuList() {
      httpGetMenu(this.loginId).then(res => {
        let data = res.data;
        this.items = JSON.parse(JSON.stringify(data));
      });
    }
  },
  mounted() {
    this.getHttpGetCreditMenuList();
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style >
#sidebar .el-submenu__title,
#sidebar .el-menu-item {
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

