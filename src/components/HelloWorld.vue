<template>
  <div class="container_fuild" id="hello">
    <v-header  v-if="!isScroll" class=" "></v-header>
    <transition name="fade">
      <v-header v-if="isScroll" class="fixeds d-lg-block d-none"  ></v-header>
    </transition>
      <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from "./header/header";
import vSlider from "./slider/slider";
import vDemo from "./echartDemo/echartDemo";
import vNews from "./news/news";
import vFooter from "./footer/footer";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      isScroll: false
    };
  },
  components: {
    vHeader,
    vSlider,
    vDemo,
    vNews,
    vFooter
  },
  methods: {
    menu() {
      // this.scroll = document.body.scrollTop;
      console.log(document.body.scrollTop);
      if (document.documentElement && document.documentElement.scrollTop) {
        this.scroll = document.documentElement.scrollTop;
      } else if (document.body) {
        this.scroll = document.body.scrollTop;
      }
      this.isScroll = this.scroll > 70;
    },

  },
  mounted() {
    window.addEventListener("scroll", this.menu);
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
#hello {
  background: #ebebeb;
  overflow: hidden;
}
@media screen and (max-width: 720px) {
  .c-header-fixed {
    position: relative;
  }
}
@media screen and (min-width: 721px) {
  .c-header-fixed {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }
  .fixeds {
    position: fixed;
    z-index: 1030;
  }
}

.echart {
  position: relative;
  background: #fff;

  margin-bottom: 66px;
  border-radius: 2px;
  box-shadow: #ddd 1px 2px 9px;
  @media screen and (max-width: 720px) {
    & {
      margin-top: 20px;
    }
  }
  @media screen and (min-width: 721px) {
    & {
      margin-top: -66px;
    }
  }
  .echart1 {
    height: 320px;
  }

  .detail {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    & > img:hover {
      transform: scale(1.05);
      transition: all 0.5s ease;
    }
    div {
      img {
        position: absolute;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        cursor: pointer;
      }
      span {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        font-size: 19px;
      }
    }
  }
  // @media screen and (max-width: 720px) {
  //   .echart1 {
  //     height: 320px;
  //   }
  // }
  // @media screen and (min-width: 721px) {
  //   .echart1 {
  //     height: 320px;
  //   }
  // }
}
.fade-enter-active {
  transition: all 1.5s ease 0s;
}
.fade-leave-active {
  transition: all 1s ease 0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  top: -70px;
}
.fade-enter-to, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
  top: 0px;
}
.c-card-1 {
  box-shadow: 0 4px 16px 0 rgba(120, 121, 125, 0.3);
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  background: #fff;
  h4 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    @media screen and (max-width: 720px) {
      & {
        margin-top: 10px;
        line-height: 40px;
      }
    }
    @media screen and (min-width: 721px) {
      & {
        margin-top: 20px;
        line-height: 80px;
      }
    }
  }
  & > span {
    width: 30px;
    height: 4px;
    background-color: #d86f06;
    margin: 0 auto;
  }
  & > p {
    margin: 20px 0;
    line-height: 20px;
    color: #888;
    @media screen and (max-width: 576px) {
      & {
        font-size: 14px;
      }
    }
    @media screen and (min-width: 577px) {
      & {
        font-size: 18px;
      }
    }
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 40px;
      cursor: pointer;
      background-color: #edf4fb;
      box-shadow: #ddd 1px 2px 9px;
      &:hover {
        background: url(../../static/bg.png) 0 0 no-repeat;
        p {
          color: #fff;
        }
        span {
          background: #fff;
          color: #009ffd;
        }
      }
      div {
        width: 86px;
        height: 86px;
        border: 3px solid #fff;
        border-radius: 50%;
        background: #009ffd;
        color: #fff;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      i {
        display: inline-block;
        width: 80px;
        height: 80px;
        background: url(../../static/icon.png) 0 0 no-repeat;
        &.icon-1 {
          background-position: -241px -159px;
        }
        &.icon-2 {
          background-position: -241px -255px;
        }
        &.icon-3 {
          background-position: -241px -346px;
        }
      }
      p {
        @media screen and (max-width: 576px) {
          & {
            font-size: 14px;
          }
        }
        @media screen and (min-width: 577px) {
          & {
            font-size: 18px;
          }
        }
      }
      span {
        width: 160px;
        height: 38px;
        line-height: 38px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        border-radius: 19px;
        text-align: center;
        background: url(../../static/btn-bg.png);
        @media screen and (max-width: 576px) {
          & {
            width: 80%;
            margin: 13px auto 0;
            height: 22px;
            line-height: 22px;
            background-size: 100% 100%;
            font-size: 9px;
          }
        }
      }
    }
  }
}
.c-2 {
  margin: 100px auto;
  box-shadow: 0 4px 16px 0 rgba(120, 121, 125, 0.3);
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  background: #fff;
  h4 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    @media screen and (max-width: 720px) {
      & {
        margin-top: 10px;
        line-height: 40px;
      }
    }
    @media screen and (min-width: 721px) {
      & {
        margin-top: 20px;
        line-height: 80px;
      }
    }
  }
  & > span {
    width: 30px;
    height: 4px;
    background-color: #d86f06;
    margin: 0 auto;
  }
  & > p {
    margin: 20px 0;
    line-height: 20px;
    color: #888;
    @media screen and (max-width: 576px) {
      & {
        font-size: 14px;
      }
    }
    @media screen and (min-width: 577px) {
      & {
        font-size: 18px;
      }
    }
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20px;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
          transition: all 0.5s ease;
        }
      }
      em {
        font-style: normal;
        @media screen and (max-width: 576px) {
          & {
            font-size: 12px;
          }
        }
        @media screen and (min-width: 577px) {
          & {
            font-size: 18px;
          }
        }
      }
    }
  }
}
.c-3 {
  margin: 100px auto;
  box-shadow: 0 4px 16px 0 rgba(120, 121, 125, 0.3);
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  background: #fff;
  h4 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    @media screen and (max-width: 720px) {
      & {
        margin-top: 10px;
        line-height: 40px;
      }
    }
    @media screen and (min-width: 721px) {
      & {
        margin-top: 20px;
        line-height: 80px;
      }
    }
  }
  & > span {
    width: 30px;
    height: 4px;
    background-color: #d86f06;
    margin: 0 auto;
  }
  & > p {
    margin: 20px 0;
    line-height: 20px;
    color: #888;
    @media screen and (max-width: 576px) {
      & {
        font-size: 14px;
      }
    }
    @media screen and (min-width: 577px) {
      & {
        font-size: 18px;
      }
    }
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 20px auto;
    li {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:hover {
        img {
          transform: translateY(-20%);
          transition: all 0.5s ease;
        }
      }
      & > p {
        @media screen and (max-width: 576px) {
          & {
            font-size: 14px;
          }
        }
        @media screen and (min-width: 577px) {
          & {
            font-size: 18px;
          }
        }
      }
      i {
        font-style: normal;
        @media screen and (max-width: 576px) {
          & {
            font-size: 12px;
          }
        }
        @media screen and (min-width: 577px) {
          & {
            font-size: 16px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 720px) {
    .c-3 {
    }
    #platform {
      background: #252733;
      padding: 20px 0;
      p,
      i {
        color: #fff;
      }
    }
  }
}
</style>
