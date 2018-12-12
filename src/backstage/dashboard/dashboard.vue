<template>
    <div class="dashboard">
      <template v-show="dashboardShow">
        <canvas id="cvs"   height="114" >
        </canvas>
        <div class="dashboard-top">
          <div class="dashboard-children">
            <img height="50px" src="../../../static/zby.png" alt="">
            <div id="elForm">
              <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" >
                <el-form-item label="当前账号：">
                  <el-select v-model="formInline.region" placeholder="活动区域" style="width:190px;" @change="changeInt">
                    <el-option
                      v-for="item in adminSubaccountList"
                      :key="item.id"
                      :label="item.code"
                      :value="item.id">
                    </el-option>
                  <!-- <el-option
                    label="查询所有"
                    value="0">
                  </el-option>
                  <el-option
                    label="后台管理员"
                    value="1">
                  </el-option>
                  <el-option
                    label="维修人员."
                    value="2">
                  </el-option>                                     -->
                  </el-select>
                </el-form-item>
                <el-form-item prop="delivery">
                  <!-- <el-switch v-model="formInline.regio"
                    active-color="#13ce66"
                    inactive-color="#62bee0"
                    active-text="轮播"
                  ></el-switch> -->
                </el-form-item>              
              </el-form>
            </div>
          </div>
          <div  class="dashboard-title">助币云矿机监控平台</div> 
          <div id="elButton">
            <span>{{date|dateServer}}</span>
             <el-button type="primary" icon="el-icon-back" size="mini" class="elButton" @click="back">返回</el-button>
          </div>
        </div>
        <div class="dashboard-middle">
          <div class="dashboard-middle-container">
            <div class="dashboard-middle-container-pro" >
              <div >
                <img class="dashboard-middle-container-pro-i1" src="../../assets/images/2_03.png" width="100px" alt="">
                <img class="dashboard-middle-container-pro-i2" src="../../assets/images/2_05.png" width="80px" alt="">
                <img class="dashboard-middle-container-pro-i3" src="../../assets/images/2_08.png" width="60px" alt="">
              </div>
              <div class="dashboard-middle-container-pro-detail">
                  矿机故障数
                <span>{{tableData.minerFaultCount?tableData.minerFaultCount:''}}</span>
              </div>
            </div>
            <div class="dashboard-middle-container-num">
              <img  src="../../assets/images/3_06.png" width="120px" alt="">
              <div >
                <p>矿机总数</p>
                <span>{{tableData.minerCount?tableData.minerCount:''}}</span>
                <p>活跃矿机总数</p>
                <span>{{tableData.minerActiveCount?tableData.minerActiveCount:''}}</span>
              </div>
            </div>
            <div class="dashboard-middle-container-yield">
              <div>收益总览</div>
              <ul>
                <li>
                  <img src="../../assets/images/3_10.png" alt="">
                  <p>
                    <span>{{yields.total_paid?yields.total_paid:''}}</span><b>BTC</b>
                  </p>
                  <span>已支付</span>
                </li>
                <li>
                  <img src="../../assets/images/3_12.png" alt="">
                  <p>
                    <span>{{yields.unpaid?yields.unpaid:''}}</span><b>BTC</b>
                  </p>
                  <span>余额</span>
                </li>              
                <li>
                  <img src="../../assets/images/3_14.png" alt="">
                  <p>
                    <span>{{yields.earnings_today?yields.earnings_today:''}}</span><b>BTC</b>
                  </p>
                  <span>今日预估</span>
                </li>
                <li>
                  <img src="../../assets/images/3_16.png" alt="">
                  <p>
                    <span>{{yields.earnings_yesterday?yields.earnings_yesterday:''}}</span><b>BTC</b>
                  </p>
                  <span>昨日收益</span>
                </li>                            
              </ul>
              <canvas id="cvs1" width="600"   height="50" >
              </canvas>            
            </div>
            <i class="el-icon-arrow-left dashboard-middle-icon dashboard-middle-1"></i>
            <i class="el-icon-arrow-right dashboard-middle-icon dashboard-middle-2"></i>
            <i class="el-icon-arrow-left dashboard-middle-icon dashboard-middle-3"></i>
            <i class="el-icon-arrow-right dashboard-middle-icon dashboard-middle-4"></i>
            <img class="img1" src="../../assets/images/7_03.png" alt="">
            <img class="img2" src="../../assets/images/7_09.png" alt="">
            <img class="img3" src="../../assets/images/7_03.png" alt="">
            <img class="img4" src="../../assets/images/7_09.png" alt="">          
            <img class="img5" src="../../assets/images/7_03.png" alt="">
            <img class="img6" src="../../assets/images/7_09.png" alt="">
            <img class="img7" src="../../assets/images/7_03.png" alt="">
            <img class="img8" src="../../assets/images/7_09.png" alt="">                    
          </div>
        </div>
        <div class="dashboard-bottom">
          <div class="broken">
            <p>
              <span class="broken-left">1个月算力曲线</span>
              <!-- <span class="broken-right">总收益<b class="broken-right-top">37.6</b>%</span> -->
            </p>
            <div class="echart echart1">

            </div>
            <p>
              <span class="broken-left">网络状态</span>
              <!-- <span class="broken-right">总装机容量<b class="broken-right-bottom">1054</b>MW</span> -->
            </p>
            <div class="dashboard-progress">
              <div >
                <p style="color:#04BA18">全网算力<span>({{btc.hashrate?(btc.hashrate/(1000000000000000000)).toFixed(2):''}} EH/s)</span></p>
                <canvas id="dashboard-progress-1" width="400" height="30" >
                </canvas>             
              </div>
              <div>
                <p style="color:#FFFF00">矿场算力<span>({{btc.shares_15m?btc.shares_15m:''}} EH/s)</span></p>
                <canvas id="dashboard-progress-2" width="400" height="30" >
                </canvas>                
              </div>
              <div>
                <p style="color:#D2D2D2">BTC 每T24H收益<span>({{btc.income_coin?btc.income_coin.toFixed(8):''}}  BTC)</span></p>
                <canvas id="dashboard-progress-3" width="400" height="30" >
                </canvas>                  
              </div>
              <div>
                <p style="color:#04BA18">距离调整还剩<span>({{btc.day?btc.day:''}}天)</span></p>
                <canvas id="dashboard-progress-7" width="400" height="30" >
                </canvas>                  
              </div>              
            </div>
          </div>
          <div class="broken">
            <p>
              <span class="broken-left">24小时算力曲线</span>
              <!-- <span class="broken-right">总收益<b class="broken-right-top">37.6</b>%</span> -->
            </p>
            <div class="echart echart2">

            </div>
            <p>
              <span class="broken-left">实时算力</span>
              <!-- <span class="broken-right">总装机容量<b class="broken-right-bottom">1054</b>MW</span> -->
            </p>
            <div class="dashboard-progress">
              <div >
                <p style="color:#04BA18">一分钟<span>({{realTimePower.shares_1m?realTimePower.shares_1m:''}}&nbsp;PH/S)</span></p>
                <canvas id="dashboard-progress-4" width="400" height="30" >
                </canvas>             
              </div>
              <div>
                <p style="color:#FFFF00">五分钟<span>({{realTimePower.shares_5m?realTimePower.shares_5m:''}}&nbsp;PH/S)</span></p>
                <canvas id="dashboard-progress-5" width="400" height="30"  >
                </canvas>                
              </div>
              <div>
                <p style="color:#D2D2D2">十五分钟<span>({{realTimePower.shares_15m?realTimePower.shares_15m:''}}&nbsp;PH/S)</span></p>
                <canvas id="dashboard-progress-6" width="400" height="30" >
                </canvas>                  
              </div>
            </div>
          </div>
          <div class="map">
            <p>矿机状态</p>
            <canvas  id="chinaEchart" width="400" height="35" >

            </canvas>
            <div class="chinaEchart">
              <img src="../../assets/images/6_03.png" alt="" style="width:100%">
            </div>
            <ul class="map-detail">
              <li>
                <p>{{showData.minersCount?showData.minersCount:''}}</p>
                <span>矿场总数</span>
              </li>
              <li>
                <p>{{showData.subAccountCount?showData.subAccountCount:''}}</p>
                <span>子账号总数</span>              
              </li>
              <li style="margin-top:5px">
                <p>{{showData.minerCount?showData.minerCount:''}}</p>
                <span>矿机总数</span>              
              </li>
              <li style="margin-top:5px">
                <p>{{showData.handleOrdersCount?showData.handleOrdersCount:''}}</p>
                <span>工单总数</span>              
              </li>
            </ul>
          </div>
        </div>        
      </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { timeFormat, timeFormatH } from "@/config/time";
