<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="值班员管理"
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
                    label="维修人员"
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
            <el-table-column prop="rotaId" label="编号" align="center" ></el-table-column>
            <el-table-column prop="rotaNum" label="工号" align="center"></el-table-column>
            <el-table-column prop="rid" label="角色编号" align="center" ></el-table-column>
            <el-table-column prop="rotaName" label="名称" align="center" ></el-table-column>
            <el-table-column prop="rotaAge" label="年龄" align="center" ></el-table-column>
            <el-table-column prop="rotaSex" label="性别" align="center" ></el-table-column>
            <el-table-column prop="rotaPhone" label="联系方式" align="center" ></el-table-column>
            <el-table-column prop="rotaJoinWorkDate" label="参加工作的时间" align="center" >
              <template slot-scope="scope">
                {{scope.row.rotaJoinWorkDate|yearServer}}
              </template>               
            </el-table-column>
            <el-table-column prop="rotaWorkingLife" label="工作的年限" align="center" ></el-table-column>
            <el-table-column prop="rotaDepartment" label="值班员所属部门" align="center" ></el-table-column>
            <el-table-column prop="mid" label="负责矿场编号" align="center" ></el-table-column>
            <!-- <el-table-column prop="rotaJoinWorkDate" label="值班员参加工作的时间" align="center" ></el-table-column>
            <el-table-column prop="rotaJoinWorkDate" label="值班员参加工作的时间" align="center" ></el-table-column> -->
            <!-- <el-table-column prop="wtCategory" label="班次类别" align="center" width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.wtCategory==1?'success':scope.row.wtCategory==2?'info':scope.row.wtCategory==3?'warning':scope.row.wtCategory==4?'danger':''">
                  {{scope.row.wtCategory==1?'早班':scope.row.wtCategory==2?'中班':scope.row.wtCategory==3?'晚班':scope.row.wtCategory==4?'替班':''}}
                </el-tag>
              </template>
            </el-table-column> -->
            
            <!-- <el-table-column prop="wtStartTime" label="班次开始时间" align="center" min-width="160">
              <template slot-scope="scope">
                {{scope.row.wtStartTime|minServer}}
              </template>                
            </el-table-column> -->

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
        <el-row class="mt-4" v-if="total>0">
             <div style="float:right">
                 <el-pagination
                   @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                   :current-page="npage"
                    :page-sizes="[2,,3,5,10, 20, 50, 100, 1000,990000]"
                     :page-size="pagesize"
                   background
                   layout="total,sizes,prev, pager, next,jumper"
                   :total="total">
                 </el-pagination>   
             </div>
        </el-row>  
        <el-dialog 
            title="新增值班管理" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
          <el-form :model="addForm" ref="addForm" :rules="rules" >
            <el-form-item label="工号" label-width="100px" prop="rotaNum">
              <el-input v-model="addForm.rotaNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色编号" label-width="100px" prop="rid">
              <el-input v-model="addForm.rid" autocomplete="off"></el-input>
            </el-form-item>            
            <el-form-item label="名称" label-width="100px" prop="rotaName">
              <el-input v-model="addForm.rotaName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" label-width="100px"  prop="rotaAge">
              <el-input v-model.number="addForm.rotaAge" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="值班员性别" label-width="100px">
                  <el-switch v-model="addForm.rotaSex"
                    active-color="#13ce66"
                    inactive-color="#62bee0"
                    active-text="女"
                     inactive-text="男"                    
                  ></el-switch>              
            </el-form-item>
            <el-form-item label="联系方式" label-width="100px"  prop="rotaPhone">
              <el-input v-model="addForm.rotaPhone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="参加时间" label-width="100px" prop="rotaJoinWorkDate">
              <el-date-picker
                v-model="addForm.rotaJoinWorkDate"
                  value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="工作年限" label-width="100px">
              <el-input v-model="addForm.rotaWorkingLife" autocomplete="off"></el-input>
            </el-form-item>                        
            <el-form-item label="所属部门" label-width="100px" prop="rotaDepartment">
              <el-input v-model="addForm.rotaDepartment" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责矿场" label-width="100px"  prop="mid">
              <el-input v-model="addForm.mid" autocomplete="off"></el-input>
            </el-form-item>                        
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
          </div>
        </el-dialog>    
        <el-dialog 
            title="编辑值班员" 
            :visible.sync="dialogFormEditVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm" ref="editForm" :rules="rules" >
            <el-form-item label="工号" label-width="100px" prop="rotaNum">
              <el-input v-model="editForm.rotaNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色编号" label-width="100px" prop="rid">
              <el-input v-model="editForm.rid" autocomplete="off"></el-input>
            </el-form-item>            
            <el-form-item label="名称" label-width="100px" prop="rotaName">
              <el-input v-model="editForm.rotaName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" label-width="100px" prop="rotaAge">
              <el-input v-model.number="editForm.rotaAge" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="值班员性别" label-width="100px">
                  <el-switch v-model="editForm.rotaSex"
                    active-color="#13ce66"
                    inactive-color="#62bee0"
                    active-text="女"
                     inactive-text="男"                    
                  ></el-switch>              
            </el-form-item>
            <el-form-item label="联系方式" label-width="100px" prop="rotaPhone">
              <el-input v-model="editForm.rotaPhone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="参加时间" label-width="100px" prop="rotaJoinWorkDate">
              <el-date-picker
                v-model="editForm.rotaJoinWorkDate"
                  value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="工作年限" label-width="100px" >
              <el-input v-model="editForm.rotaWorkingLife" autocomplete="off"></el-input>
            </el-form-item>                        
            <el-form-item label="所属部门" label-width="100px"  prop="rotaDepartment">
              <el-input v-model="editForm.rotaDepartment" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责矿场" label-width="100px" prop="mid">
              <el-input v-model="editForm.mid" autocomplete="off"></el-input>
            </el-form-item>                        
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-dialog>                                  
    </div>
