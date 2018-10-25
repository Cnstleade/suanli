<template>
    <!-- 矿机租赁 -->
    <div class="hashrate ">
        <div class="row hashrate-top ">
            <div>
                <strong>1</strong>
                <span>可用算力（T）</span>
            </div>
            <div>
                <strong>--</strong>
                <span>冻结算力（T）</span>
            </div>
            <div>
                <strong>0.00003501</strong>
                <span>0.00003501</span>                
            </div>
            <div>
                <strong>0.00003501</strong>
                <span>矿机累计收益（BTC）</span>                
            </div>
            <div>
                <strong>--</strong>
                <span>可用算力（M）</span>                
            </div>
            <div>
                <strong>--</strong>
                <span>冻结算力（M）</span>                
            </div>
            <div>
                <strong>--</strong>
                <span>昨日矿机收益（ETH）</span>                
            </div>
            <div>
                <strong>--</strong>
                <span>矿机累计收益（ETH）</span>                
            </div>
        </div>
        <div class="row hashrate-bottom">
            <div class="col-12 hashrate-bottom-show">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="收益记录" name="first">
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="明细"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="净收益"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="累计收益">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="购买记录" name="second">
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="明细"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="净收益"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="累计收益">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>
<style lang="less" scoped>
.hashrate {
  .hashrate-top {
    margin-top: 30px;
    @media screen and (max-width: 720px) {
      & {
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-around;
        background: #fff;
        border-radius: 2%;
      }
    }
    @media screen and (min-width: 721px) {
      & {
        height: 510px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
    div {
      @media screen and (max-width: 720px) {
        & {
          padding: 0;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          line-height: 40px;
        }
        strong {
          float: right;
          padding-right: 20px;
        }
        span {
          float: left;
          padding-left: 20px;
        }
      }
      @media screen and (min-width: 721px) {
        & {
          display: flex;
          flex-direction: column;
          width: 210px;
          height: 230px;
          background: #fff;
          border-top: 4px solid #d86f06;
          border-radius: 2%;
          transition: all 0.5s ease;
          text-align: center;
          line-height: 20px;
          font-size: 14px;
          color: #888;
        }
        &:hover {
          box-shadow: 0 4px 16px 0 rgba(120, 121, 125, 0.3);
        }
        strong {
          color: #d86f06;
          margin-top: 60px;
          height: 60px;
          line-height: 60px;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 30px;
        }
      }
    }
  }
  .hashrate-bottom {
    @media screen and (max-width: 720px) {
      & {
        margin: 10px -15px;
      }
    }
    @media screen and (min-width: 721px) {
      & {
        margin: 0;
      }
    }
  }
  .hashrate-bottom-show {
    background: #fff;
  }
}
</style>



