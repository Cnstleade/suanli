
<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="订单收益管理"
              :closable="false"
            type="success">
            </el-alert>           
        </el-row>
        <el-row class="mt-4 d-flex flex-row flex-nowrap justify-content-end">
            <div style="flex-grow:1" >
                <!-- <el-button  icon="el-icon-plus" @click="handleAdd" type="primary">新增</el-button> -->
            </div>             
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                  <el-button type="success" @click="reset">重置</el-button>
              </el-form-item>
              <el-form-item >
                <el-input v-model="formInline.orderNumString" placeholder="订单编号"></el-input>
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
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
            highlight-current-row 
            style="width: 100%;font-weight:bold"
            class="mt-3"
            v-loading="loading">
            <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
            <el-table-column prop="income" label="收入" align="center">
                <template slot-scope="scope">
                    {{(scope.row.income/100000000).toFixed(8)}}                    
                </template>              
            </el-table-column>
            <el-table-column prop="custUserId" label="用户ID" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime|dateServer}}
                </template>   
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type==1?'success':'danger'">
                  {{scope.row.type==1?'正常':scope.row.type==0?'未结算':''}}
                </el-tag>                    
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="150" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
              </template>
            </el-table-column>            
        </el-table>
        <el-row class="mt-4" v-if="total>0">
             <div style="float:right">
                 <el-pagination
                   @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                   :current-page="npage"
                    :page-sizes="[10, 20, 50, 100, 1000,990000]"
                     :page-size="pagesize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="total">
                 </el-pagination>   
             </div>
        </el-row>          
        <el-dialog 
            title="编辑矿机收益" 
            :visible.sync="dialogFormEditVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm">
            <el-form-item label="名称" label-width="100px">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" label-width="100px">
              <el-select v-model="editForm.region" placeholder="请选择备注">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormEditVisible = false">确 定</el-button>
          </div>
        </el-dialog> 
        <el-dialog 
            title="新增矿机收益" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
          <el-form :model="addForm">
            <el-form-item label="名称" label-width="100px">
              <el-input v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" label-width="100px">
              <el-select v-model="addForm.region" placeholder="请选择备注">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormAddVisible = false">确 定</el-button>
          </div>
        </el-dialog>                
    </div> 
</template>
<script>
import { httpIncomeAllorder } from "@/service/http";
export default {
  data() {
    return {
      search: {},
      loading: false,
      tableData: [{ PROFITUID: 1, TYPE: 1 }, { PROFITUID: 2, TYPE: 2 }],
      npage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      formInline: {},
      editForm: {},
      addForm: {},
      dialogFormEditVisible: false,
      dialogFormAddVisible: false
    };
  },
  methods: {
    submitForm() {},
    changeDialog() {},
    handleEdit(index, row) {
      this.dialogFormEditVisible = true;
    },
    handleAdd() {
      this.dialogFormAddVisible = true;
    },
    handleDelete(index, row) {},
    onSubmit() {},
    /*     重置选择 */
    reset() {
      this.formInline = {};
      this.handleSearch();
    },
    /*   选取第几页 */
    handleCurrentChange(val) {
      this.npage = val;
      this.handleSearch(false);
    },
    /* 选取页数 */
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleSearch(false);
    },
    /* 按条件搜索 */
    handleSearch(type = true) {
      if (type) {
        this.npage = 1;
        this.pagesize = 10;
      }
      if (this.formInline.time && this.formInline.time.length) {
        this.gethttpIncomeAllorder(
          this.npage,
          this.pagesize,
          this.formInline.orderNumString,
          this.formInline.time[0],
          this.formInline.time[1]
        );
      } else {
        this.gethttpIncomeAllorder(
          this.npage,
          this.pagesize,
          this.formInline.orderNumString
        );
      }
    },
    /* 后台管理模块 / 矿池列表展示 */
    gethttpIncomeAllorder(
      npage,
      pagesize,
      orderNumString,
      begainTimeString,
      endTimeString
    ) {
      this.loading = true;
      httpIncomeAllorder(
        npage,
        pagesize,
        orderNumString,
        begainTimeString,
        endTimeString
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.tableData = data.data.list;
          this.total = data.data.allPageNumber;
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
  },
  mounted() {
    this.gethttpIncomeAllorder(this.npage, this.pagesize);
  }
};
</script>
<style lang="less" scoped>
</style>

