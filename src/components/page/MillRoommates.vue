<template>
    <div class="MillRoommates">
        <img src="../../../static/MillRentalB.jpg" class=" img-fluid d-none d-lg-block" alt="">
        <img src="../../../static/MillRentalS.jpg" class="w-100 img-fluid d-lg-none" alt="">   
        <div class="container">
          <div class="hash-list">
            <div class="hash-title ">
                <a href="#">蚂蚁矿机 S9i (14T) (14份合租) 即买即挖 无管理费</a>
                <span>比特矿机，挖BTC</span>
            </div>
            <div class="hash-detail" >每日电费从当日挖矿收益中扣除。一台S9i(14T)矿机，分14份合租，每份459元。</div>
            <div class="row hash-detailShow">
              <div class="col-lg-5 hash-detailShow-left">
                ￥459.00
                <span>/T</span>
                <span>无管理费</span>
              </div>
              <div class="col-lg-5 hash-detailShow-center">
                <div>剩余算力：1189T</div>
                <el-progress class="d-none d-lg-block mt-4 mb-4"  :percentage="80" color="#d5aa6d" :stroke-width="12"></el-progress>
                <el-progress class=" d-lg-none mt-4 mb-4" :percentage="80" color="#d5aa6d" :stroke-width="8"></el-progress>
              </div>
              <div class="col-lg-2 hash-detailShow-right ">
                <button type="button" class="btn btn-warning">立即购买</button>
              </div>
            </div>
          </div>
          <div class="hash-list">
            <div class="hash-title ">
                <a href="#">蚂蚁矿机 S9i (14T) (14份合租) 即买即挖 无管理费</a>
                <span>比特矿机，挖BTC</span>
            </div>
            <div class="hash-detail" >每日电费从当日挖矿收益中扣除。一台S9i(14T)矿机，分14份合租，每份459元。</div>
            <div class="row hash-detailShow">
              <div class="col-lg-5 hash-detailShow-left">
                ￥459.00
                <span>/T</span>
                <span>无管理费</span>
              </div>
              <div class="col-lg-5 hash-detailShow-center">
                <div>剩余算力：1189T</div>
                <el-progress class="d-none d-lg-block mt-4 mb-4"  :percentage="80" color="#d5aa6d" :stroke-width="12"></el-progress>
                <el-progress class=" d-lg-none mt-4 mb-4" :percentage="80" color="#d5aa6d" :stroke-width="8"></el-progress>
              </div>
              <div class="col-lg-2 hash-detailShow-right ">
                <button type="button" class="btn btn-warning">立即购买</button>
              </div>
            </div>
          </div>
          <div class="hash-list">
            <div class="hash-title ">
                <a href="#">蚂蚁矿机 S9i (14T) (14份合租) 即买即挖 无管理费</a>
                <span>比特矿机，挖BTC</span>
            </div>
            <div class="hash-detail" >每日电费从当日挖矿收益中扣除。一台S9i(14T)矿机，分14份合租，每份459元。</div>
            <div class="row hash-detailShow">
              <div class="col-lg-5 hash-detailShow-left">
                ￥459.00
                <span>/T</span>
                <span>无管理费</span>
              </div>
              <div class="col-lg-5 hash-detailShow-center">
                <div>剩余算力：1189T</div>
                <el-progress class="d-none d-lg-block mt-4 mb-4"  :percentage="80" color="#d5aa6d" :stroke-width="12"></el-progress>
                <el-progress class=" d-lg-none mt-4 mb-4" :percentage="80" color="#d5aa6d" :stroke-width="8"></el-progress>
              </div>
              <div class="col-lg-2 hash-detailShow-right ">
                <button type="button" class="btn btn-warning">立即购买</button>
              </div>
            </div>
          </div>                    
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import vSlider from "../slider/slider";
export default {
  data() {
    return {};
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "username"
      // ...
    ])
  },
  components: {
    vSlider
  },
  methods: {
    ...mapMutations(["ADD_LOGIN_USER"])
  },
  mounted() {
    this.ADD_LOGIN_USER("你好");
    console.log(this.username);
  }
};
</script>
<style lang="less" scoped>
.MillRoommates {
  .container {
    @media screen and (max-width: 720px) {
      & {
        padding-left: 2%;
        padding-right: 2%;
        padding-top: 10%;
      }
    }
  }
  .hash-list {
    position: relative;
    background-color: #fff;

    margin-bottom: 30px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    cursor: pointer;
    @media screen and (max-width: 720px) {
      & {
        padding: 30px 5px 5px 5px;
      }
    }
    @media screen and (min-width: 721px) {
      & {
        margin: 40px 0;
        padding: 40px;
      }
    }
    &:hover {
      box-shadow: 0 0 20px 0 #ccc;
    }
    .hash-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      a {
        display: inline-block;
        text-decoration: none;
        font-size: 24px;
        color: #333;
        font-weight: bold;
        @media screen and (max-width: 720px) {
          & {
            font-size: 15px;
            line-height: 20px;
          }
        }
        @media screen and (min-width: 721px) {
          & {
            font-size: 24px;
            line-height: 36px;
          }
        }
      }
      span {
        display: inline-block;
        border: 1px solid #e0e0e0;
        border-radius: 2px;
        color: #151515;
        vertical-align: middle;
        margin-left: 20px;
        min-width: 110px;
        text-align: center;
        @media screen and (max-width: 720px) {
          & {
            line-height: 20px;
            font-size: 12px;
            padding: 3px 5px;
          }
        }
        @media screen and (min-width: 721px) {
          & {
            font-size: 14px;
            line-height: 24px;
            padding: 5px 10px;
          }
        }
      }
    }
    .hash-detail {
      color: #999;
      @media screen and (max-width: 720px) {
        & {
          font-size: 12px;
          line-height: 17px;
          margin: 0;
          padding: 10px 0;
        }
      }
      @media screen and (min-width: 721px) {
        & {
          font-size: 14px;

          margin: 14px 0 32px;
        }
      }
    }
    .hash-detailShow {
      align-items: center;
      .hash-detailShow-left {
        font-size: 34px;
        color: #fd7220;
        span {
          font-size: 14px;
          color: #000019;
        }
      }
      .hash-detailShow-center {
        color: #d5aa6d;
        @media screen and (max-width: 720px) {
          & {
            font-size: 12px;
          }
        }
        @media screen and (min-width: 721px) {
          & {
            font-size: 14px;
          }
        }
        .progress-show {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;

          @media screen and (max-width: 720px) {
            & {
              height: 0.75rem;
              overflow: hidden;
              font-size: 0.5rem;
              background-color: #e9ecef;
              border-radius: 0.25rem;
            }
          }
          @media screen and (min-width: 721px) {
            & {
              height: 1rem;
              overflow: hidden;
              font-size: 0.75rem;
              background-color: #e9ecef;
              border-radius: 0.25rem;
            }
          }
        }
      }
      .hash-detailShow-right {
        text-align: center;
        button {
          color: #fff;
        }
      }
    }
  }
}
</style>

