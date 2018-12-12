<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="班次管理"
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
                <el-select v-model="formInline.rid" placeholder="请选择角色">
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
            <!-- <el-table-column prop="remake" label="工单描述" align="center" width="200">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.remake" placement="top">
                      <span>{{scope.row.remake}}</span>
                  </el-tooltip>
              </template>                 
            </el-table-column> -->
            <el-table-column prop="wtCategory" label="班次类别" align="center" width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.wtCategory==1?'success':scope.row.wtCategory==2?'info':scope.row.wtCategory==3?'warning':scope.row.wtCategory==4?'danger':''">
                  {{scope.row.wtCategory==1?'早班':scope.row.wtCategory==2?'中班':scope.row.wtCategory==3?'晚班':scope.row.wtCategory==4?'替班':scope.row.wtCategory==5?'常班':''}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="wtStartTime" label="班次开始时间" align="center" min-width="160">
            </el-table-column>            
            <el-table-column prop="wtEndTime" label="班次开始时间" align="center" min-width="160">
              <!-- <template slot-scope="scope">
                {{scope.row.wtStartTime|dateServer}}
              </template>                 -->
            </el-table-column>
            <!-- <el-table-column prop="wtEndTime" label="班次结束时间" align="center" min-width="160">
              <template slot-scope="scope">
                {{scope.row.wtEndTime|minServer}}
              </template>                    
            </el-table-column> -->
            <el-table-column prop="rid" label="角色编号" align="center" min-width="140">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.rid==1?'success':scope.row.rid==2?'info':''">
                  {{scope.row.rid==1?'后台管理人员':scope.row.rid==2?'维修人员':''}}
                </el-tag>
              </template>              
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="220" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">更新</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>                  
              </template>
            </el-table-column>            
        </el-table>   
        <el-dialog 
            title="班次更新" 
            :visible.sync="dialogFormEditVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm" ref="editForm" :rules="rules" >
            <el-form-item label="班次编号" label-width="100px">
              <el-input v-model="editForm.wtId" autocomplete="off"  disabled></el-input>
            </el-form-item>
            <el-form-item label="开始时间" label-width="100px" >
                <el-time-picker
                  v-model="editForm.wtStartTime"
                    value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>              
            </el-form-item> 
            <el-form-item label="结束时间" label-width="100px" >
                <el-time-picker
                  v-model="editForm.wtEndTime"
                    value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>              
            </el-form-item>                        
            <el-form-item label="班次类别" label-width="100px">
                <el-select v-model="editForm.wtCategory" placeholder="请选择角色" @change="changeRid">
                <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>                                                     
                </el-select>
            </el-form-item>
            <!-- <template v-if="editFormAdd">
              <el-form-item label="班次编号" label-width="100px">
                <el-input v-model.number="editForm.wtId2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="班次时间" label-width="100px" >
                  <el-time-picker
                    is-range
                    v-model="editForm.time2"
                     value-format="HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
              </el-form-item>                
            </template> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-dialog>   
        <el-dialog 
            title="班次新增" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
          <el-form :model="addForm" ref="addForm" :rules="rules" >
            <!-- <el-form-item label="班次编号" label-width="100px">
              <el-input v-model="addForm.wtId" autocomplete="off"  disabled></el-input>
            </el-form-item> -->
            <el-form-item label="班次时间" label-width="100px" prop="faultType">
                <el-time-picker
                  is-range
                  v-model="addForm.time1"
                  value-format="HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>            
            <el-form-item label="班次类别" label-width="100px">
                <el-select v-model="addForm.wtCategory" placeholder="请选择班次类别" @change="changeRid">
                <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>                                                     
                </el-select>
            </el-form-item>
              <el-form-item label="角色编号" label-width="100px">
                <el-select v-model="addForm.rid" placeholder="请选择角色" @change="changeRid">
                   <el-option v-for="item in rids" :key="item.value" :value="item.value" :label="item.label"></el-option>                                                     
                </el-select>
              </el-form-item>            
            <!-- <template v-if="editFormAdd">
              <el-form-item label="班次编号" label-width="100px">
                <el-input v-model.number="editForm.wtId2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="班次时间" label-width="100px" >
                  <el-time-picker
                    is-range
                    v-model="editForm.time2"
                     value-format="HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
              </el-form-item>                
            </template> -->
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
  httpScheduleWorktime,
  httpscheduleUpdate_time,
  httpScheduleSave_time,
  httpScheduleDelete_time
} from "@/service/http";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      formInline: {},
      editForm: {},
      addForm: { time1: [] },
      dialogFormEditVisible: false,
      dialogFormAddVisible: false,
      rules: {},
      editFormAdd: false,
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
      rids: [
        {
          value: 1,
          label: "后台管理人员"
        },
        {
          value: 2,
          label: "维修人员"
        },
      ],      
    };
  },
  mounted() {
    this._init();
  },
  methods: {
    //获得所有排班表
    _init(rid) {
      this.loading = true;
      httpScheduleWorktime(rid).then(res => {
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
    },
    /*     重置选择 */
    reset() {
      this.formInline = {};
      this.handleSearch();
    },
    /* 按条件搜索 */
    handleSearch(type = true) {
      this._init(this.formInline.rid);
    },
    /* 更新 */
    handleEdit(index, row) {
      this.editForm = JSON.parse(JSON.stringify(row));
      console.log(this.editForm);

      this.dialogFormEditVisible = true;
    },
    _httpscheduleUpdate_time(wtId, wtStartTime, wtEndTime, wtCategory, rid) {
      httpscheduleUpdate_time(
        wtId,
        wtStartTime,
        wtEndTime,
        wtCategory,
        rid
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.tableData = data.data;
          this.$message({
            message: data.msg,
            type: "success"
          });
          setTimeout(() => {
            this.dialogFormEditVisible = false;
            this.reset();
          }, 200);
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
          if (formName == "editForm") {
            this._httpscheduleUpdate_time(
              this.editForm.wtId,
              this.editForm.wtStartTime,
              this.editForm.wtEndTime,
              this.editForm.wtCategory,
              this.editForm.rid
            );
          }
          if (formName == "addForm") {
            this._httpScheduleSave_time(
              this.addForm.wtCategory,
              this.addForm.time1[0],
              this.addForm.time1[1],
              this.addForm.rid
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /*   改变班次 */
    changeRid(val) {
      if (val == 4) {
        this.editFormAdd = true;
      } else {
        this.editFormAdd = false;
      }
    },
    /*     新增班次 */
    handleAdd() {
      this.addForm = {};
      this.dialogFormAddVisible = true;
    },
    _httpScheduleSave_time(wtCategory, wtStartTime, wtEndTime, rid) {
      httpScheduleSave_time(wtCategory, wtStartTime, wtEndTime, rid).then(
        res => {
          let data = res.data;
          if (data.code == 200) {
            this.tableData = data.data;
            this.$message({
              message: data.msg,
              type: "success"
            });
            setTimeout(() => {
              this.dialogFormAddVisible = false;
              this.reset();
            }, 200);
          } else {
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        }
      );
    },
    /*  删除班次 */
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该班次, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this._httpScheduleDelete_time(row.wtId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _httpScheduleDelete_time(wtId) {
      httpScheduleDelete_time(wtId).then(res => {
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
    }
  }
};
</script>

<style lang="less" scoped>
</style>
