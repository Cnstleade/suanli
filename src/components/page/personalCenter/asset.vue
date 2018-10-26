<template>
    <!-- 提取资产 -->
    <div class="asset">
        <div class="asset-top">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="提起BTC" name="first">
                      <div class="BTCform">
                        <el-form ref="BTCform" :model="BTCform" :label-width="width" size="lage" :label-position="labelPosition">
                            <el-form-item label="地址">
                              <el-input v-model="BTCform.addr" >
                                  <el-button slot="append" icon="el-icon-arrow-down">其他地址</el-button>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="提取数量">
                                <el-input placeholder="请输入内容" v-model="BTCform.num" >
                                    <template slot="append">BTC</template>
                                </el-input>
                                <div><span>手续费：0.0005 BTC</span><b>账户余额 0.00051491 BTC</b></div>
                            </el-form-item> 
                            <el-form-item label="资金密码">
                              <el-input v-model="BTCform.pass" >
                              </el-input>
                            </el-form-item>   
                            <el-form-item label="手机验证码">
                              <el-input v-model="BTCform.addr" >
                                  <el-button slot="append" icon="el-icon-mobile-phone">获取验证码</el-button>
                              </el-input>
                            </el-form-item>     
                            <el-form-item>
                              <el-button type="primary" @click="onSubmit" class="w-50">立即提取</el-button>
                            </el-form-item>                                                                                                       
                        </el-form>
                      </div>

                  </el-tab-pane>
                  <el-tab-pane label="提取ETH" name="second">
                      <div class="BTCform">
                        <el-form ref="BTCform" :model="BTCform" :label-width="width" size="lage" :label-position="labelPosition">
                            <el-form-item label="地址">
                              <el-input v-model="BTCform.addr" >
                                  <el-button slot="append" icon="el-icon-arrow-down">其他地址</el-button>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="提取数量">
                                <el-input placeholder="请输入内容" v-model="BTCform.num" >
                                    <template slot="append">BTC</template>
                                </el-input>
                                <div><span>手续费：0.0005 BTC</span><b>账户余额 0.00051491 BTC</b></div>
                            </el-form-item> 
                            <el-form-item label="资金密码">
                              <el-input v-model="BTCform.pass" >
                              </el-input>
                            </el-form-item>   
                            <el-form-item label="手机验证码">
                              <el-input v-model="BTCform.addr" >
                                  <el-button slot="append" icon="el-icon-mobile-phone">获取验证码</el-button>
                              </el-input>
                            </el-form-item>     
                            <el-form-item>
                              <el-button type="primary" @click="onSubmit" class="w-50">立即提取</el-button>
                            </el-form-item>                                                                                                       
                        </el-form>
                      </div>
                  </el-tab-pane>
                  <div class="form-bottom">
                    <span>提取说明：</span><br>
                    <span>1、单次最小提取额度为 0.1BTC 或者 1ETH</span><br>
                    <span>2、提取申请后将在工作时间有工作人员和您电话联系，请确保手机畅通。</span>
                  </div>
                </el-tabs>
        </div>
        <div class="row asset-bottom mt-4">
            <div class="col-12 asset-bottom-show">
                <el-tabs v-model="activeName1" @tab-click="handleClick">
                  <el-tab-pane label="提取记录" name="first">
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="时间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="提取数量"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="地址">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="手续费">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="状态">
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
      screenWidth: document.body.clientWidth,
      width: document.body.clientWidth > 721 ? "120px" : "120px",
      labelPosition: document.body.clientWidth > 721 ? "right" : "top",
      activeName: "first",
      activeName1: "first",
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
      ],
      BTCform: {}
    };
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // that.screenWidth = that.$store.state.canvasWidth
          console.log(that.screenWidth);
          that.screenWidth > 721
            ? (that.width = "120px")
            : (that.width = "0px");
          that.screenWidth > 721
            ? (that.labelPosition = "right")
            : (that.labelPosition = "top");
          // that.init();
          that.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    handleClick() {},
    onSubmit() {}
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  }
};
</script>

<style lang="less" scoped>
.asset {
  margin-top: 30px;
  @media screen and (max-width: 720px) {
    & {
      margin: 30px -15px;
    }
  }
  @media screen and (min-width: 721px) {
    & {
    }
  }
  .asset-top {
    background: #fff;
    padding: 0 15px;
    .BTCform {
      @media screen and (max-width: 720px) {
        & {
        }
      }
      @media screen and (min-width: 721px) {
        & {
          padding: 0 100px;
        }
      }
    }
  }
  .form-bottom {
    padding: 15px 30px;
    font-size: 12px;
    color: #888;
    line-height: 24px;
    border-top: 1px solid #ebebeb;
  }
  .asset-bottom {
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
  .asset-bottom-show {
    background: #fff;
  }
}
</style>

