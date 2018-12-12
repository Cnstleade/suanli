<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="角色管理"
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
             <el-form-item  label-width="100px">
               <el-input v-model.number="formInline.rid"  placeholder="角色编号" ></el-input>
             </el-form-item> 
             <el-form-item  label-width="100px">
               <el-input v-model="formInline.rname" placeholder="角色名称"  ></el-input>
             </el-form-item>  
             <el-form-item  label-width="100px">
               <el-input v-model="formInline.jobTitle" placeholder="职位名称"  ></el-input>
             </el-form-item>                                        
              <el-form-item >
                  <el-date-picker
                      v-model="formInline.createtime"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
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
            <el-table-column prop="rid" label="编号" align="center" width="80"></el-table-column>
            <el-table-column prop="rname" label="角色名称" align="center" width="120"></el-table-column>
           <el-table-column prop="createtime" label="创建时间" align="center" width="160">
                <template slot-scope="scope">
                    {{scope.row.createtime|dateServer}}
                </template>                 
            </el-table-column> 
           <el-table-column prop="jobTitle" label="职位名称" align="center" min-width="150"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            <el-form-item label="排班编号" label-width="100px">
              <el-input v-model.number="editForm.rid" autocomplete="off" disabled></el-input>
            </el-form-item>              
            <el-form-item label="角色名称" label-width="100px" prop="rname">
              <el-input v-model.number="editForm.rname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="职位名称" label-width="100px" prop="jobTitle">
              <el-input v-model.number="editForm.jobTitle" autocomplete="off"></el-input>
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
          <el-form :model="addForm" ref="addForm" :rules="rules"  >
            <el-form-item label="角色名称" label-width="100px" prop="rname">
              <el-input v-model.number="addForm.rname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="职位名称" label-width="100px" prop="jobTitle">
              <el-input v-model.number="addForm.jobTitle" autocomplete="off"></el-input>
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
import { timeFormatD } from "@/config/time";
import {
  httpAdminFindRole,
  httpAdminSaveRole,
  httpAdminUpdateRole,
  httpAdminDeleteRole
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
      rules: {
        rname: [
          { required: true, message: "请输入角色名称", trigger: "change" }
        ],
        jobTitle: [
          { required: true, message: "请输入职位描述", trigger: "change" }
        ]
      },
      options: [
        {
          value: 1,
          label: "早班"
        },
        {
          value: 2,
          label: "中班"
        },
        {
          value: 3,
          label: "晚班"
        },
        {
          value: 4,
          label: "替班"
        },
        {
          value: 5,
          label: "常班"
        }
      ],
      states: [
        {
          value: 1,
          label: "工作中"
        },
        {
          value: 2,
          label: "休息中"
        },
        {
          value: 3,
          label: "请假中"
        },
        {
          value: 4,
          label: "旷工中"
        }
      ]
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
    changeDialog() {},
    handleEdit(index, row) {
      this.editForm = JSON.parse(JSON.stringify(row));
      this.editForm.sdate = timeFormatD(this.editForm.sdate);
      this.dialogFormEditVisible = true;
    },
    handleAdd() {
      this.addForm = {};
      this.dialogFormAddVisible = true;
    },
    /* 后台管理模块 /排班管理——根据排班表编号、值班员编号、工作班次类别或工作日期对排班记录进行分页查询 */
    _init(cp, pageSize, rid, rname, createtime, jobTitle) {
      this.loading = true;
      httpAdminFindRole(cp, pageSize, rid, rname, createtime, jobTitle).then(
        res => {
          let data = res.data;
          if (data.code == 200) {
            this.tableData = data.data.list;
            this.total = data.data.total;
            this.$message({
              message: "查询成功",
              type: "success"
            });
          } else {
            this.tableData = null;
            this.total = 0;
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
          this.loading = false;
        }
      );
    },
    /* 后台管理模块 / 新增排班记录 */
    handleAddForm(rname, jobTitle) {
      httpAdminSaveRole(rname, jobTitle).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.dialogFormAddVisible = false;
          setTimeout(() => {
            this.reset();
          }, 500);
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    /* 后台管理模块 / 修改矿场 */
    handleEditForm(rid, rname, jobTitle) {
      httpAdminUpdateRole(rid, rname, jobTitle).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.handleSearch(false);
          this.dialogFormEditVisible = false;
          setTimeout(() => {
            this.handleSearch(false);
          }, 500);
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    /* —根据排班表编号删除对应记录 */
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该值班员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this._httpAdminDeleteRole(row.rid);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _httpAdminDeleteRole(rid) {
      httpAdminDeleteRole(rid).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          setTimeout(() => {
            this.handleSearch(false);
          }, 500);
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
            this.handleAddForm(this.addForm.rname, this.addForm.jobTitle);
          }
          if (formName == "editForm") {
            this.handleEditForm(
              this.editForm.rid,
              this.editForm.rname,
              this.editForm.jobTitle
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
        this._init(
          this.npage,
          this.pagesize,
          this.formInline.rid,
          this.formInline.rname,
          this.formInline.createtime,
          this.formInline.jobTitle
        );      

    }
  },
  mounted() {
    this._init(this.npage, this.pagesize);
  }
};
</script>
<style lang="less" scoped>
</style>

