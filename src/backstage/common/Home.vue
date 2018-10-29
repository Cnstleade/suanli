<template>
    <div >
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}" >
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                  {{isLogin}}
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Siderbar.vue";
import vTags from "./Tags.vue";
import bus from "../../config/bus";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      collapse: false,
      error: true
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["isLogin"])
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  // watch: {
  //   isLogin(n, o) {
  //     console.log(n);
  //     if (!n) {
  //       this.$router.push("/adminlogin");
  //     }
  //   }
  // },
  methods: {
    ...mapMutations(["ADD_LOGIN_USER"])
  },

  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    bus.$on("error", msg => {
      this.error = msg;
    });
  },
  mounted() {
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

/* html,
body,

.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
} */

body {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "microsoft yahei",
    arial, STHeiTi, sans-serif;
}

a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
.containers {
  padding: 30px;
  background: #fff;
  border: 1px sold #ddd;
  border-radius: 5px;
}
.content-box {
  position: absolute;
  left: 185px;
  right: 0px;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
.content {
  width: auto;
  padding: 20px 10px;
}
.content-collapse {
  left: 65px;
}
</style>

