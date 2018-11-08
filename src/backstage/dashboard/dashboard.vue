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
                  <el-select v-model="formInline.region" placeholder="活动区域" style="width:190px;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="delivery">
                  <el-switch v-model="formInline.regio"
                    active-color="#13ce66"
                    inactive-color="#62bee0"
                    active-text="轮播"
                  ></el-switch>
                </el-form-item>              
              </el-form>
            </div>
          </div>
          <div  class="dashboard-title">助币云矿机监控平台</div> 
          <div id="elButton">
            <span>{{date|dateServer}}</span>
             <el-button type="primary" icon="el-icon-back" size="mini" class="elButton">返回</el-button>
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
              <span class="broken-left">1小时算力曲线</span>
              <span class="broken-right">总收益<b class="broken-right-top">37.6</b>%</span>
            </p>
            <div class="echart echart1">

            </div>
            <p>
              <span class="broken-left">数据信息</span>
              <span class="broken-right">总装机容量<b class="broken-right-bottom">1054</b>MW</span>
            </p>
            <div class="dashboard-progress">
              <div >
                <p style="color:#04BA18">井网容量<span>(798MV)</span></p>
                <canvas id="dashboard-progress-1" width="400" height="30" >
                </canvas>             
              </div>
              <div>
                <p style="color:#FFFF00">在建容量<span>(398MV)</span></p>
                <canvas id="dashboard-progress-2" width="400" height="30" >
                </canvas>                
              </div>
              <div>
                <p style="color:#D2D2D2">未建容量<span>(398MV)</span></p>
                <canvas id="dashboard-progress-3" width="400" height="30" >
                </canvas>                  
              </div>
            </div>
          </div>
          <div class="broken">
            <p>
              <span class="broken-left">24小时算力曲线</span>
              <span class="broken-right">总收益<b class="broken-right-top">37.6</b>%</span>
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
                <p>{{showData.minerCount?showData.minerCount:''}}</p>
                <span>工单总数</span>              
              </li>
            </ul>
          </div>
        </div>        
      </template>
    </div>
</template>

