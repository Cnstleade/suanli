<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="排班管理"
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
               <el-input v-model.number="formInline.sid"  placeholder="请选择排班表编号" ></el-input>
             </el-form-item> 
             <el-form-item  label-width="100px">
               <el-input v-model.number="formInline.rotaId" placeholder="请选择值班员编号编号"  ></el-input>
             </el-form-item>                           
              <el-form-item>
                <el-select v-model="formInline.wtCategory" placeholder="请选择班次类别" >
                    <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>                  
             </el-form-item>              
              <el-form-item >
                  <el-date-picker
                      v-model="formInline.time"
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
            <el-table-column prop="sid" label="编号" align="center" width="80"></el-table-column>
            <el-table-column prop="rotaId" label="值班员表编号" align="center" min-width="100"></el-table-column>
            <el-table-column prop="rotaNum" label="值班员工号" align="center" min-width="100"></el-table-column>
            <el-table-column prop="rid" label="角色编号" align="center" min-width="100"></el-table-column>
            <el-table-column prop="jobTitle" label="角色职位名称" align="center" min-width="100"></el-table-column>            
            <el-table-column prop="rotaName" label="值班员名称" align="center" min-width="100"></el-table-column>            
            <el-table-column prop="rotaPhone" label="值班员联系方式" align="center" min-width="100"></el-table-column>            
            <el-table-column prop="rotaDepartment" label="值班员所属部门" align="center" min-width="100"></el-table-column>            
            <el-table-column prop="mid" label="负责矿场的编号" align="center" min-width="100"></el-table-column>            
            <el-table-column prop="wtCategory" label="班次类别" align="center" width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.wtCategory==1?'success':scope.row.wtCategory==2?'info':scope.row.wtCategory==3?'warning':scope.row.wtCategory==4?'danger':''">
                  {{scope.row.wtCategory==1?'早班':scope.row.wtCategory==2?'中班':scope.row.wtCategory==3?'晚班':scope.row.wtCategory==4?'替班':''}}
                </el-tag>
              </template>
            </el-table-column> 
            <el-table-column prop="wtCategory" label="工作状态" align="center" width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.state==1?'success':scope.row.state==2?'info':scope.row.state==3?'warning':scope.row.state==4?'danger':''">
                  {{scope.row.state==1?'工作中':scope.row.state==2?'休息中':scope.row.state==3?'请假中':scope.row.state==4?'矿工中':''}}
                </el-tag>
              </template>
            </el-table-column>               
            <el-table-column prop="wtStartTime" label="班次开始时间" align="center" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.wtStartTime|minServer}}
                </template>                 
            </el-table-column>            
            <el-table-column prop="wtEndTime" label="班次结束时间" align="center" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.wtEndTime|minServer}}
                </template>                 
            </el-table-column>            
            <el-table-column prop="sdate" label="工作日期" align="center" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.sdate|yearServer}}
                </template>  
            </el-table-column>            
                  
            <!-- <el-table-column prop="addTime" label="添加时间" align="center" width="160">
                <template slot-scope="scope">
                    {{scope.row.addTime|dateServer}}
                </template>  
            </el-table-column>
            <el-table-column prop="addUserName" label="添加者" align="center"></el-table-column>
            <el-table-column prop="administratorName" label="管理员" align="center"></el-table-column> -->
            <el-table-column label="操作" align="center" min-width="150">
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
              <el-input v-model.number="editForm.sid" autocomplete="off" disabled></el-input>
            </el-form-item>              
            <el-form-item label="值班员编号" label-width="100px">
              <el-input v-model.number="editForm.rotaId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班次类别" label-width="100px">
                <el-select v-model="editForm.wtCategory" placeholder="请选择班次类别" >
                    <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作状态" label-width="100px">
                <el-select v-model="editForm.state" placeholder="请选择工作状态" >
                    <el-option v-for="item in states" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>             
            <el-form-item  label="工作日期" label-width="100px">
                  <el-date-picker
                      v-model="editForm.sdate"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
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
            <el-form-item label="值班员编号" label-width="100px">
              <el-input v-model.number="addForm.rotaId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班次类别" label-width="100px">
                <el-select v-model="addForm.wtCategory" placeholder="请选择班次类别" >
                    <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作状态" label-width="100px">
                <el-select v-model="addForm.state" placeholder="请选择工作状态" >
                    <el-option v-for="item in states" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>            
            <el-form-item  label="工作日期" label-width="100px">
                  <el-date-picker
                      v-model="addForm.sdate"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
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
  httpscheduleFind_scheduling,
  httpscheduleSave_scheduling,
  httpscheduleUpdate_scheduling,
  httpscheduleDelete_scheduling,
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
      rules: {},
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
    _init(cp, pageSize, sid, rotaId, wtCategory, sdate) {
      this.loading = true;
      httpscheduleFind_scheduling(
        cp,
        pageSize,
        sid,
        rotaId,
        wtCategory,
        sdate
      ).then(res => {
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
      });
    },
    /* 后台管理模块 / 新增排班记录 */
    handleAddForm(rotaId, wtCategory, sdate, state) {
      httpscheduleSave_scheduling(rotaId, wtCategory, sdate, state).then(
        res => {
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
        }
      );
    },
    /* 后台管理模块 / 修改矿场 */
    handleEditForm(sid, rotaId, wtCategory, sdate, state) {
      httpscheduleUpdate_scheduling(sid, rotaId, wtCategory, sdate, state).then(
        res => {
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
        }
      );
    },
    /* —根据排班表编号删除对应记录 */
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该值班员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this._httpscheduleDelete_scheduling(row.sid);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _httpscheduleDelete_scheduling(sid) {
      httpscheduleDelete_scheduling(sid).then(res => {
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
            this.handleAddForm(
              this.addForm.rotaId,
              this.addForm.wtCategory,
              this.addForm.sdate,
              this.addForm.state
            );
          }
          if (formName == "editForm") {
            this.handleEditForm(
              this.editForm.sid,
              this.editForm.rotaId,
              this.editForm.wtCategory,
              this.editForm.sdate,
              this.editForm.state
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
      if (this.formInline.time) {
        this._init(
          this.npage,
          this.pagesize,
          this.formInline.sid,
          this.formInline.rotaId,
          this.formInline.wtCategory,
          this.formInline.time
        );
      } else {
        this._init(
          this.npage,
          this.pagesize,
          this.formInline.sid,
          this.formInline.rotaId,
          this.formInline.wtCategory,
          this.formInline.time
        );
      }
    }
  },
  mounted() {
    this._init(this.npage, this.pagesize);
  }
};
</script>
<style lang="less" scoped>
</style>

