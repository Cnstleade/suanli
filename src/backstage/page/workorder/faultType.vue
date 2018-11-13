<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="故障类型"
              :closable="false"
            type="success">
            </el-alert>           
        </el-row>  
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
            highlight-current-row 
            style="width: 100%;font-weight:bold"
            class="mt-3"
            id="darkCell"
            v-loading="loading">
 
            <el-table-column prop="detailTimeMinuteAvg" label="处理平均时长分钟" align="center" min-width="90"></el-table-column>
            <el-table-column prop="faultTypeDesc" label="故障类型描述" align="center" min-width="200">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.faultTypeDesc" placement="top">
                      <span>{{scope.row.faultTypeDesc}}</span>
                  </el-tooltip>
              </template>                 
            </el-table-column>
        </el-table>          
    </div>
</template>
<script>
import { httpStaVariousFaultCount } from "@/service/http";
export default {
  data() {
    return {
      tableData: [],
      loading: false
    };
  },
  mounted() {
    this._init();
  },
  methods: {
    _init() {
      httpStaVariousFaultCount().then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.tableData = data.data;
          this.$message({
            message: "查询成功",
            type: "success"
          });
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
<style>
#darkCell .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
