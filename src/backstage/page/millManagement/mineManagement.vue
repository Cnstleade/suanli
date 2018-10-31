<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="矿场管理"
              :closable="false"
            type="success">
            </el-alert>           
        </el-row>
        <el-row class="mt-4 d-flex flex-row flex-nowrap justify-content-end">
            <div style="flex-grow:1" >
                <el-button  icon="el-icon-plus" @click="handleAdd" type="primary">新增</el-button>
            </div>             
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
        <el-table
            :data="tableData"  
            border  
            ref="multipleTable" 
            tooltip-effect="dark"
            highlight-current-row 
            style="width: 100%;font-weight:bold"
            class="mt-3"
            v-loading="loading">
            <el-table-column prop="id" label="ID" align="center" width="50"></el-table-column>
            <el-table-column prop="name" label="品牌名称" align="center" min-width="100"></el-table-column>
            <el-table-column prop="electricityFees" label="电费" align="center" min-width="100"></el-table-column>
            <el-table-column prop="adress" label="地址" align="center" min-width="100"></el-table-column>
            <el-table-column prop="positionFrees" label="机位费" align="center" min-width="100"></el-table-column>            
            <el-table-column prop="addTime" label="添加时间" align="center" width="160">
                <template slot-scope="scope">
                    {{scope.row.addTime|dateServer}}
                </template>  
            </el-table-column>
            <el-table-column prop="addUserName" label="添加者" align="center"></el-table-column>
            <el-table-column prop="administratorName" label="管理员" align="center"></el-table-column>
            <el-table-column label="操作" align="center" min-width="150">
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
            title="编辑矿场" 
            :visible.sync="dialogFormEditVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm" ref="editForm" :rules="rules" >
            <el-form-item label="品牌名称" label-width="100px">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电费" label-width="100px">
              <el-input v-model="editForm.electricityFees" autocomplete="off"></el-input>
            </el-form-item>            
            <el-form-item label="地址" label-width="100px">
              <el-input v-model="editForm.adress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="机位费" label-width="100px">
              <el-input v-model="editForm.positionFrees" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="管理员" label-width="100px">
              <el-input v-model="editForm.administratorName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-dialog> 
        <el-dialog 
            title="新增矿场" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
          <el-form :model="addForm" ref="addForm" :rules="rules" >
            <el-form-item label="品牌名称" label-width="100px">
              <el-input v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电费" label-width="100px">
              <el-input v-model="addForm.electricityFees" autocomplete="off"></el-input>
            </el-form-item>            
            <el-form-item label="地址" label-width="100px">
              <el-input v-model="addForm.adress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="机位费" label-width="100px">
              <el-input v-model="addForm.positionFrees" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="管理员" label-width="100px">
              <el-input v-model="addForm.administratorName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
          </div>
        </el-dialog>                
    </div> 
</template>
<script>
import {
  httpSysMinerslist,
  httpSysUpdateminers,
  httpSysAddminers
} from "@/service/http";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: {},
      loading: false,
      tableData: [],
      npage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      formInline: {},
      editForm: {},
      addForm: {},
      dialogFormEditVisible: false,
      dialogFormAddVisible: false,
      rules: {}
    };
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "loginId"
      // ...
    ])
  },
  methods: {
    handleSearch() {},
    submitForm() {},
    changeDialog() {},
    handleEdit(index, row) {
      this.editForm = JSON.parse(JSON.stringify(row));
      this.dialogFormEditVisible = true;
    },
    handleAdd() {
      this.dialogFormAddVisible = true;
    },
    handleDelete(index, row) {},
    onSubmit() {},

    /* 后台管理模块 / 矿场列表展示 */
    gethttpSysMinerslist(npage, pagesize, begainTimeString, endTimeString) {
      this.loading = true;
      httpSysMinerslist(npage, pagesize, begainTimeString, endTimeString).then(
        res => {
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
        }
      );
    },
    /* 后台管理模块 / 新增矿场 */
    handleAddForm(
      name,
      electricityFees,
      adress,
      positionFrees,
      addUserName,
      loginId
    ) {
      httpSysAddminers(
        name,
        electricityFees,
        adress,
        positionFrees,
        addUserName,
        loginId
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.handleSearch(false);
          this.dialogFormAddVisible = false;
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    /* 后台管理模块 / 修改矿场 */
    handleEditForm(
      name,
      electricityFees,
      adress,
      positionFrees,
      addUserName,
      loginId,
      id
    ) {
      httpSysUpdateminers(
        name,
        electricityFees,
        adress,
        positionFrees,
        addUserName,
        loginId,
        id
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.handleSearch(false);
          this.dialogFormEditVisible = false;
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "addForm") {
            this.handleAddForm(
              this.addForm.name,
              this.addForm.electricityFees,
              this.addForm.adress,
              this.addForm.positionFrees,
              this.addForm.addUserName,
              this.loginId
            );
          }
          if (formName == "editForm") {
            this.handleEditForm(
              this.editForm.name,
              this.editForm.electricityFees,
              this.editForm.adress,
              this.editForm.positionFrees,
              this.editForm.addUserName,
              this.loginId,
              this.editForm.id
            );
          }
        } else {
          return false;
        }
      });
    },
    /*   重置 */
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
        this.gethttpSysMinerslist(
          this.npage,
          this.pagesize,
          this.formInline.time[0],
          this.formInline.time[1]
        );
      } else {
        this.gethttpSysMinerslist(this.npage, this.pagesize);
      }
    }
  },
  mounted() {
    this.gethttpSysMinerslist(this.npage, this.pagesize);
  }
};
</script>
<style lang="less" scoped>
</style>

