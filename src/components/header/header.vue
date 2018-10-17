<template>
    <header class="header postion-relative">
        <div class="container main">
            <div class="row">
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3">
                    <div class="logo">
                        <a href=""><img  src="../../assets/logo.png" alt="" ></a>
                    </div>
                </div>
                <div class="col-xl-8 col-lg-7 d-none d-lg-block">
                    <div class="main-menu">
                        <nav>
                            <a href="#" :class="{aActive:i=='home'}" @click="go('home')">首页</a>                       
                            <a href="#" :class="{aActive:i=='HashRate'}"  @click="go('HashRate')">算力租赁</a>
                            <a href="#">矿机租赁</a>
                            <a href="#">矿机合租</a>
                            <a href="#">矿机托管</a>
                            <a href="#">矿机商城</a>
                            <a href="#" :class="{aActive:i=='calculator'}"  @click="go('calculator')">计算工具</a>
                        </nav>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-9 col-sm-9 col-9">
                    <div class="main-config">
                        <div class="user-info">
                            <a href="#">登录</a>
                            <a href="#">注册</a>
                        </div>
                        <div class="language-info position-relative">
                            <a href="#">语言</a>
                            <ul class="submenu w-200 text-center">
                                <li><a href="#"><i class="iconfont icon-zhongwen"></i>中文</a></li>
                                <li><a href="#"><i class="iconfont icon-yingwen"></i>英文</a></li>
                            </ul>                            
                        </div>
                        <div class="more d-lg-none"><i class="iconfont icon-menu cursor-pointer" @click="showMenu()"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <ul v-if="show" class="menu submenu w-200 text-center d-lg-none">
              <li><a href="#" :class="{aActive:i=='home'}" @click="go('home')" >首页</a></li>
              <li><a href="#"   :class="{aActive:i=='HashRate'}"  @click="go('HashRate')" >算力租赁</a></li>
              <li><a href="#">矿机租赁</a></li>
              <li><a href="#">矿机合租</a></li>
              <li><a href="#">矿机托管</a></li>
              <li><a href="#">矿机商城</a></li>
              <li><a href="#"  :class="{aActive:i=='calculator'}"  @click="go('calculator')">计算工具</a></li>
            </ul>
        </transition>
    </header>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      i: "home"
    };
  },
  computed: {
    route() {
      return this.$route.path;
    }
  },
  methods: {
    showMenu() {
      this.show = !this.show;
    },
    go(i) {
      this.$router.push(i);
      this.i = i;
    }
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
}
.header {
  width: 100%;
  height: 70px;
  background: #252733;
  border-bottom: 1px solid #1a1c1f;
  .main {
    .logo {
      height: 70px;
      display: flex;
      flex-direction: row;
      flex-wrap: no-wrap;
      justify-content: flex-start;
      align-items: center;
      img {
        position: relative;
        top: 3px;
      }
    }
    .main-menu {
      nav {
        height: 70px;
        display: flex;
        flex-direction: row;
        flex-wrap: no-wrap;
        justify-content: space-around;
        align-items: center;
        a {
          display: inline-block;
          color: #f0eeef;
          height: 70px;
          font-size: 14px;
          font-weight: 600;
          line-height: 70px;
          text-decoration: none;

          &.aActive {
            color: #d86f06;
            border-bottom: 4px solid #d86f06;
          }
        }
      }
    }
    .main-config {
      height: 70px;
      display: flex;
      flex-direction: row;
      flex-wrap: no-wrap;
      justify-content: flex-end;
      align-items: center;
      color: #f0eeef;
      a {
        display: inline-block;
        width: 45px;
        font-size: 14px;
        font-weight: 600;
        color: #f0eeef;
        text-decoration: none;
        position: relative;
      }
      a:not(:first-of-type)::before {
        content: "";
        position: absolute;
        top: 6px;
        left: -10px;
        width: 1px;
        height: 10px;
        background: #fff;
        opacity: 0.4;
      }
      .language-info {
        height: 70px;
        & > a {
          line-height: 70px;
        }
        &:hover > .submenu {
          opacity: 1;
          top: 95%;
          visibility: visible;
        }
        .submenu {
          background: #fff none repeat scroll 0 0;
          box-shadow: 0 0 7px 0.5px rgba(0, 0, 0, 0.15);
          display: block;
          left: -20px;
          opacity: 0;
          padding: 10px 0px 14px;
          position: absolute;
          top: 120%;
          transition: all 0.3s ease 0s;
          visibility: hidden;
          width: 80px;
          z-index: 999;
          li {
            a {
              color: #252733;
              font-weight: bold;
              line-height: 30px;
            }
            &:hover {
              background: #d86f06;
              a {
                color: #f0eeef;
              }
            }
          }
        }
      }
    }
    .cursor-pointer {
      cursor: pointer;
    }
  }
  .menu {
    background: #252733;
    a {
      display: inline-block;
      font-size: 14px;
      line-height: 36px;
      font-weight: 600;
      height: 36px;
      min-width: 100%;
      text-align: center;
      text-decoration: none;
      color: #f0eeef;

      &.aActive {
        border-bottom: 2px solid #d86f06;
      }
    }
  }
  .submenu {
    // background: #fff none repeat scroll 0 0;
    box-shadow: 0 0 7px 0.5px rgba(0, 0, 0, 0.15);
    display: block;
    top: 70px;
    right: 2px;
    padding: 10px 30px 14px;
    position: absolute;
    width: 168px;
    z-index: 999;
  }
  /*   .fade-move {
    transition: transform 1s;
  } */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease 0s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: scale(0, 0);
    transform-origin: right top;
    visibility: hidden;
  }
  .fade-enter-to, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
    opacity: 1;
    transform: scale(1, 1);
    visibility: visible;
  }
}
</style>

