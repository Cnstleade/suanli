<template>
    <div id="calculator">
        <div class="container">
            <div class=" col-12 main">
                <h2>收益计算器</h2>
                <p>选择择你的产品或输入你的算力额度，点击【计算收益】按钮即可计算当前难度下的回本时间，以及1天/1周/1年的收益。您也可以自己输入成本价以及币价。</p>
                <div class="row justify-content-around align-items-center">
                    <div class="col-12 col-lg-2 mt-2">
                        <div class="row align-items-center ">
                            <p class="col-4 col-lg-12">算力:</p>
                            <div class="col-8 col-lg-12">
                              <el-input placeholder="请输入内容" v-model="input1" class="input-with-select" size="lage">
                                <el-button  ></el-button>
                                <el-select v-model="select1" slot="append" placeholder="请选择">
                                  <el-option label="MH/s" value="1"></el-option>
                                  <el-option label="TH/s" value="2"></el-option>
                                </el-select>
                              </el-input>
                            </div> 
                        </div>
                    </div>
                    <div class="col-12 col-lg-2 mt-2">
                        <div class="row align-items-center ">
                            <p class="col-4 col-lg-12">功率:</p>
                            <div class="col-8 col-lg-12" >
                                <el-input placeholder="请输入功率" v-model="input1" size="lage">
                                  <template slot="append">Kw/时</template>
                                </el-input>                                
                            </div> 
                        </div>                        
                    </div>
                    <div class="col-12 col-lg-2 mt-2">
                        <div class="row align-items-center">
                            <p class="col-4 col-lg-12">电费：</p>
                            <div class="col-8 col-lg-12">
                                <el-select v-model="input3"  placeholder="请选择电费" size="lage" class="w-100">
                                    <el-option label="0.60" value="1"></el-option>
                                    <el-option label="0.45" value="2"></el-option>
                                    <el-option label="0.40" value="3"></el-option>
                                    <el-option label="0.38" value="4"></el-option>
                                    <el-option label="0.35" value="5"></el-option>
                                </el-select>                              
                            </div> 
                        </div>                        
                    </div>
                    <div class="col-12 col-lg-2 mt-2">
                        <div class="row align-items-center">
                            <p class="col-4 col-lg-12">成本价格:</p>
                            <div class="col-8 col-lg-12" >
                                   <el-input placeholder="请输入功率" v-model="input4" size="lage">
                                  <template slot="append">元</template>
                                </el-input>  
                            </div> 
                        </div>                        
                    </div>
                    <div class="col-12 col-lg-2 mt-2">
                        <div class="row align-items-center">
                            <p class="col-4 col-lg-12">币价:</p>
                            <div class="col-8 col-lg-12" >
                                <el-input placeholder="请输入功率" v-model="input5" size="lage">
                                  <template slot="append">元</template>
                                </el-input>  
                            </div> 
                        </div>                        
                    </div>                                                                                
                </div>
                <div class="text-center mt-4 mb-4 calculator-1">
                    Ethereum 当前币价：  1 ETH=1,407.27元
                </div>
                <div class="col-8 col-lg-2 " style="margin: 20px auto;">
                     <el-button type="primary" class="w-100" size="lage">开始计算</el-button>
                </div>
                <div class="calculator-footer">
                    <div class="row calculator-footer-1">
                        <div class="col-12 col-lg-4">
                            全网算力：<span>242TH/S</span>
                        </div>
                        <div class="col-12 col-lg-5">
                            当前难度|预计下次难度调整：<span>3248.03 TH</span>
                        </div>                        
                    </div>
                    <div class="calculator-table ">
                        <table class="table text-center">
                            <tr>
                                <th><span>每天净收益</span><p>112.65元</p></th>
                                <th><span>每周净收益</span><p>788.52元</p></th>
                                <th><span>每月净收益</span><p>788.52元</p></th>
                                <th><span>每年净收益</span><p>41,115.53元</p></th>
                            </tr>
                            <tr>
                                <td><span>以太坊/ 天</span><p>0.30686280ETH</p></td>
                                <td><span>以太坊/ 周</span><p>2.14803960ETH</p></td>
                                <td><span>以太坊/ 月</span><p>9.20588400ETH</p></td>
                                <td><span>以太坊/ 年</span><p>112.00492200ETH</p></td>
                            </tr>
                            <tr>
                                <td><span>人民币/天</span><p>429.45元</p></td>
                                <td><span>人民币/天</span><p>3,006.12元</p></td>
                                <td><span>人民币/月</span><p>12,883.36元</p></td>
                                <td><span>人民币/年</span><p>156,747.53元</p></td>
                            </tr> 
                            <tr>
                                <td><span>耗电量/天</span><p>528度</p></td>
                                <td><span>耗电量/周</span><p>3696度</p></td>
                                <td><span>耗电量/周</span><p>15840度</p></td>
                                <td><span>耗电量/年</span><p>192720度</p></td>
                            </tr> 
                            <tr>
                                <td><span>耗电量/年</span><p>316.80元</p></td>
                                <td><span>电费 /周</span><p>316.80元</p></td>
                                <td><span>电费 /周</span><p>9,504.00元</p></td>
                                <td><span>电费 /年</span><p>115,632.00元</p></td>
                            </tr>                                                                                    
                        </table>
                    </div>
                    <p>提示：算力是根据第三方矿池，BTC和ETH官方公布的算力难度等参数来计算的，会有数据更新差，以上计算结果仅供参考使用！</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { animate } from "@/config/animate";
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      select1: "MH/s",
      select2: "KW/时",
      select3: "MH/s",
      select4: "MH/s",
      select5: "MH/s"
    };
  },
  methods: {
    //返回顶部
    backTop() {
      animate(document.body, { scrollTop: "0" }, 400, "ease-out");
    }
  },
  mounted() {
    this.backTop();
  }
};
</script>

