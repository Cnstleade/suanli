<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="值班日志管理"
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
                <el-select v-model="formInline.mid" placeholder="矿场编号">
                  <el-option
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
                  </el-option>                                    
                </el-select>                
              </el-form-item> 
              <el-form-item>
                <el-button @click="handleSearch" class="mr-4"  icon="el-icon-search"  type="success" circle></el-button>
              </el-form-item>                                         
            </el-form>            
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
            <el-table-column prop="wtId" label="班次编号" align="center" width="90"></el-table-column>
            <el-table-column prop="wtCategory" label="班次类别" align="center" width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.wtCategory==1?'success':scope.row.wtCategory==2?'info':scope.row.wtCategory==3?'warning':scope.row.wtCategory==4?'danger':''">
                  {{scope.row.wtCategory==1?'早班':scope.row.wtCategory==2?'中班':scope.row.wtCategory==3?'晚班':scope.row.wtCategory==4?'替班':''}}
                </el-tag>
              </template>
            </el-table-column>
            
            <el-table-column prop="wtStartTime" label="班次开始时间" align="center" min-width="160">
              <template slot-scope="scope">
                {{scope.row.wtStartTime|minServer}}
              </template>                
            </el-table-column>
            <el-table-column prop="wtEndTime" label="班次结束时间" align="center" min-width="160">
              <template slot-scope="scope">
                {{scope.row.wtEndTime|minServer}}
              </template>                    
            </el-table-column>
            <el-table-column prop="rid" label="角色编号" align="center" min-width="140"></el-table-column>
            <el-table-column label="操作" align="center" min-width="220" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">更新</el-button>
              </template>
            </el-table-column>            
        </el-table>               
    </div>
</template>
<script>
import { httpscheduleAll_rota } from "@/service/http";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      npage: 1,
      pagesize: 10,
      total: 0,
      formInline: {}
    };
  },
  mounted() {
    this._init(this.npage, this.pagesize);
  },
  methods: {
    /*       初始查询 */
    _init(cp, pageSize, mid) {
      this.loading = true;
      httpscheduleAll_rota(cp, pageSize, mid).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.tableData = data.data.list;
          this.total = data.data.total;
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
    }
  }
};
</script>
<style lang="less" scoped>
</style>
