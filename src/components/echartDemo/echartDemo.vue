<template>
  <div class="charts" >
    <div id="myChart" ></div>
  </div>
</template>
<script>
import { getPrice } from "../../service/jsonp";
export default {
  data() {
    return {};
  },
  methods: {
    // 基于准备好的dom，初始化echarts实例
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let chartBox = document.getElementsByClassName("charts")[0];
      let myChart = document.getElementById("myChart");
      function resizeCharts() {
        myChart.style.height = chartBox.clientHeight + "px";
        myChart.style.width = chartBox.clientWidth + "px";
      }
      console.log(chartBox.clientHeight, chartBox.clientWidth);
      resizeCharts();
      let mainChart = this.$echarts.init(myChart);
      mainChart.setOption({
        // title: {
        //   text: "堆叠区域图"
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["比特币走势图", "以太坊走势图"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        // yAxis: [
        //   {
        //     type: "value"
        //   }
        // ],
        yAxis: [
          {
            name: "比特币(元/个)",
            type: "value",
            axisLabel: {
              formatter: "{value}℃"
            }
          },
          {
            name: "以太坊(元/个)",
            type: "value",

            min: 0,
            max: 100,
            axisLabel: {
              formatter: "{value}%"
            }
          }
        ],
        series: [
          {
            name: "比特币走势图",
            type: "line",
            stack: "总量",

            areaStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "red" },
                  { offset: 0.5, color: "pink" },
                  { offset: 1, color: "#ddd" }
                ])
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "以太坊走势图",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "red" },
                  { offset: 0.5, color: "pink" },
                  { offset: 1, color: "#ddd" }
                ])
              }
            },
            color: "yellow",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  }
};
</script>
<style lang="less" scoped>
.charts {
  height: 100%;
}
@media screen and (max-width: 720px) {
  .d-img-xs {
    display: block;
  }
  .d-img-md {
    display: none;
  }
  .slider .new-server {
    left: 0px;
    top: 10px;
  }
}
@media screen and (min-width: 721px) {
  .d-img-md {
    display: block;
  }
  .d-img-xs {
    display: none;
  }
  .new-server {
    display: block;
  }
}
</style>