<style lang="less" scoped>
* {
  font-family: "\5FAE\8F6F\96C5\9ED1", tahoma, arial, "Hiragino Sans GB",
    "\5b8b\4f53", sans-serif;
}
#calculator {
  @media screen and (max-width: 720px) {
    & > .container {
      padding: 0;
    }
  }
  //   @media screen and (min-width: 721px) {
  //       &>.container {
  //       margin-top: 20px;
  //       line-height: 80px;
  //     }
  //   }
  .main {
    margin-top: 50px;
    background: #fff;
    box-shadow: 0 4px 16px 0 rgba(120, 121, 125, 0.3);
    border-top: 4px solid #d86f06;

    & > h2 {
      color: #000;
      font-size: 18px;
      margin: 16px 0 7px 17px;
      font-weight: bold;
      @media screen and (max-width: 720px) {
        & {
          font-size: 16px;
          text-align: center;
        }
      }
    }
    & > p {
      font-size: 16px;
      color: #666;
      line-height: 23px;
      display: block;
      padding-left: 17px;
      @media screen and (max-width: 720px) {
        & {
          font-size: 12px;
        }
      }
    }
    .calculator-1 {
      @media screen and (max-width: 720px) {
        & {
          font-size: 12px;
        }
      }
    }
  }
  .calculator-footer {
    border-top: 1px solid #e0e0e0;
    padding: 30px 30px 34px;
    @media screen and (max-width: 720px) {
      & {
        padding: 30px 10px 34px;
      }
    }
    & > p {
      font-size: 16px;
      text-align: center;
      margin: 30px auto;
      @media screen and (max-width: 720px) {
        & {
          font-size: 12px;
        }
      }
    }
    .calculator-footer-1 {
      color: #908f8f;
      font-size: 16px;
      margin-right: 5px;
      line-height: 36px;
      span {
        color: #d86f06;
        font-size: 30px;
        font-weight: 400;
        display: inline-block;
      }
      @media screen and (max-width: 720px) {
        & {
          font-size: 12px;
          span {
            font-size: 13px;
            color: #d86f06;
          }
        }
      }
    }
    .calculator-table {
      margin-top: 20px;

      @media screen and (max-width: 720px) {
        & {
          width: 500px;
          overflow: scroll;
        }
      }
      tr:nth-child(1) {
        background: #eee;
      }
      td,
      th {
        border: 1px solid #dcdcdc;
        padding: 20px 0;
      }
      span {
        font-size: 16px;
        color: #292929;
        @media screen and (max-width: 720px) {
          & {
            font-size: 12px;
          }
        }
      }
      p {
        color: #fe6767;
        font-size: 16px;
        line-height: 22px;
        margin: 0;
        @media screen and (max-width: 720px) {
          & {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
<style>
.el-select {
  width: 85px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
