<template>
    <!-- 资产总览 -->
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
            <div class="col-lg-6 col-12 position-relative sm-top">
                <img class="img-fluid w-100" src="../../../../static/predict-bg_2.jpg" alt="">
                <div class="position-absolute property-top-detail">
                    <span>预计ETH收益</span>
                    <p>0.0000000000ETH</p>
                    <span>每秒动态增长，实时挖矿数据</span>                    
                </div>
            </div>
        </div>
        <div class="row mt-4">
          <div class="col-12 property-table">
              <el-table
                :data="tableData"
                size="medium"
                 border
                style="width: 100%;padding:10px 15px">
                <el-table-column
                  prop="a"
                  label="币种"
                  align="center"
                  width="170"
                 >
                  <template slot-scope="scope">
                    <div>
                    <i v-if="scope.row.a=='BTC'" class="iconfont icon-btc-" style="font-size:40px;color:#f1a300" ></i>
                    <i v-if="scope.row.a=='ETH'" class="iconfont icon-eth-" style="font-size:40px;color:#000" ></i>
                    <i v-if="scope.row.a=='CHY'" class="iconfont icon-renminbi" style="font-size:40px;color:#0cabf3" ></i>
                    <span class="fonts">{{scope.row.a}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="b"
                  label="可用"
                   width="170"
                  align="center"
                 >
                </el-table-column>
                <el-table-column
                  prop="c"
                  align="center"
                   width="170"
                  label="冻结">
                </el-table-column>
                <el-table-column
                  prop="d"
                  align="center"
                   width="170"
                  label="总计">
                </el-table-column>
                <el-table-column
                  prop="e"
                  align="center"
                   min-width="170"
                  label="操作">
                    <template slot-scope="scope">
                      <a href="#">{{scope.row.e}}</a>
                  </template>
                </el-table-column>                    
            </el-table>
          </div>
          <div class="col-12 property-table mt-4">
              <el-table
                :data="tableDatas"
                size="medium"
                 border
                style="width: 100%;padding:10px 15px">
                <el-table-column
                  prop="a"
                  label="算力"
                  align="center"
                  width="170"
                 >
                </el-table-column>
                <el-table-column
                  prop="b"
                  label="可用"
                   width="170"
                  align="center"
                 >
                </el-table-column>
                <el-table-column
                  prop="c"
                  align="center"
                   width="170"
                  label="冻结">
                </el-table-column>
                <el-table-column
                  prop="d"
                  align="center"
                   width="170"
                  label="总计">
                </el-table-column>
                <el-table-column
                  prop="e"
                  align="center"
                   min-width="170"
                  label="操作">
                    <template slot-scope="scope">
                      <a href="#">{{scope.row.e}}</a>
                  </template>
                </el-table-column>                    
            </el-table>
          </div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          a: "BTC",
          b: "0.00047990个",
          c: "0.00000000个",
          d: "0.00047990个",
          e: "提币"
        },
        {
          a: "ETH",
          b: "0.00000000个",
          c: "0.00000000个",
          d: "0.00000000个",
          e: "提币"
        },
        {
          a: "CHY",
          b: "0.00 元",
          c: "0.00 元",
          d: "0.00 元",
          e: "充值"
        }
      ],
      tableDatas: [
        {
          a: "BTC",
          b: "0.00047990个",
          c: "0.00000000个",
          d: "0.00047990个",
          e: "提币"
        },
        {
          a: "ETH",
          b: "0.00000000个",
          c: "0.00000000个",
          d: "0.00000000个",
          e: "提币"
        },
        {
          a: "CHY",
          b: "0.00 元",
          c: "0.00 元",
          d: "0.00 元",
          e: "充值"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.property {
  .property-top {
    margin-top: 30px;
    .property-top-div {
      @media screen and (max-width: 720px) {
        & {
          padding: 0;
        }
      }
    }
    .sm-top {
      @media screen and (max-width: 720px) {
        & {
          margin-top: 20px;
          padding: 0;
        }
      }
      @media screen and (min-width: 721px) {
        & {
        }
      }
    }
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
  .property-table {
    @media screen and (max-width: 720px) {
      & {
        padding: 0;
      }
    }
  }
  .fonts {
    font-size: 40px;
    line-height: 70px;
    margin-left: 15px;
  }
}
</style>



