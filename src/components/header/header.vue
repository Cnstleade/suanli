<template>
    <header class="header postion-relative">
        <div class="container main">
            <div class="row">
                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3">
                    <div class="logo">
                        <a href=""><img  src="../../assets/logo.png" alt="" width="40px;height:40px"></a>
                        <span class="d-none d-sm-inline-block">挖矿</span>
                    </div>
                </div>
                <div class="col-xl-8 col-lg-7 d-none d-lg-block">
                    <div class="main-menu">
                        <nav>
                            <a href="#">首页</a>                       
                            <a href="#">算力租赁</a>
                            <a href="#">矿机租赁</a>
                            <a href="#">矿机合租</a>
                            <a href="#">矿机托管</a>
                            <a href="#">矿机商城</a>
                            <a href="#">计算工具</a>
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
              <li><a href="#">首页</a></li>
              <li><a href="#">算力租赁</a></li>
              <li><a href="#">矿机租赁</a></li>
              <li><a href="#">矿机合租</a></li>
              <li><a href="#">矿机托管</a></li>
              <li><a href="#">矿机商城</a></li>
              <li><a href="#">计算工具</a></li>
            </ul>
        </transition>
    </header>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    showMenu() {
      this.show = !this.show;
    }
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
  background: #1a1c1f;
  border-bottom: 1px solid #1a1c1f;
  .main {
    .logo {
      height: 70px;
      display: flex;
      flex-direction: row;
      flex-wrap: no-wrap;
      justify-content: flex-start;
      align-items: center;
      span {
        margin-left: 10px;
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
          color: #d2d6dc;
          height: 70px;
          line-height: 70px;
          text-decoration: none;
          border-bottom: 4px solid #009ffd;
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
      color: #d2d6dc;
      a {
        display: inline-block;
        width: 45px;
        font-size: 14px;
        color: #d2d6dc;
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
              color: #1a1c1f;
              font-weight: bold;
              line-height: 30px;
            }
            &:hover {
              background: red;
              a {
                color: #fff;
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
    background: #1a1c1f;
    a {
      font-size: 16px;
      line-height: 26px;
      color: #fff;
      text-decoration: none;
    }
  }
  .submenu {
    // background: #fff none repeat scroll 0 0;
    box-shadow: 0 0 7px 0.5px rgba(0, 0, 0, 0.15);
    display: block;
    top: 65px;
    right: 10px;
    padding: 10px 0px 14px;
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