</template>
<script>
import {
  httpscheduleAll_rota,
  httpscheduleSave_rota,
  httpscheduleUpdate_rota,
  httpscheduleDelete_rota
} from "@/service/http";
export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/;
      console.log(value);
      if (value == "") {
        callback(new Error("请输入正确手机号码！"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确手机号码！"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }

      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value > 100) {
          callback(new Error("年龄超过100"));
        } else {
          callback();
        }
      }
    };
    return {
      loading: false,
      tableData: [],
      npage: 1,
      pagesize: 10,
      total: 0,
      formInline: {},
      dialogFormAddVisible: false,
      dialogFormEditVisible: false,
      rules: {
        rotaNum: [{ required: true, message: "请输入工号", trigger: "blur" }],
        rid: [{ required: true, message: "请输入角色编号", trigger: "blur" }],
        rotaName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        rotaAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        rotaAge: [{ required: true, validator: checkAge, trigger: "blur" }],
        rotaPhone: [
          { require: true, validator: validateMobile, trigger: "blur" }
        ],
        rotaJoinWorkDate: [
          { required: true, message: "请输入工作年限", trigger: "blur" }
        ],
        rotaDepartment: [
          { required: true, message: "请输入所属部门", trigger: "blur" }
        ],
        mid: [{ required: true, message: "请输入负责矿场", trigger: "blur" }]
      },
      addForm: {},
      editForm: {}
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
      this._init(this.npage, this.pagesize, this.formInline.mid);
    },
    /* 新增值班记录 */
    handleAdd() {
      this.addForm = {};
      this.dialogFormAddVisible = true;
    },
    _httpscheduleSave_rota(
      rotaNum,
      rid,
      rotaName,
      rotaAge,
      rotaSex,
      rotaPhone,
      rotaJoinWorkDate,
      rotaWorkingLife,
      rotaDepartment,
      mid
    ) {
      httpscheduleSave_rota(
        rotaNum,
        rid,
        rotaName,
        rotaAge,
        rotaSex,
        rotaPhone,
        rotaJoinWorkDate,
        rotaWorkingLife,
        rotaDepartment,
        mid
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.dialogFormAddVisible = false;
          setTimeout(() => {
            this._init(this.npage, this.pagesize);
          }, 1000);
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    /* 更新值班表 */
    handleEdit(index, row) {
      this.editForm = JSON.parse(JSON.stringify(row));
      this.editForm.rotaSex == "男"
        ? (this.editForm.rotaSex = false)
        : (this.editForm.rotaSex = true);
      console.log(this.editForm.rotaSex);
      this.dialogFormEditVisible = true;
    },
    _httpscheduleUpdate_rota(
      rotaId,
      rotaNum,
      rid,
      rotaName,
      rotaAge,
      rotaSex,
      rotaPhone,
      rotaJoinWorkDate,
      rotaWorkingLife,
      rotaDepartment,
      mid
    ) {
      httpscheduleUpdate_rota(
        rotaId,
        rotaNum,
        rid,
        rotaName,
        rotaAge,
        rotaSex,
        rotaPhone,
        rotaJoinWorkDate,
        rotaWorkingLife,
        rotaDepartment,
        mid
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.dialogFormEditVisible = false;
          setTimeout(() => {
            this._init(this.npage, this.pagesize);
          }, 1000);
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    /* 删除值班表 */
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该值班员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this._httpscheduleDelete_rota(row.rotaId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _httpscheduleDelete_rota(rotaId) {
      httpscheduleDelete_rota(rotaId).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          setTimeout(() => {
            this._init(this.npage, this.pagesize);
          }, 1000);
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
            this._httpscheduleSave_rota(
              this.addForm.rotaNum,
              this.addForm.rid,
              this.addForm.rotaName,
              this.addForm.rotaAge,
              this.addForm.rotaSex ? "女" : "男",
              this.addForm.rotaPhone,
              this.addForm.rotaJoinWorkDate,
              this.addForm.rotaWorkingLife,
              this.addForm.rotaDepartment,
              this.addForm.mid
            );
          }
          if (formName == "editForm") {
            this._httpscheduleUpdate_rota(
              this.editForm.rotaId,
              this.editForm.rotaNum,
              this.editForm.rid,
              this.editForm.rotaName,
              this.editForm.rotaAge,
              this.editForm.rotaSex ? "女" : "男",
              this.editForm.rotaPhone,
              this.editForm.rotaJoinWorkDate,
              this.editForm.rotaWorkingLife,
              this.editForm.rotaDepartment,
              this.editForm.mid
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
