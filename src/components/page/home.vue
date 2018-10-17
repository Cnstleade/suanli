<template>
  <div class="container_fuild" id="hello">
    <!-- <v-header  v-if="!isScroll"></v-header>
    <transition name="fade">
      <v-header v-if="isScroll" class="fixeds"></v-header>
    </transition> -->
    <v-slider></v-slider>
    <div class="container echart ">
        <div class="row">
          <div class="echart1 col-12 col-lg-8 ">
             <v-demo class="h-100 w-100"></v-demo>
          </div>
          <div class=" d-none d-lg-flex col-4 detail">
            <img class="img-fluid" src="../../../static/bigt_03.jpg" alt="">
            <div >
              <img src="../../../static/bigt_04.png" alt="">
              <span>视频展示</span>
            </div>
          </div>
        </div>
    </div>
    <div class="container c-card-1 ">
      <h4 class="text-center">租赁矿机挖矿</h4>
      <span></span>
      <p class="text-center">出租矿机算力，让您轻松挖：比特币（BTC）、以太坊（ETH）……</p>
      <ul >
        <li class="col-4 col-md-3 ">
          <div>
            <i class="icon-1"></i>
          </div>
          <p>矿机租赁</p>
          <p>轻松高效挖矿</p>
          <span>矿机租赁套餐</span>
        </li>
        <li class="col-4 col-md-3">
          <div>
          <i class="icon-2"></i>

          </div>
          <p>算力租赁</p>
          <p>快速体验挖矿</p>
          <span>矿机租赁套餐</span>
        </li>
        <li class="col-4 col-md-3">
          <div>
          <i class="icon-3"></i>

          </div>
          <p>矿机托管</p>
          <p>专业海外托管</p>
          <span>矿机租赁套餐</span>          
        </li>
      </ul>
    </div>
    <div class="container  c-2">
      <h4 class="text-center">算力优势</h4>
      <span></span>
      <p class="text-center">全球算力节点部署，为您创造最大收益</p>
      <ul>
        <li class="col-6 col-lg-3">
          <img class="img-fluid" src="../../../static/suanli1.png" alt="">
          <p >性价比高</p>
          <em >矿机价格市场低价</em>
          <em >享受海外低价电费</em>
        </li>
        <li class="col-6 col-lg-3">
          <img class="img-fluid" src="../../../static/suanli2.png" alt="">
          <p >实力保障</p>
          <em >海外大型矿场</em>
          <em>优惠政策支持</em>
        </li>
        <li class="col-6 col-lg-3">
          <img class="img-fluid" src="../../../static/suanli3.png" alt="">
          <p >专业服务</p>
          <em >规范矿场托管，托管费用透明</em>
          <em>专业运维团队，保障矿机运行</em>
        </li>
        <li class="col-6 col-lg-3">
          <img class="img-fluid" src="../../../static/suanli4.png" alt="">
          <p >产权模式</p>
          <em >1秒投产挖矿</em>
          <em>矿机质保两年</em>
        </li>                        
      </ul>
    </div>
    <div class="container_fluid  c-3">
      <h4 class="text-center">平台优势</h4>
      <span></span>
      <p class="text-center">以用户为中心，竭诚为您服务</p>
      <ul class="container" id="platform">
        <li class="col-12 col-lg-2 clearfix" >
          <img class="img-fluid" src="../../../static/pt-img1.png" alt="">
          <p >安全稳定</p>
          <i >安全稳定</i>
          <i >保障账户安全</i>
        </li>
        <li class="col-12 col-lg-2 clearfix">
          <img class="img-fluid" src="../../../static/pt-img2.png" alt="">
          <p >公开透明</p>
        <i >平台费用公开透明</i>
          <i >拒绝任何虚假信息</i>
        </li>
        <li class="col-12 col-lg-2 clearfix">
          <img class="img-fluid" src="../../../static/pt-img3.png" alt="">
          <p >规范管理</p>
          <i>从矿机选购到产生收益</i>
          <i >严格把控每个业务流程</i>
        </li>
        <li class="col-12 col-lg-2 clearfix">
          <img class="img-fluid" src="../../../static/pt-img4.png" alt="">
          <p >操作便捷</p>
          <i >简单高效快捷</i>
          <i >一键即可开启交易</i>
        </li> 
        <li class="col-12 col-lg-2 clearfix">
          <img class="img-fluid" src="../../../static/pt-img5.png" alt="">
          <p >贴心服务</p>
          <i >专业客服一对一</i>
          <i >为您提供优质服务</i>
        </li>                                
      </ul>
    </div>   
    <v-news></v-news> 
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import vHeader from "../header/header";
import vSlider from "../slider/slider";
import vDemo from "../echartDemo/echartDemo";
import vNews from "../news/news";
import vFooter from "../footer/footer";
export default {
  name: "home",
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
      this.scroll = document.body.scrollTop;

      this.isScroll = this.scroll > 70;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.menu);
  }
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
        background: url(../../../static/bg.png) 0 0 no-repeat;
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
        background: url(../../../static/icon.png) 0 0 no-repeat;
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
        background: url(../../../static/btn-bg.png);
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
