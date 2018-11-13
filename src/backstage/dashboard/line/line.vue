

<template>
<div class="line">
  <!-- <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter> -->
  <div class="main"></div>
</div>

</template>

<script>
import echarts from "echarts";
import header from "@/backstage/common/Eheader";
import filter from "@/backstage/common/filter";
import { timeFormat } from "@/config/time";
import {
  httpGETpoolstatsmerge,
  httpStaFindMarkDo,
  httpStaFind
} from "@/service/http";

export default {
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: "折线图",
      day30: [],
      day24: [],
      timer1: null
    };
  },
  methods: {
    _init() {
      this.legendArr = this.myChart.getOption().series;
      this.legendArr.forEach(data => {
        data.selected = true;
      });
      this.$root.charts.push(this.myChart);
      window.addEventListener(
        "resize",
        function() {
          this.myChart.resize();
        }.bind(this)
      );
    },
    go() {}
  },
  components: {
    "v-header": header,
    "v-filter": filter
  },
  mounted() {
    this.go();
    httpStaFindMarkDo(1).then(res => {
      let data = res.data;
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
        that.myChart = echarts.init(document.querySelector(".line .main"));
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
              color: "red",
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
              }
            },
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
            }
          ],
          series: [
            {
              name: "算力",
              type: "line",
              data: x1,
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
              name: "拒绝率",
              type: "line",
              yAxisIndex: 1,
              data: x2,
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
                // data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
              },
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              },
              color: ["#01bb1c"]
            }
          ]
        });
      }
      var times = 0;
      clearInterval(this.timer1);
      this.timer1 = setInterval(() => {
        times += 1;
        if (times == this.day30.length) {
          times = 0;
        }
        addTimes(times, this.day30);
      }, 500);
    });

    // this.myChart.setOption({
    //   title: {
    //     show: false
    //   },
    //   tooltip: {
    //     trigger: "axis"
    //   },
    //   legend: {
    //     show: false
    //   },
    //   toolbox: {
    //     show: false
    //   },
    //   color: this.color,
    //   calculable: true,
    //   xAxis: [
    //     {
    //       name: "产品",
    //       type: "category",
    //       axisLine: {
    //         show: false
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       nameTextStyle: {
    //         color: "rgba(255, 255, 255, 0.69)"
    //       },
    //       axisLabel: {
    //         textStyle: {
    //           color: "white"
    //         }
    //       },
    //       data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    //     }
    //   ],
    //   yAxis: [
    //     {
    //       axisLine: {
    //         show: false
    //       },
    //       nameLocation: "end",
    //       nameGap: 20,
    //       nameRotate: 0,
    //       axisTick: {
    //         show: false
    //       },
    //       splitLine: {
    //         lineStyle: {
    //           color: ["rgba(230, 230, 230, 0.2)"]
    //         }
    //       },
    //       axisLabel: {
    //         textStyle: {
    //           color: "white",
    //           fontSize: 14
    //         }
    //       },
    //       name: "数量",
    //       type: "value",
    //       nameTextStyle: {
    //         color: "rgba(255, 255, 255, 0.69)"
    //       }
    //     }
    //   ],
    //   series: [
    //     {
    //       name: "标签1",
    //       type: "line",
    //       stack: "总量",
    //       data: [120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name: "标签2",
    //       type: "line",
    //       stack: "总量",
    //       data: [220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //       name: "标签3",
    //       type: "line",
    //       stack: "总量",
    //       data: [150, 232, 201, 154, 190, 330, 410]
    //     },
    //     {
    //       name: "标签4",
    //       type: "line",
    //       stack: "总量",
    //       data: [320, 332, 301, 334, 390, 330, 320]
    //     },
    //     {
    //       name: "标签5",
    //       type: "line",
    //       stack: "总量",
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     }
    //   ]
    // });
    this._init();
  },
  destroyed() {
    clearInterval(this.timer1);
  }
};
</script>

<style lang="less" scoped>
.line {
  height: 1000px;
  background: url("../../../assets/bg.jpg") no-repeat;
  background-size: 100% 100%;

  .main {
    width: 100%;
    height: calc(100% - 100px);
    margin-top: -15px;
  }
}
</style>