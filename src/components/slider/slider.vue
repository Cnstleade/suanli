<template>
    <div class="slider position-relative" @mouseover="clear" @mouseout="run">
            <img class="img-fluid  position-relative  d-img-md" style="opacity:0" src="../../../static/1537498184151.jpg" alt="">
            <img class="img-fluid  position-relative  d-img-xs " style="opacity:0" src="../../../static/ss1.jpg" alt="">
            <div class="img  d-img-md">
                <transition name="fade">
                    <template v-if="active==0">
                        <img class="img-fluid " src="../../../static/1537252103689.jpg" alt="">
                    </template>
                </transition>
                <transition name="fade">
                    <template v-if="active==1">
                      <img class="img-fluid " src="../../../static/1537498184151.jpg" alt="">
                    </template>
                </transition> 
                <transition name="fade">
                    <template v-if="active==2"> 
                      <img class="img-fluid " src="../../../static/1537252103689.jpg" alt="">
                    </template>
                </transition>      
            </div>
            <div class="img d-img-xs ">
                <transition name="fade">
                    <template v-if="active==0">
                        <img class="img-fluid " src="../../../static/ss1.jpg" alt="">
                    </template>
                </transition>
                <transition name="fade">
                    <template v-if="active==1">
                      <img class="img-fluid " src="../../../static/ss2.jpg" alt="">
                    </template>
                </transition> 
                <transition name="fade">
                    <template v-if="active==2">
                      <img class="img-fluid " src="../../../static/ss1.jpg" alt="">
                    </template>
                </transition>      
            </div>            

            <button type="button" class="el-carousel__arrow el-carousel__arrow--left" @click="goto(-1,true)"><i class="el-icon-arrow-left"></i></button>            
            <button type="button" class="el-carousel__arrow el-carousel__arrow--right" @click="goto(1,true)"><i class="el-icon-arrow-right"></i></button>
            <ul class="el-carousel__indicators">
                <li class="el-carousel__indicator" @click="goto(0,false)"><button :class="{ isClick: active==0 }" class="el-carousel__button" ></button></li>
                <li class="el-carousel__indicator" @click="goto(1,false)"><button :class="{ isClick: active==1 }" class="el-carousel__button"></button></li>
                <li class="el-carousel__indicator" @click="goto(2,false)"><button :class="{ isClick: active==2 }" class="el-carousel__button"></button></li>
            </ul>
            <div class="new-server clearfix " @mouseover="clearText" @mouseout="textRun">
                <strong class="float-left">资讯</strong>
                <template v-for="(temp,index) in newList">
                    <transition name="news" :key="index">
                        <div class="text-truncate"  v-if="textActive==index">
                            <a :href="temp.url">{{temp.detail}}</a>
                        </div>
                    </transition>
                </template>
            </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      textActive: 0,
      isShow: false,
      newList: [
        {
          url: "#",
          detail:
            "你222222222222222222222222222222222222222222222222222222222222222222222222222222222222好"
        },
        {
          url: "#",
          detail:
            "再2222222222222222222222222222222222222222222222222222222222222222222222222见"
        }
      ]
    };
  },
  methods: {
    goto(index, type) {
      if (type) {
        let i = index ? index : 1;
        this.active = (this.active + i) % 3;
        if (this.active < 0) {
          this.active = 2;
        }
      } else {
        this.active = index;
      }
    },
    run() {
      this.invId = setInterval(() => {
        this.goto(1, true);
      }, 3000);
    },
    clear() {
      clearInterval(this.invId);
    },
    textRun() {
      this.textInvId = setInterval(() => {
        this.textActive = (this.textActive + 1) % this.newList.length;
        if (this.textActive < 0) {
          this.textActive = this.newList.length - 1;
        }
      }, 3000);
    },
    clearText() {
      clearInterval(this.textInvId);
    }
  },
  mounted() {
    this.run();
    this.textRun();
  },
  destroyed() {
    this.clear();
    this.clearText();
  }
};
</script>

<style lang="less" scoped>
.slider {
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .isClick {
    background: red;
  }
  .new-server {
    position: absolute;
    left: 200px;
    bottom: 20px;
    z-index: 5;
    width: 419px;
    height: 32px;
    background: url(../../../static/i-new-server.png) no-repeat;
    color: #fff;
    font-size: 12px;
    line-height: 32px;
    overflow: hidden;
    strong {
      width: 59px;
      text-align: right;
    }
    div {
      width: 310px;
      position: absolute;
      left: 69px;
      a {
        color: #fff;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s ease 0s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-to, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
}

.news-enter-active,
.news-leave-active {
  transition: all 1.5s ease 0s;
  opacity: 0;
}

.news-enter {
  top: -100%;
  opacity: 0;
}

.news-leave-to /* .fade-leave-active below version 2.1.8 */ {
  top: 100%;
  opacity: 0;
}
.news-enter-to, .news-leave /* .fade-leave-active below version 2.1.8 */ {
  top: 0;
  opacity: 1;
}

@media screen and (max-width: 720px) {
  .d-img-xs {
    display: block;
  }
  .d-img-md {
    display: none;
  }
  .slider .new-server {
    left: 0px;
    top: 10px;
  }
}
@media screen and (min-width: 721px) {
  .d-img-md {
    display: block;
  }
  .d-img-xs {
    display: none;
  }
  .new-server {
    display: block;
  }
}
</style>