<script>
import echarts from "echarts";
import china from "echarts/map/js/china";
import line from "@/backstage/dashboard/line/line";
import {
  httpGETpoolstatsmerge,
  httpStaFindMarkDo,
  httpStaFind
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
      showData: []
    };
  },
  mounted() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
    this._init();
    window.onresize = () => {
      return (() => {
        this._init();
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
        this.width = this.screenWidth;
      })();
    };
    var base = +new Date(2014, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 150];
    var now = new Date(base);

    // function addData(shift) {
    //   now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/");
    //   date.push(now);
    //   data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);

    //   if (shift) {
    //     date.shift();
    //     data.shift();
    //   }

    //   now = new Date(+new Date(now) + oneDay);
    // }

    // for (var i = 1; i < 100; i++) {
    //   addData();
    // }
    this.geoCoordMap = {
      海门: [121.15, 31.89],
      鄂尔多斯: [109.781327, 39.608266],
      招远: [120.38, 37.35],
      舟山: [122.207216, 29.985295],
      齐齐哈尔: [123.97, 47.33],
      盐城: [120.13, 33.38],
      赤峰: [118.87, 42.28],
      青岛: [120.33, 36.07],
      乳山: [121.52, 36.89],
      金昌: [102.188043, 38.520089],
      泉州: [118.58, 24.93],
      莱西: [120.53, 36.86],
      日照: [119.46, 35.42],
      胶南: [119.97, 35.88],
      南通: [121.05, 32.08],
      拉萨: [91.11, 29.97],
      云浮: [112.02, 22.93],
      梅州: [116.1, 24.55],
      文登: [122.05, 37.2],
      上海: [121.48, 31.22],
      攀枝花: [101.718637, 26.582347],
      威海: [122.1, 37.5],
      承德: [117.93, 40.97],
      厦门: [118.1, 24.46],
      汕尾: [115.375279, 22.786211],
      潮州: [116.63, 23.68],
      丹东: [124.37, 40.13],
      太仓: [121.1, 31.45],
      曲靖: [103.79, 25.51],
      烟台: [121.39, 37.52],
      福州: [119.3, 26.08],
      瓦房店: [121.979603, 39.627114],
      即墨: [120.45, 36.38],
      抚顺: [123.97, 41.97],
      玉溪: [102.52, 24.35],
      张家口: [114.87, 40.82],
      阳泉: [113.57, 37.85],
      莱州: [119.942327, 37.177017],
      湖州: [120.1, 30.86],
      汕头: [116.69, 23.39],
      昆山: [120.95, 31.39],
      宁波: [121.56, 29.86],
      湛江: [110.359377, 21.270708],
      揭阳: [116.35, 23.55],
      荣成: [122.41, 37.16],
      连云港: [119.16, 34.59],
      葫芦岛: [120.836932, 40.711052],
      常熟: [120.74, 31.64],
      东莞: [113.75, 23.04],
      河源: [114.68, 23.73],
      淮安: [119.15, 33.5],
      泰州: [119.9, 32.49],
      南宁: [108.33, 22.84],
      营口: [122.18, 40.65],
      惠州: [114.4, 23.09],
      江阴: [120.26, 31.91],
      蓬莱: [120.75, 37.8],
      韶关: [113.62, 24.84],
      嘉峪关: [98.289152, 39.77313],
      广州: [113.23, 23.16],
      延安: [109.47, 36.6],
      太原: [112.53, 37.87],
      清远: [113.01, 23.7],
      中山: [113.38, 22.52],
      昆明: [102.73, 25.04],
      寿光: [118.73, 36.86],
      盘锦: [122.070714, 41.119997],
      长治: [113.08, 36.18],
      深圳: [114.07, 22.62],
      珠海: [113.52, 22.3],
      宿迁: [118.3, 33.96],
      咸阳: [108.72, 34.36],
      铜川: [109.11, 35.09],
      平度: [119.97, 36.77],
      佛山: [113.11, 23.05],
      海口: [110.35, 20.02],
      江门: [113.06, 22.61],
      章丘: [117.53, 36.72],
      肇庆: [112.44, 23.05],
      大连: [121.62, 38.92],
      临汾: [111.5, 36.08],
      吴江: [120.63, 31.16],
      石嘴山: [106.39, 39.04],
      沈阳: [123.38, 41.8],
      苏州: [120.62, 31.32],
      茂名: [110.88, 21.68],
      嘉兴: [120.76, 30.77],
      长春: [125.35, 43.88],
      胶州: [120.03336, 36.264622],
      银川: [106.27, 38.47],
      张家港: [120.555821, 31.875428],
      三门峡: [111.19, 34.76],
      锦州: [121.15, 41.13],
      南昌: [115.89, 28.68],
      柳州: [109.4, 24.33],
      三亚: [109.511909, 18.252847],
      自贡: [104.778442, 29.33903],
      吉林: [126.57, 43.87],
      阳江: [111.95, 21.85],
      泸州: [105.39, 28.91],
      西宁: [101.74, 36.56],
      宜宾: [104.56, 29.77],
      呼和浩特: [111.65, 40.82],
      成都: [104.06, 30.67],
      大同: [113.3, 40.12],
      镇江: [119.44, 32.2],
      桂林: [110.28, 25.29],
      张家界: [110.479191, 29.117096],
      宜兴: [119.82, 31.36],
      北海: [109.12, 21.49],
      西安: [108.95, 34.27],
      金坛: [119.56, 31.74],
      东营: [118.49, 37.46],
      牡丹江: [129.58, 44.6],
      遵义: [106.9, 27.7],
      绍兴: [120.58, 30.01],
      扬州: [119.42, 32.39],
      常州: [119.95, 31.79],
      潍坊: [119.1, 36.62],
      重庆: [106.54, 29.59],
      台州: [121.420757, 28.656386],
      南京: [118.78, 32.04],
      滨州: [118.03, 37.36],
      贵阳: [106.71, 26.57],
      无锡: [120.29, 31.59],
      本溪: [123.73, 41.3],
      克拉玛依: [84.77, 45.59],
      渭南: [109.5, 34.52],
      马鞍山: [118.48, 31.56],
      宝鸡: [107.15, 34.38],
      焦作: [113.21, 35.24],
      句容: [119.16, 31.95],
      北京: [116.46, 39.92],
      徐州: [117.2, 34.26],
      衡水: [115.72, 37.72],
      包头: [110, 40.58],
      绵阳: [104.73, 31.48],
      乌鲁木齐: [87.68, 43.77],
      枣庄: [117.57, 34.86],
      杭州: [120.19, 30.26],
      淄博: [118.05, 36.78],
      鞍山: [122.85, 41.12],
      溧阳: [119.48, 31.43],
      库尔勒: [86.06, 41.68],
      安阳: [114.35, 36.1],
      开封: [114.35, 34.79],
      济南: [117, 36.65],
      德阳: [104.37, 31.13],
      温州: [120.65, 28.01],
      九江: [115.97, 29.71],
      邯郸: [114.47, 36.6],
      临安: [119.72, 30.23],
      兰州: [103.73, 36.03],
      沧州: [116.83, 38.33],
      临沂: [118.35, 35.05],
      南充: [106.110698, 30.837793],
      天津: [117.2, 39.13],
      富阳: [119.95, 30.07],
      泰安: [117.13, 36.18],
      诸暨: [120.23, 29.71],
      郑州: [113.65, 34.76],
      哈尔滨: [126.63, 45.75],
      聊城: [115.97, 36.45],
      芜湖: [118.38, 31.33],
      唐山: [118.02, 39.63],
      平顶山: [113.29, 33.75],
      邢台: [114.48, 37.05],
      德州: [116.29, 37.45],
      济宁: [116.59, 35.38],
      荆州: [112.239741, 30.335165],
      宜昌: [111.3, 30.7],
      义乌: [120.06, 29.32],
      丽水: [119.92, 28.45],
      洛阳: [112.44, 34.7],
      秦皇岛: [119.57, 39.95],
      株洲: [113.16, 27.83],
      石家庄: [114.48, 38.03],
      莱芜: [117.67, 36.19],
      常德: [111.69, 29.05],
      保定: [115.48, 38.85],
      湘潭: [112.91, 27.87],
      金华: [119.64, 29.12],
      岳阳: [113.09, 29.37],
      长沙: [113, 28.21],
      衢州: [118.88, 28.97],
      廊坊: [116.7, 39.53],
      菏泽: [115.480656, 35.23375],
      合肥: [117.27, 31.86],
      武汉: [114.31, 30.52],
      大庆: [125.03, 46.58],
      林芝地: [94.25, 29.59],
      果洛藏族自治: [97.42, 34.81],
      闵行: [121.23, 31.07],
      那曲地: [92.1, 31.47]
    };
    let mapdata = [
      { name: "海门", value: 90 },
      { name: "鄂尔多斯", value: 120 },
      { name: "招远", value: 142 },
      { name: "舟山", value: 123 }
    ];

    // 基于准备好的dom，初始化echarts实例
    this.myChart1 = echarts.init(document.querySelector(".echart1"));
    this.myChart2 = echarts.init(document.querySelector(".echart2"));
    // this.myChina = echarts.init(document.querySelector(".chinaEchart"));
    // this.myChina.setOption({
    //   // backgroundColor: '#404a59',
    //   // title: {
    //   //   show: false
    //   // },
    //   // tooltip: {
    //   //   trigger: "item",
    //   //   formatter: function(params) {
    //   //     return params.name + " : " + params.value[2];
    //   //   }
    //   // },
    //   // legend: {
    //   //   show: false
    //   // },
    //   // visualMap: {
    //   //   min: 0,
    //   //   max: 200,
    //   //   bottom: 50,
    //   //   splitNumber: 5,
    //   //   inRange: {
    //   //     color: ["#255B78", "#2A7484", "#2F9696", "#3BBCB0", "#51D4EB"]
    //   //   },
    //   //   textStyle: {
    //   //     color: "#fff"
    //   //   }
    //   // },
    //   geo: {
    //     map: "china",
    //     zoom: 1,
    //     top: 50,
    //     itemStyle: {
    //       normal: {
    //         // 普通状态下的样式
    //         color: "#3c4247",
    //         opacity: 0.6,
    //         borderColor: "rgba(255, 255, 255, 0.35)"
    //       },
    //       emphasis: {
    //         // 高亮状态下的样式
    //         color: "#2a333d"
    //       }
    //     }
    //   },
    //   series: [
    //     // {
    //     //   name: "rode",
    //     //   type: "lines",
    //     //   coordinateSystem: "geo",
    //     //   data: this.convertData(mapdata),
    //     //   effect: {
    //     //     show: true,
    //     //     period: 6,
    //     //     trailLength: 0
    //     //   },
    //     //   lineStyle: {
    //     //     normal: {
    //     //       color: "#389BB7",
    //     //       width: 1,
    //     //       opacity: 0.4,
    //     //       curveness: 0.2
    //     //     }
    //     //   }
    //     // },
    //     {
    //       name: "city",
    //       type: "effectScatter",
    //       layoutCenter: ["50%", "50%"],
    //       layoutSize: "100%",
    //       coordinateSystem: "geo",
    //       rippleEffect: {
    //         brushType: "stroke"
    //       },

    //       label: {
    //         normal: {
    //           show: true,
    //           position: "right",
    //           formatter: "{b}"
    //         },
    //         emphasis: {
    //           show: true,
    //           textStyle: {
    //             color: "#fff"
    //           }
    //         }
    //       },
    //       itemStyle: {
    //         normal: {
    //           areaColor: "rgba(24,65,91,1)",
    //           borderColor: "#9DDCEB",
    //           borderWidth: 3,
    //           shadowColor: "#9DDCEB",
    //           shadowBlur: 20
    //         },
    //         emphasis: {
    //           areaColor: "rgba(24,65,91,1)"
    //         }
    //       },
    //       symbolSize: 8,
    //       itemStyle: {
    //         normal: {
    //           color: "#389BB7"
    //         }
    //       },
    //       data: this.convertData(mapdata)
    //     }

    //     // {
    //     //   name: "销量", // series名称
    //     //   type: "scatter", // series图表类型
    //     //   coordinateSystem: "geo", // series坐标系类型
    //     //   data: this.convertData(mapdata),
    //     //   itemStyle: {
    //     //     normal: {
    //     //       color: "#66c2e0",
    //     //       borderColor: "#01bb1c"
    //     //       // label: {
    //     //       //   show: true,
    //     //       //   textStyle: {
    //     //       //     color: "#66c2e0"
    //     //       //   }
    //     //       // }
    //     //     },
    //     //     emphasis: { color: "rgba(128, 128, 128, 0.5)" },
    //     //     effect: {
    //     //       show: true,
    //     //       period: 6,
    //     //       trailLength: 0
    //     //     },
    //     //     lineStyle: {
    //     //       normal: {
    //     //         color: "#389BB7",
    //     //         width: 1,
    //     //         opacity: 0.4,
    //     //         curveness: 0.2
    //     //       }
    //     //     }
    //     //   }
    //     // }
    //   ]
    // });

    // this.myChart.setOption({
    //   xAxis: {
    //     type: "category",
    //     boundaryGap: false,
    //     data: date
    //   },
    //   yAxis: {
    //     boundaryGap: [0, "50%"],
    //     type: "value"
    //   },
    //   series: [
    //     {
    //       name: "成交",
    //       type: "line",
    //       smooth: true,
    //       symbol: "none",
    //       stack: "a",
    //       areaStyle: {
    //         normal: {}
    //       },
    //       data: data
    //     }
    //   ]
    // });
    // setInterval(() => {
    //   addData(true);
    //   this.myChart.setOption({
    //     xAxis: {
    //       data: date
    //     },
    //     series: [
    //       {
    //         name: "成交",
    //         data: data
    //       }
    //     ]
    //   });
    // }, 500);
    this.myChart1.setOption({
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["拒绝率", "算力"],
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
          }
        },
      ],
      series: [
        {
          name: "拒绝率",
          type: "line",
          data: [11, 11, 15, 13, 12, 13, 10],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          },
          color: ["#66c2e0"]
        },
        {
          name: "算力",
          type: "line",
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          },
          color: ["#01bb1c"]
        }
      ]
    });
    this.myChart2.setOption({
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["拒绝率", "算力"],
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
          }
        },
        
      ],
      series: [
        {
          name: "拒绝率",
          type: "line",
          data: [11, 11, 15, 13, 12, 13, 10],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          },
          color: ["#66c2e0"]
        },
        {
          name: "算力",
          type: "line",
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          },
          color: ["#01bb1c"]
        }
      ]
    });
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
  methods: {
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
    _init() {
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
      httpStaFindMarkDo(1).then(res => {
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
          console.log(scroe[0].index, scroe[1].index, scroe[2].index);
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
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
      httpGETpoolstatsmerge().then(res => {
        console.log(res.data);
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
      this.draw("dashboard-progress-2", 200, "#FFFF00");
      this.draw("dashboard-progress-3", 200, "#D2D2D2");

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
      console.log(res);
      return res;
    }
  },
  components: {
    "v-line": line
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
  background: url("../../assets/bg2.jpg");
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
        #3e76eb,
        #24abd6,
        #62bee0
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
        #3e76eb,
        #24abd6,
        #62bee0
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
            #3e76eb,
            #24abd6,
            #62bee0
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
          #3e76eb,
          #24abd6,
          #62bee0
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
          background: #000;
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


