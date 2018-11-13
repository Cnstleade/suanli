<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="值班人员回单及时率"
              :closable="false"
            type="success">
            </el-alert>           
        </el-row>  
        <el-row class="mt-4 d-flex flex-row flex-nowrap justify-content-end">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                  <el-button type="success" @click="reset">重置</el-button>
              </el-form-item>  
              <el-form-item >
                <el-date-picker
                style="width:400px"
                      v-model="formInline.time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                </el-date-picker> 
              </el-form-item>   
              <el-form-item>
              <el-button @click="handleSearch" class="mr-4"  icon="el-icon-search"  type="success" circle></el-button>
              </el-form-item>                                           
            </el-form>   
        </el-row>   
        <div class="echart echart1">
        </div>              
    </div>
</template>
<script>
import echarts from "echarts";
import { httpfindRepairmanRate } from "@/service/http";
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      formInline: {}
    };
  },
  mounted() {
    this._init();
  },
  methods: {
    /*     统计管理——值班人员回单及时率 */
    _init(startTime, endTime) {
      httpfindRepairmanRate(startTime, endTime).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.tableData = data.data;
          this.$message({
            message: "查询成功",
            type: "success"
          });
          // 基于准备好的dom，初始化echarts实例
          this.myChart = echarts.init(document.querySelector(".echart1"));
            this.myChart.setOption({
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
                data: ["接单及时率", "反馈及时率","回单及时率"],
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
                  data: data.data.listString,
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
                  name: "(及时率)",
                  nameTextStyle: {
                    color: "#66c2e0"
                  },
                  splitLine: {
                    show: false
                  }
                },
              ],
              series: [
                {
                  name: "接单及时率",
                  type: "line",
                  data: data.data.listOrderSum,
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
                  name: "反馈及时率",

                  type: "line",
                  // scale: true,

                  data: data.data.listReceipt,
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
                },
                {
                  name: "回单及时率",

                  type: "line",
                  // scale: true,

                  data: data.data.listFeedBackSum,
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
                  color: ["#e4393c"]
                }
              ]
            });
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
        this.loading = false;
      });
    },
    /*     重置选择 */
    reset() {
      this.formInline = {};
      this.handleSearch();
    },
    /* 按条件搜索 */
    handleSearch(type = true) {
      if (type) {
        this.npage = 1;
        this.pagesize = 10;
      }
      if (this.formInline.time && this.formInline.time.length) {
        this._init(this.formInline.time[0], this.formInline.time[1]);
      } else {
        this._init();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.echart {
  padding: 0px;
  margin: 10px 0;
  height: 500px;
}
</style>
<style>
#darkCell .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
