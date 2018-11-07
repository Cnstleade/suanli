<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="错误类型"
              :closable="false"
            type="success">
            </el-alert>           
        </el-row>    
        <el-row class="mt-4 d-flex flex-row flex-nowrap justify-content-end">
            <div style="flex-grow:1" >
                <el-button  icon="el-icon-plus" @click="handleAdd" type="primary">新增</el-button>
            </div>             
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
 
            <el-table-column prop="id" label="错误类型id" align="center" width="90"></el-table-column>
            <el-table-column prop="faultType" label="错误说明" align="center" min-width="200">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.faultType" placement="top">
                      <span>{{scope.row.faultType}}</span>
                  </el-tooltip>
              </template>                 
            </el-table-column>
            <el-table-column prop="deadline" label="最大处理时限" align="center" width="100">
              
            </el-table-column>
            <el-table-column label="操作" align="center" width="220" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              </template>
            </el-table-column>            
        </el-table> 
        <el-dialog 
            title="编辑错误类型" 
            :visible.sync="dialogFormEditVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm" ref="editForm" :rules="rules" >
            <el-form-item label="错误ID" label-width="120px" >
              <el-input v-model="editForm.id" autocomplete="off" disabled></el-input>
            </el-form-item>               
            <el-form-item label="错误描述" label-width="120px" prop="faultType">
              <el-input v-model="editForm.faultType" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="错误修复时限" label-width="120px" prop="deadline">
              <el-input v-model.number="editForm.deadline" autocomplete="off"></el-input>
            </el-form-item>                        
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormDeleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-dialog> 
        <el-dialog 
            title="新增错误类型" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
          <el-form :model="addForm" ref="addForm" :rules="rules" >
            <el-form-item label="错误描述" label-width="120px" prop="faultType">
              <el-input v-model="addForm.faultType" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="错误修复时限" label-width="120px" prop="deadline">
              <el-input v-model.number="addForm.deadline" autocomplete="off" ></el-input>
            </el-form-item>                        
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormDeleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
          </div>
        </el-dialog>                  
    </div>
</template>

<script>
import {
  httpFtFindAllfaulttype,
  httpFtModifyfaulttype,
  httpFtAddfaulttype
} from "@/service/http";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      editForm: {},
      addForm: {},
      dialogFormEditVisible: false,
      dialogFormAddVisible: false,
      rules: {
        faultType: [
          { required: true, message: "请选择错误描述", trigger: "change" }
        ],
        deadline: [
          { required: true, message: "错误修复时限不能为空" },
          { type: "number", message: "错误修复时限必须为数字值" }
        ]
      }
    };
  },
  mounted() {
    this._init();
  },
  methods: {
    /*  获得错误的类型 */
    _init() {
      httpFtFindAllfaulttype().then(res => {
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
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "editForm") {
            this._httpFtModifyfaulttype(
              this.editForm.id,

              this.editForm.faultType,
              this.editForm.deadline
            );
          }
          if (formName == "addForm") {
            this._httpFtAddfaulttype(
              this.addForm.faultType,
              this.addForm.deadline
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 修改 */
    handleEdit(index, row) {
      this.editForm = JSON.parse(JSON.stringify(row));
      this.dialogFormEditVisible = true;
    },
    _httpFtModifyfaulttype(id, faultType, deadline) {
      httpFtModifyfaulttype(id, faultType, deadline).then(res => {
        res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.dialogFormEditVisible = false;
            setTimeout(() => {
              this._init();
            }, 1000);
          } else {
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        };
      });
    },
    /*   新增 */
    handleAdd() {
      this.dialogFormAddVisible = true;
    },
    _httpFtAddfaulttype(faultType, deadline) {
      httpFtAddfaulttype(faultType, deadline).then(res => {
        let data = res.data;
        console.log(data);
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.dialogFormAddVisible = false;
          setTimeout(() => {
            this._init();
          }, 1000);
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

