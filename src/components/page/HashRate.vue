<template>
    <div class="hashrate" id="hashrate">
        <!-- <v-slider></v-slider> -->
        <img src="../../../static/HashRateB.jpg" class=" img-fluid d-none d-lg-block" alt="">
        <img src="../../../static/HashRateS.jpg" class="w-100 img-fluid d-lg-none" alt="">
        <h1 class="container hashrate-title">比特币算力租赁 <span>(比特币矿机)</span></h1>
        <div class="container order"> 
          <div class="row">
            <div class="col-12 col-lg-8 hashrate-1">
              <div class="row flex-column">
                <div class="text-center position-relative hashrate-top">
                  蚂蚁矿机的BTC算力
                  <span class="position-absolute detail"> 详细介绍 ></span>
                </div>
                <div class="col-12 text-center mt-4 pb-4 hashrate-order">
                  <div class="row ">
                    <div class="col-3 ">
                      <p>算力类型</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>算力大小</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>算力价格</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>预计日收益</p>
                      <b>BTC</b>
                    </div>                                                            
                  </div>
                </div>
                <div class="col-12 text-center mt-4 mb-4">
                  <div class="row">
                    <div class="col-3">
                      <p>期限</p>
                      <b>365天</b>
                    </div>
                    <div class="col-3">
                      <p>电费</p>
                      <b>包含365天电费</b>
                    </div>
                    <div class="col-3">
                      <p>维修费</p>
                      <b>0</b>
                    </div>
                    <div class="col-3">
                      <p>上架时间</p>
                      <b>立即生效</b>
                    </div>                                                            
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 hashrate-buy">
              <div class="row flex-column mt-3">
                <p>￥&nbsp;<span>750.00</span></p>
                <div class="row justify-content-between" style="align-items: center; ">
                  <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" size="lage"></el-input-number>
                  <span>本批剩余：4948 份</span>
                </div>
                <div class="mt-2">
                   <el-checkbox v-model="checked" size="mini" style="font-size:12px;">我已阅读并同意</el-checkbox><a href="#">算力租赁合同</a>
                </div>
                <div class="hashrate-buyNow">
                    <div class="row">
                      <div class="col-12 col-lg-6"> 
                        <el-button type="primary" class="w-100" size="lage" round>立即购买</el-button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container order"> 
          <div class="row">
            <div class="col-12 col-lg-8 hashrate-1">
              <div class="row flex-column">
                <div class="text-center position-relative hashrate-top">
                  蚂蚁矿机的BTC算力
                  <span class="position-absolute detail"> 详细介绍 ></span>
                </div>
                <div class="col-12 text-center mt-4 pb-4 hashrate-order">
                  <div class="row ">
                    <div class="col-3 ">
                      <p>算力类型</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>算力大小</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>算力价格</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>预计日收益</p>
                      <b>BTC</b>
                    </div>                                                            
                  </div>
                </div>
                <div class="col-12 text-center mt-4 mb-4">
                  <div class="row">
                    <div class="col-3">
                      <p>期限</p>
                      <b>365天</b>
                    </div>
                    <div class="col-3">
                      <p>电费</p>
                      <b>包含365天电费</b>
                    </div>
                    <div class="col-3">
                      <p>维修费</p>
                      <b>0</b>
                    </div>
                    <div class="col-3">
                      <p>上架时间</p>
                      <b>立即生效</b>
                    </div>                                                            
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 hashrate-buy">
              <div class="row flex-column mt-3">
                <p>￥&nbsp;<span>750.00</span></p>
                <div class="row justify-content-between" style="align-items: center; ">
                  <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" size="lage"></el-input-number>
                  <span>本批剩余：4948 份</span>
                </div>
                <div class="mt-2">
                   <el-checkbox v-model="checked" size="mini" style="font-size:12px;">我已阅读并同意</el-checkbox><a href="#">算力租赁合同</a>
                </div>
                <div class="hashrate-buyNow">
                    <div class="row">
                      <div class="col-12 col-lg-6"> 
                        <el-button type="primary" class="w-100" size="lage" round>立即购买</el-button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <h1 class="container hashrate-title">以太坊算力租赁  <span>（以太坊矿机)</span></h1>        
        <div class="container order"> 
          <div class="row">
            <div class="col-12 col-lg-8 hashrate-1">
              <div class="row flex-column">
                <div class="text-center position-relative hashrate-top">
                  蚂蚁矿机的BTC算力
                  <span class="position-absolute detail"> 详细介绍 ></span>
                </div>
                <div class="col-12 text-center mt-4 pb-4 hashrate-order">
                  <div class="row ">
                    <div class="col-3 ">
                      <p>算力类型</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>算力大小</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>算力价格</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>预计日收益</p>
                      <b>BTC</b>
                    </div>                                                            
                  </div>
                </div>
                <div class="col-12 text-center mt-4 mb-4">
                  <div class="row">
                    <div class="col-3">
                      <p>期限</p>
                      <b>365天</b>
                    </div>
                    <div class="col-3">
                      <p>电费</p>
                      <b>包含365天电费</b>
                    </div>
                    <div class="col-3">
                      <p>维修费</p>
                      <b>0</b>
                    </div>
                    <div class="col-3">
                      <p>上架时间</p>
                      <b>立即生效</b>
                    </div>                                                            
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 hashrate-buy">
              <div class="row flex-column mt-3">
                <p>￥&nbsp;<span>750.00</span></p>
                <div class="row justify-content-between" style="align-items: center; ">
                  <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" size="lage"></el-input-number>
                  <span>本批剩余：4948 份</span>
                </div>
                <div class="mt-2">
                   <el-checkbox v-model="checked" size="mini" style="font-size:12px;">我已阅读并同意</el-checkbox><a href="#">算力租赁合同</a>
                </div>
                <div class="hashrate-buyNow">
                    <div class="row">
                      <div class="col-12 col-lg-6"> 
                        <el-button type="primary" class="w-100" size="lage" round>立即购买</el-button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container order"> 
          <div class="row">
            <div class="col-12 col-lg-8 hashrate-1">
              <div class="row flex-column">
                <div class="text-center position-relative hashrate-top">
                  蚂蚁矿机的BTC算力
                  <span class="position-absolute detail"> 详细介绍 ></span>
                </div>
                <div class="col-12 text-center mt-4 pb-4 hashrate-order">
                  <div class="row ">
                    <div class="col-3 ">
                      <p>算力类型</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>算力大小</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>算力价格</p>
                      <b>BTC</b>
                    </div>
                    <div class="col-3">
                      <p>预计日收益</p>
                      <b>BTC</b>
                    </div>                                                            
                  </div>
                </div>
                <div class="col-12 text-center mt-4 mb-4">
                  <div class="row">
                    <div class="col-3">
                      <p>期限</p>
                      <b>365天</b>
                    </div>
                    <div class="col-3">
                      <p>电费</p>
                      <b>包含365天电费</b>
                    </div>
                    <div class="col-3">
                      <p>维修费</p>
                      <b>0</b>
                    </div>
                    <div class="col-3">
                      <p>上架时间</p>
                      <b>立即生效</b>
                    </div>                                                            
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 hashrate-buy">
              <div class="row flex-column mt-3">
                <p>￥&nbsp;<span>750.00</span></p>
                <div class="row justify-content-between" style="align-items: center; ">
                  <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字" size="lage"></el-input-number>
                  <span>本批剩余：4948 份</span>
                </div>
                <div class="mt-2">
                   <el-checkbox v-model="checked" size="mini" style="font-size:12px;">我已阅读并同意</el-checkbox><a href="#">算力租赁合同</a>
                </div>
                <div class="hashrate-buyNow">
                    <div class="row">
                      <div class="col-12 col-lg-6"> 
                        <el-button type="primary" class="w-100" size="lage" round>立即购买</el-button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>                        
    </div>
