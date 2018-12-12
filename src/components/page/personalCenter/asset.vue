<template>
    <!-- 提取资产 -->
    <div class="asset">
        <div class="asset-top">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="提起BTC" name="first">
                      <div class="BTCform">
                        <el-form ref="BTCform" :model="BTCform" :label-width="width" size="lage" :label-position="labelPosition">
                            <el-form-item label="地址">
                              <el-input v-model="BTCform.WalletUrl" >
                                  <el-button slot="append" icon="el-icon-arrow-down">其他地址</el-button>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="提取数量">
                                <el-input placeholder="请输入内容" v-model="BTCform.withDrawNumber" >
                                    <template slot="append">BTC</template>
                                </el-input>
                                <div><span>手续费：0.0005 BTC</span><b>账户余额 0.00051491 BTC</b></div>
                            </el-form-item> 
                            <el-form-item label="资金密码">
                              <el-input v-model="BTCform.password" >
                              </el-input>
                            </el-form-item>   
                            <el-form-item label="手机验证码">
                              <el-input v-model="BTCform.smsMsg" >
                                  <el-button slot="append" icon="el-icon-mobile-phone" @click="getVCode">获取验证码</el-button>
                              </el-input>
                            </el-form-item>     
                            <el-form-item>
                              <el-button type="primary" @click="onSubmit('BTCform')" class="w-50">立即提取</el-button>
                            </el-form-item>                                                                                                       
                        </el-form>
                      </div>

                  </el-tab-pane>
                  <el-tab-pane label="提取ETH" name="second">
                      <div class="BTCform">
                        <el-form ref="ETHform" :model="ETHform" :label-width="width" size="lage" :label-position="labelPosition">
                            <el-form-item label="地址">
                              <el-input v-model="ETHform.WalletUrl" >
                                  <el-button slot="append" icon="el-icon-arrow-down">其他地址</el-button>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="提取数量">
                                <el-input placeholder="请输入内容" v-model="ETHform.WalletUrl" >
                                    <template slot="append">BTC</template>
                                </el-input>
                                <div><span>手续费：0.0005 BTC</span><b>账户余额 0.00051491 BTC</b></div>
                            </el-form-item> 
                            <el-form-item label="资金密码">
                              <el-input v-model="ETHform.password" >
                              </el-input>
                            </el-form-item>   
                            <el-form-item label="手机验证码">
                              <el-input v-model="ETHform.smsMsg" >
                                  <el-button slot="append" icon="el-icon-mobile-phone">获取验证码</el-button>
                              </el-input>
                            </el-form-item>     
                            <el-form-item>
                              <el-button type="primary" @click="onSubmit('ETHform')" class="w-50">立即提取</el-button>
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
            <el-row class="mt-4 d-flex flex-row flex-nowrap justify-content-end">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                          <el-button type="success" @click="reset">重置</el-button>
                      </el-form-item>  
                      <el-form-item >
                        <el-input v-model="formInline.handleorderId" placeholder="工单Id"></el-input>
                      </el-form-item> 
                      <el-form-item >
                        <el-input v-model="formInline.faultType" placeholder="错误id"></el-input>
                      </el-form-item>   
                      <el-form-item >
                        <el-input v-model="formInline.as_id " placeholder="子账号id"></el-input>
                      </el-form-item>                             
                    </el-form>            
                </el-row>                      
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
import {
  httpUserPropertywithdrawmsg, //获取验证码
  httpUserPropertywithdraw, //资产中心-提现申请操作
  httpUserPropertywithdrawlist //资产中心-提现列表展示
} from "@/service/http";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      vCode: null, //验证码
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
      BTCform: {},
      ETHform: {},
      formInline: {},
      npage: 1,
      pagesize: 10,
      total: 0
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
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
    onSubmit() {},
    //获取验证码
    getVCode() {
      this._httpUserPropertywithdrawmsg(this.userInfo.uid);
    },
    _httpUserPropertywithdrawmsg(custUserId) {
      httpUserPropertywithdrawmsg(custUserId).then();
    },
    //资产中心-提现申请操作、
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "BTCform") {
            this._httpUserPropertywithdraw(
              this.BTCform.WalletUrl,
              1,
              this.BTCform.withDrawNumber,
              this.BTCform.password,
              this.BTCform.smsMsg,
              this.userInfo.uid
            );
          }
          if (formName == "ETHform") {
            this._httpUserPropertywithdraw(
              this.ETHform.WalletUrl,
              2,
              this.ETHform.withDrawNumber,
              this.ETHform.password,
              this.ETHform.smsMsg,
              this.userInfo.uid
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _httpUserPropertywithdraw(
      WalletUrl,
      withDrawtype,
      withDrawNumber,
      password,
      smsMsg,
      userId
    ) {
      httpUserPropertywithdraw(
        WalletUrl,
        withDrawtype,
        withDrawNumber,
        password,
        smsMsg,
        userId
      ).then();
    },
    //查询
    _init(npage, pagesize, userId, begainTimeString, endTimeString) {
      httpUserPropertywithdrawlist(
        npage,
        pagesize,
        userId,
        begainTimeString,
        endTimeString
      ).then();
    },
    /* 按条件搜索 */
    handleSearch(type = true) {
      if (type) {
        this.npage = 1;
        this.pagesize = 10;
      }
      if (this.formInline.time && this.formInline.time.length) {
        this._init(
          this.npage,
          this.pagesize,
          this.userInfo.uid,
          this.formInline.time[0],
          this.formInline.time[1]
        );
      } else {
        this._init(this.npage, this.pagesize, this.userInfo.uid);
      }
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    console.log(this.userInfo);
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