import echarts from "echarts";
import china from "echarts/map/js/china";
import line from "@/backstage/dashboard/line/line";
import {
  httpGETpoolstatsmerge,
  httpGETSZpool,
  httpStaFindMarkDo,
  httpStaFind,
  httpSysLogin
} from "@/service/http";
export default {
  data() {
    return {
      date: new Date(),
      ims: "../../../static/logo.png",
      formInline: {},
      screenWidth: document.body.clientWidth,
      width: document.body.clientWidth,
      tableData: [],
      yields: {},
      realTimePower: {}, //实时算力
      dashboardShow: false,
      scroe1: [],
      scroe2: [],
      showData: [],
      btc: {},
      day30: [],
      day24: [],
      timer1: null,
      timer2: null,
      userList: []
    };
  },
  mounted() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.formInline = {
      region: this.adminSubaccountList[0]["id"]
    };
    this._init(this.adminSubaccountList[0]["id"]);
    this.getOut();
    this.drwaLine();
    // window.onresize = () => {
    //   return (() => {
    //     this._init(this.adminSubaccountList[0]["id"]);
    //     window.screenWidth = document.body.clientWidth;
    //     this.screenWidth = window.screenWidth;
    //     this.width = this.screenWidth;
    //   })();
    // };
    var base = +new Date(2014, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 150];
    var now = new Date(base);

    // 基于准备好的dom，初始化echarts实例
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // that.screenWidth = that.$store.state.canvasWidth
          that.width = that.screenWidth;
          that.timer = false;
        }, 400);
      }
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "adminSubaccountList"
      // ...
    ])
  },
  methods: {
    //
    changeInt(v) {
      console.log("+++++++++++" + v);
      if (this.timer1) {
        //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer1); //关闭
      }
      if (this.timer2) {
        //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer2); //关闭
      }
      this._init(v);
    },
    //返回
    back() {
      this.$router.push("admin");
    },
    getDaysByDateString(dateString1, dateString2) {
      var startDate = Date.parse(timeFormat(dateString1).replace("/-/g", "/"));
      var endDate = Date.parse(
        timeFormat(dateString2 * 1000).replace("/-/g", "/")
      );
      // var diffDate = endDate - startDate + 1 * 24 * 60 * 60 * 1000;
      var diffDate = endDate - startDate;
      var days = diffDate / (1 * 24 * 60 * 60 * 1000);
      //alert(diffDate/(1*24*60*60*1000));
      return days;
    },
    draw(id, w, color) {
      var cav1 = document.getElementById(id);
      var cav1 = cav1.getContext("2d");
      cav1.beginPath();
      cav1.fillStyle = color;
      cav1.moveTo(0, 0);
      cav1.lineTo(w, 0);
      cav1.lineTo(w, 15);
      cav1.lineTo(0, 15);
      cav1.fill();
    },
    /*   排序 */
    compare(pro) {
      return function(obj1, obj2) {
        var val1 = obj1[pro];
        var val2 = obj2[pro];
        if (val1 < val2) {
          //正序
          return 1;
        } else if (val1 > val2) {
          return -1;
        } else {
          return 0;
        }
      };
    },
    /*   取得外部接口 */
    getOut() {
      httpStaFind().then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.showData = data.data;
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    /*  开始划线 */
    drwaLine() {
      httpGETpoolstatsmerge().then(res => {
        let data = res.data;
        this.btc = JSON.parse(JSON.stringify(data.data.btc));

        this.btc["day"] = parseInt(
          this.getDaysByDateString(
            new Date(),
            new Date(this.btc.diff_adjust_time)
          )
        );
        httpGETSZpool().then(res => {
          let data = res.data;
          this.btc["shares_15m"] = data.data.shares.shares_15m;
        });
      });
      var cvs = document.getElementById("cvs");
      cvs.width = this.width;
      var ctx = cvs.getContext("2d");
      //设置线宽
      ctx.lineWidth = 1;
      ctx.beginPath();
      //设置线的颜色
      ctx.strokeStyle = "#1E2D51";
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 50);
      ctx.lineTo(400, 50);
      ctx.lineTo(420, 80);
      ctx.lineTo(520, 80);
      ctx.lineTo(530, 70);
      // ;
      ctx.lineTo(this.width / 2 + 430, 70);
      // this.width / 2 + 430; 1390
      ctx.lineTo(this.width / 2 + 440, 80); //1400
      ctx.lineTo(this.width / 2 + 540, 80);
      ctx.lineTo(this.width / 2 + 560, 50);
      ctx.lineTo(this.width, 50);
      ctx.lineTo(this.width, 0);
      //执行画线
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.strokeStyle = "#52FFFC";
      ctx.moveTo(540, 75);
      ctx.lineTo(this.width / 2 + 420, 75);
      ctx.stroke();
      var cvs1 = document.getElementById("cvs1");
      var ctx1 = cvs1.getContext("2d");
      //设置线宽
      ctx1.lineWidth = 4;
      ctx1.beginPath();
      ctx1.strokeStyle = "#1E2D51";
      ctx1.moveTo(20, 30);
      ctx1.lineTo(550, 30);
      ctx1.lineTo(580, 50);
      ctx1.stroke();

      ctx1.lineWidth = 1;
      ctx1.beginPath();
      ctx1.strokeStyle = "#52FFFC";
      ctx1.fillStyle = "#52FFFC";
      ctx1.moveTo(13, 20);
      ctx1.lineTo(33, 20);
      ctx1.lineTo(40, 25);
      ctx1.lineTo(20, 25);
      // ctx1.closePath();
      // ctx1.stroke();
      ctx1.fill();
      ctx1.lineWidth = 2;
      ctx1.beginPath();
      ctx1.strokeStyle = "#52FFFC";
      ctx1.moveTo(36, 23);
      ctx1.lineTo(100, 23);
      ctx1.stroke();

      //dashboard-progress-1 画直线
      // var cav1 = document.getElementById("dashboard-progress-1");
      // var cav1 = cav1.getContext("2d");
      // cav1.beginPath();
      // cav1.fillStyle = "#04BA18";
      // cav1.moveTo(0, 0);
      // cav1.lineTo(400, 0);
      // cav1.lineTo(400, 20);
      // cav1.lineTo(0, 20);
      // cav1.fill();

      var cavE = document.getElementById("chinaEchart");
      var cave = cavE.getContext("2d");
      cave.beginPath();

      cave.lineWidth = 2;
      cave.strokeStyle = "#52FFFC";
      cave.fillStyle = "rgba(102,194,224,0.1)";
      cave.moveTo(0, 10);
      cave.lineTo(0, 35);
      cave.lineTo(390, 35);
      cave.lineTo(400, 25);
      cave.lineTo(400, 0);
      cave.lineTo(10, 0);
      cave.lineTo(0, 10);
      cave.fill();
      cave.stroke();

      this.draw("dashboard-progress-1", 400, "#04BA18");
      this.draw("dashboard-progress-2", 380, "#FFFF00");
      this.draw("dashboard-progress-3", 360, "#D2D2D2");
      this.draw("dashboard-progress-7", 340, "#04BA18");
    },
    _init(id) {
      httpStaFindMarkDo(id).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.tableData = data.data;
          this.yields = JSON.parse(JSON.stringify(data.data.earnStats.data));
          this.realTimePower = JSON.parse(
            JSON.stringify(data.data.realTimePower)
          );
          var scroe = [
            { index: 1, score: this.realTimePower.shares_1m },
            { index: 2, score: this.realTimePower.shares_5m },
            { index: 3, score: this.realTimePower.shares_15m }
          ];
          scroe.sort(this.compare("score"));
          scroe[0].index == 1
            ? this.draw("dashboard-progress-4", 400, "#04BA18")
            : scroe[0].index == 2
              ? this.draw("dashboard-progress-5", 400, "#FFFF00")
              : scroe[0].index == 3
                ? this.draw("dashboard-progress-6", 400, "#D2D2D2")
                : "";
          scroe[1].index == 1
            ? this.draw("dashboard-progress-4", 370, "#04BA18")
            : scroe[1].index == 2
              ? this.draw("dashboard-progress-5", 370, "#FFFF00")
              : scroe[1].index == 3
                ? this.draw("dashboard-progress-6", 370, "#D2D2D2")
                : "";
          scroe[2].index == 1
            ? this.draw("dashboard-progress-4", 340, "#04BA18")
            : scroe[2].index == 2
              ? this.draw("dashboard-progress-5", 340, "#FFFF00")
              : scroe[2].index == 3
                ? this.draw("dashboard-progress-6", 340, "#D2D2D2")
                : "";
          this.day30 = JSON.parse(
            JSON.stringify(data.data.shareHistoryDay.data.tickers)
          );
          this.day30.pop();
          let that = this;
          function addTimes(times, data) {
            var time = [];
            var x1 = [];
            var x2 = [];
            if (times < data.length - 10) {
              time = data.slice(times, times + 10).map((v, i) => {
                return timeFormat(v[0] * 1000, 0, false);
              });
              x1 = data.slice(times, times + 10).map((v, i) => {
                return v[1];
              });
              x2 = data.slice(times, times + 10).map((v, i) => {
                return v[2];
              });
            } else {
              time = data
                .slice(times, data.length)
                .concat(data.slice(0, 10 - data.length + times))
                .map((v, i) => {
                  return timeFormat(v[0] * 1000, 0, false);
                });
              x1 = data
                .slice(times, data.length)
                .concat(data.slice(0, 10 - data.length + times))
                .map((v, i) => {
                  return v[1];
                });
              x2 = data
                .slice(times, data.length)
                .concat(data.slice(0, 10 - data.length + times))
                .map((v, i) => {
                  return v[2];
                });
            }

            // 基于准备好的dom，初始化echarts实例
            that.myChart = echarts.init(document.querySelector(".echart1"));
            that.myChart.setOption({
              // backgroundColor: "rgba(43, 62, 75, 0.5)", //背景颜色
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "line" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                //间距距离左右下
                //top: '50',
                bottom: "45",
                left: "1%",
                right: "1%",
                containLabel: true
              },
              legend: {
                data: ["算力", "拒绝率"],
                left: "right",
                padding: [0, 60],
                textStyle: {
                  //图例文字的样式
                  color: "#ccc",
                  fontSize: 12
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: time,
                  boundaryGap: ["5%", "5%"],
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#66c2e0"
                    }
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    formatter: "{value} °C"
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#66c2e0"
                    }
                  },
                  name: "(BTC)",
                  nameTextStyle: {
                    color: "#66c2e0"
                  },
                  splitLine: {
                    show: false
                  }
                },
                {
                  type: "value",
                  min: 0,
                  max: 0.1,
                  axisLabel: {
                    formatter: "{value} °C"
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#e4393c"
                    }
                  },
                  name: "(%)",
                  nameTextStyle: {
                    color: "#e4393c"
                  },
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  name: "算力",
                  type: "line",
                  data: x1,
                  yAxisIndex: 0,
                  markPoint: {
                    data: [
                      { type: "max", name: "最大值" }
                      //{ type: "min", name: "最小值" }
                    ]
                  },
                  markLine: {
                    data: [{ type: "average", name: "平均值" }]
                  },
                  color: ["#66c2e0"]
                },
                {
                  name: "拒绝率",

                  type: "line",
                  yAxisIndex: 1,
                  // scale: true,

                  data: x2,
                  markPoint: {
                    data: [
                      { type: "max", name: "最大值" }
                      //{ type: "min", name: "最小值" }
                    ]
                    // data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
                  },
                  markLine: {
                    data: [{ type: "average", name: "平均值" }]
                  },
                  color: ["#e4393c"]
                }
              ]
            });
          }
          var times = 0;
          this.timer1 = setInterval(() => {
            times += 1;
            if (times == this.day30.length) {
              times = 0;
            }
            addTimes(times, this.day30);
          }, 1500);
          this.day24 = JSON.parse(
            JSON.stringify(data.data.shareHistoryHoure.data.tickers)
          );
          this.day24.pop();
          function addTimes2(times, data) {
            var time = [];
            var x1 = [];
            var x2 = [];
            if (times < data.length - 12) {
              time = data.slice(times, times + 12).map((v, i) => {
                return timeFormatH(v[0] * 1000, 0, false);
              });
              x1 = data.slice(times, times + 12).map((v, i) => {
                return v[1];
              });
              x2 = data.slice(times, times + 12).map((v, i) => {
                return v[2];
              });
            } else {
              time = data
                .slice(times, data.length)
                .concat(data.slice(0, 12 - data.length + times))
                .map((v, i) => {
                  return timeFormatH(v[0] * 1000, 0, false);
                });
              x1 = data
                .slice(times, data.length)
                .concat(data.slice(0, 12 - data.length + times))
                .map((v, i) => {
                  return v[1];
                });
              x2 = data
                .slice(times, data.length)
                .concat(data.slice(0, 12 - data.length + times))
                .map((v, i) => {
                  return v[2];
                });
            }
            // 基于准备好的dom，初始化echarts实例
            that.myChart2 = echarts.init(document.querySelector(".echart2"));
            that.myChart2.setOption({
              // backgroundColor: "rgba(43, 62, 75, 0.5)", //背景颜色
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "line" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                //间距距离左右下
                //top: '50',
                bottom: "45",
                left: "1%",
                right: "1%",
                containLabel: true
              },
              legend: {
                data: ["算力", "拒绝率"],
                left: "right",
                padding: [0, 60],
                textStyle: {
                  //图例文字的样式
                  color: "#ccc",
                  fontSize: 12
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: time,
                  boundaryGap: ["5%", "5%"],
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#66c2e0"
                    }
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    formatter: "{value} °C"
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#66c2e0"
                    }
                  },
                  name: "(BTC)",
                  nameTextStyle: {
                    color: "#66c2e0"
                  },
                  splitLine: {
                    show: false
                  }
                },
                {
                  type: "value",
                  min: 0,
                  max: 0.1,
                  axisLabel: {
                    formatter: "{value} °C"
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: "#66c2e0"
                    }
                  },
                  name: "(%)",
                  nameTextStyle: {
                    color: "#66c2e0"
                  },
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  name: "算力",
                  type: "line",
                  data: x1,
                  markPoint: {
                    data: [
                      { type: "max", name: "最大值" }
                      //{ type: "min", name: "最小值" }
                    ]
                  },
                  markLine: {
                    data: [{ type: "average", name: "平均值" }]
                  },
                  color: ["#66c2e0"]
                },
                {
                  name: "拒绝率",
                  type: "line",
                  yAxisIndex: 1,
                  data: x2,
                  scale: true,

                  markPoint: {
                    data: [
                      { type: "max", name: "最大值" }
                      //{ type: "min", name: "最小值" }
                    ]
                    // data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
                  },
                  markLine: {
                    data: [{ type: "average", name: "平均值" }]
                  },
                  color: ["#e4393c"]
                }
              ]
            });
          }
          var times1 = 0;
          this.timer2 = setInterval(() => {
            times1 += 1;
            if (times1 == this.day24.length) {
              times1 = 0;
            }
            addTimes2(times1, this.day24);
          }, 1500);
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });

      this.dashboardShow = true;
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
  },
  components: {
    "v-line": line
  },
  beforeDestroy() {
    if (this.timer1) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer1); //关闭
    }
    if (this.timer2) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer2); //关闭
    }
  },
  // updated() {
  //   if (this.timer1) {
  //     //如果定时器还在运行 或者直接关闭，不用判断
  //     console.log(this.timer1);
  //     clearInterval(this.timer1); //关闭
  //   }
  //   if (this.timer2) {
  //     //如果定时器还在运行 或者直接关闭，不用判断
  //     console.log(this.timer2);
  //     clearInterval(this.timer2); //关闭
  //   }
  // },
  destroyed() {
    if (this.timer1) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer1); //关闭
    }
    if (this.timer2) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer2); //关闭
    }
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  font-family: Tahoma, "Microsoft Yahei", Simsun, sans-serif;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dashboard {
  position: absolute;
  // height: 100%;
  width: 100%;
  // overflow: hidden;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  background: url("../../assets/bg22.jpg");
  background-size: 100% 100%;
  #cvs {
  }
  #cvs1 {
    position: absolute;
    top: 0;
    left: 0;
  }
  .dashboard-top {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    .dashboard-children {
      width: 400px;
      #elForm {
        margin-top: 10px;
        margin-left: 25px;
      }
    }
    .dashboard-title {
      flex-grow: 1;
      text-align: center;
      color: #62bee0;
      font-weight: bold;
      font-size: 30px;
      line-height: 80px;
      letter-spacing: 5px;
      background-image: -webkit-linear-gradient(
        bottom,
        #14aed8,
        #24abd6,
        #4078ed
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    strong {
      color: #62bee0;
      font-size: 30px;
      line-height: 50px;
      background-image: -webkit-linear-gradient(
        bottom,
        #14aed8,
        #24abd6,
        #4078ed /*        / / #3e76eb,
        / / #24abd6,
        / / #62bee0 */
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    #elButton {
      width: 400px;
      text-align: right;
      padding-top: 10px;
      span {
        margin-right: 20px;
        color: #50f9f9;
        font-size: 12px;
        line-height: 32px;
      }
      .elButton {
        margin-right: 20px;
      }
    }
  }
  .dashboard-middle {
    width: 100%;
    .dashboard-middle-container {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 95%;
      height: 240px;
      margin: 0 auto;
      padding: 20px 0;
      background: #0b1016;
      & > img {
        position: absolute;
      }
      .img1 {
        top: -20px;
        left: 0;
      }
      .img2 {
        top: 0;
        left: -20px;
      }
      .img3 {
        top: -20px;
        right: 0;
      }
      .img4 {
        top: 0;
        right: -20px;
      }
      .img5 {
        bottom: -20px;
        right: 0;
      }
      .img6 {
        bottom: 0;
        right: -20px;
      }
      .img7 {
        bottom: -20px;
        left: 0;
      }
      .img8 {
        bottom: 0;
        left: -20px;
      }
      .dashboard-middle-icon {
        color: #62bee0;
        font-weight: bold;
        font-size: 36px;
        position: absolute;
      }
      .dashboard-middle-1 {
        transform: rotate(45deg);
        top: -15px;
        left: -15px;
      }
      .dashboard-middle-2 {
        transform: rotate(-45deg);
        top: -15px;
        right: -15px;
      }
      .dashboard-middle-3 {
        transform: rotate(-45deg);
        bottom: -15px;
        left: -15px;
      }
      .dashboard-middle-4 {
        transform: rotate(45deg);
        bottom: -15px;
        right: -15px;
      }
      & > div {
      }
      .dashboard-middle-container-pro {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        position: relative;
        min-width: 400px;
        border: 1px solid #1e2d51;
        img {
          position: absolute;
        }
        .dashboard-middle-container-pro-i1 {
          top: 20px;
          left: 15px;
          -webkit-transform: rotate(360deg);
          animation: rotation 3s linear infinite;
          -moz-animation: rotation 3s linear infinite;
          -webkit-animation: rotation 3s linear infinite;
          -o-animation: rotation 3s linear infinite;
        }
        .dashboard-middle-container-pro-i2 {
          top: 80px;
          left: 110px;
          -webkit-transform: rotate(360deg);
          animation: rotation 3s linear infinite;
          -moz-animation: rotation 3s linear infinite;
          -webkit-animation: rotation 3s linear infinite;
          -o-animation: rotation 3s linear infinite;
        }
        .dashboard-middle-container-pro-i3 {
          top: 130px;
          left: 45px;
          -webkit-transform: rotate(360deg);
          animation: rotation 3s linear infinite;
          -moz-animation: rotation 3s linear infinite;
          -webkit-animation: rotation 3s linear infinite;
          -o-animation: rotation 3s linear infinite;
        }
        .dashboard-middle-container-pro-detail {
          width: 150px;
          color: #f77900;
          font-weight: bold;
          padding: 40px 0;
          span {
            display: block;
            margin-top: 20px;
            font-size: 70px;
            line-height: 100px;
            font-weight: 600;
          }
        }
      }
      .dashboard-middle-container-num {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 350px;
        border: 1px solid #1e2d51;
        padding: 20px 0;
        font-weight: bold;
        img {
          margin-left: 40px;
        }
        & > div {
          width: 150px;
          text-align: center;
          p {
            margin: 0;
            line-height: 30px;
            color: #66c2e0;
          }
          span {
            line-height: 30px;
            color: #01bb1c;
          }
        }
      }
      .dashboard-middle-container-yield {
        position: relative;
        width: 600px;
        color: #66c2e0;
        & > div {
          height: 50px;
          padding-right: 50px;
          text-align: right;
        }
        ul {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 70px;
              height: 56px;
            }
            p {
              font-size: 16px;
              span {
                color: #01bb1c;
              }
              b {
                font-weight: normal;
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
  }
  .dashboard-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 95%;
    margin: 50px auto;
    .broken {
      width: 500px;
      .echart {
        padding: 0px;
        margin: 10px 0;
        height: 300px;
      }
      & > p {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 35px;
        margin: 0 20px;
        padding: 0 20px;
        font-weight: bold;
        border: 1px solid #52fffc;
        color: #62bee0;
        background: rgba(102, 194, 224, 0.1);
        .broken-left {
          font-size: 16px;
          background-image: -webkit-linear-gradient(
            bottom,
            #14aed8,
            #24abd6,
            #4078ed
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .broken-right {
          font-size: 12px;
          b {
            margin: 0 5px;
            font-size: 18px;
            color: #c6c225;
          }
          .broken-right-top {
            color: #c6c225;
          }
          .broken-right-bottom {
            color: #06ba19;
          }
        }
      }
      .dashboard-progress {
        margin-top: 30px;
        padding-left: 30px;
        p {
          margin-bottom: 5px;
          font-size: 12px;
          span {
            margin-left: 10px;
            font-size: 16px;
            color: #62bee0;
            font-weight: 500;
          }
        }
      }
    }
    .map {
      position: relative;
      width: 400px;
      & > p {
        position: absolute;
        top: 0;
        left: 0;
        margin-bottom: 0;
        padding-left: 20px;
        height: 35px;
        line-height: 35px;
        color: #62bee0;
        font-weight: bold;
        font-size: 16px;
        background-image: -webkit-linear-gradient(
          bottom,
          #14aed8,
          #24abd6,
          #4078ed
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .chinaEchart {
        padding: 0px;
        margin-top: 10px;
        height: 320px;
        border: 1px solid #1e2d51;
        border-bottom: none;
      }
      .map-detail {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        height: 250px;
        border: 1px solid #1e2d51;
        border-top: none;
        li {
          width: 195px;
          background: #020c18;
          text-align: center;
          font-weight: bold;
          padding-top: 15px;
          p {
            margin: 0;
            font-size: 26px;
            font-weight: 500;
            color: #04ac1b;
          }
          span {
            font-size: 18px;
            line-height: 50px;
            color: #27fdfb;
          }
        }
      }
    }
  }
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.line {
  height: 300px !important;
  background: none !important;
}
</style>
<style  lang="less">
#elForm {
  input {
    background: none;
    border: 1px solid #62bee0;
    color: #62bee0;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #62bee0;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #62bee0;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #62bee0;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #62bee0;
  }
  label {
    color: #62bee0;
    font-weight: 600;
  }
  span {
    color: #62bee0;
    font-weight: bold;
  }
}
#elButton {
  button {
    background: none;
    color: #50f9f9;
    border-radius: 10%;
    border-color: #50f9f9;
  }
}
</style>