</template>
<script>
import vSlider from "../slider/slider";
export default {
  data() {
    return {
      num1: 1,
      checked: false
    };
  },
  components: {
    vSlider
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="less" scoped>
.hashrate {
  .detail {
    right: 0;
    top: 20px;
    right: 0;
    line-height: 36px;
    font-size: 14px;
    color: #009ffd;
  }
  .order {
    background: #fff;
    margin-bottom: 66px;
    border-radius: 2px;
    box-shadow: #ddd 1px 2px 9px;
  }
  .hashrate-1 {
    .hashrate-top {
      color: #333;
      padding: 20px 0;
      font-family: "\5FAE\8F6F\96C5\9ED1", tahoma, arial, "Hiragino Sans GB",
        "\5b8b\4f53", sans-serif;
    }
    @media screen and (max-width: 720px) {
      & {
        font-size: 16px;
        line-height: 36px;
      }
    }
    @media screen and (min-width: 721px) {
      & {
        font-size: 24px;
        line-height: 36px;
      }
    }
    p {
      font-weight: bold;
      @media screen and (max-width: 720px) {
        & {
          font-size: 12px;
          font-weight: 400;
        }
      }
      @media screen and (min-width: 721px) {
        & {
          font-size: 15px;
        }
      }
    }
    b {
      color: #333;
      font-style: normal;
      @media screen and (max-width: 720px) {
        & {
          font-size: 12px;
          line-height: 16px;
          font-weight: 400;
        }
      }
      @media screen and (min-width: 721px) {
        & {
          font-size: 15px;
          line-height: 1.8;
        }
      }
    }
    .hashrate-order {
      border-bottom: 1px solid #ebebeb;
    }
  }
  .hashrate-buy {
    background-color: #f8f8f8;

    & > div {
      padding: 20px 40px;
      p {
        color: #ff5614;
        font-size: 20px;
        vertical-align: middle;
        font-family: "\5FAE\8F6F\96C5\9ED1", tahoma, arial, "Hiragino Sans GB",
          "\5b8b\4f53", sans-serif;
        & > span {
          font-size: 34px;
          color: #ff5614;
        }
      }
      span {
        text-align: left;
        font-size: 15px;
        color: #666;
      }
      a {
        text-decoration: none;
        font-size: 12px;
        color: #ff9055;
        margin-left: 10px;
      }
      .hashrate-buyNow {
        margin-top: 30px;
      }
    }
  }
  .hashrate-title {
    font-family: "\5FAE\8F6F\96C5\9ED1", tahoma, arial, "Hiragino Sans GB",
      "\5b8b\4f53", sans-serif;
    line-height: 26px;
    padding: 20px 0;
    font-size: 20px;
    span {
      font-size: 12px;
      line-height: 26px;
    }
    @media screen and (max-width: 720px) {
      & {
        text-align: center;
      }
    }
  }
}
</style>
<style>
#hashrate .el-checkbox__label {
  font-size: 12px;
}
</style>


