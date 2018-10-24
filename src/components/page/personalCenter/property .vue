<template>
    <div class="property ">
        <div class="row justify-content-between property-top">
            <div class="col-lg-6 col-12 position-relative property-top-div">
                <img class="img-fluid w-100" src="../../../../static/predict-bg_1.jpg" alt="">
                <div class="position-absolute property-top-detail">
                    <span>预计BTC收益</span>
                    <p>0.0005070812BTC</p>
                    <span>每秒动态增长，实时挖矿数据</span>
                </div>
            </div>
            <div class="col-lg-6 col-12 position-relative">
                <img class="img-fluid w-100" src="../../../../static/predict-bg_2.jpg" alt="">
                <div class="position-absolute property-top-detail">
                    <span>预计ETH收益</span>
                    <p>0.0000000000ETH</p>
                    <span>每秒动态增长，实时挖矿数据</span>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.property {
  .property-top {
    margin-top: 30px;
    img {
      border-top: 4px solid #d86f06;
    }
    .property-top-detail {
      top: 20px;
      left: 30px;
      :nth-child(1) {
        font-size: 16.6px;
        color: #595959;
        line-height: 21px;
      }
      :nth-child(2) {
        font-size: 29.1px;
        font-weight: normal;
        font-family: 微软雅黑;
        line-height: 34px;
        color: #d86f06;
      }
      :nth-child(3) {
        font-size: 13px;
        color: #666;
      }
    }
  }
}
</style>



