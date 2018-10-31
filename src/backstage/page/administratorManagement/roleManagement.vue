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
            <el-table-column prop="rid" label="ID" align="center"></el-table-column>
            <el-table-column prop="rname" label="角色名称" align="center"></el-table-column>
            <el-table-column prop="ADDTIME" label="添加时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.createtime|dateServer}}
                </template>                
            </el-table-column>
            <el-table-column prop="ENABLED" label="状态" align="center"></el-table-column>
            <el-table-column prop="RULES" label="规则" align="center"></el-table-column>
            <el-table-column prop="jobTitle" label="描述" align="center"></el-table-column>
            <el-table-column label="操作" align="center" min-width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.$index, scope.row)">角色修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleChange(scope.$index, scope.row)">菜单修改</el-button>
              </template>
            </el-table-column>            
        </el-table>
        <el-dialog
          title="角色修改"
          :visible.sync="dialogFormEditVisible"
          center
          width="30%"
          >
            <el-form :model="editForm" status-icon  ref="editForm" label-width="100px"  >
              <el-form-item label="角色名:" prop="rname" >
                <el-input type="input" v-model="editForm.rname"  ></el-input>
              </el-form-item>
              <el-form-item label="角色备注:" prop="jobTitle" >
                <el-input type="textarea"  v-model="editForm.jobTitle" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
                <el-button type="primary" style="margin-left:30px" @click="qx1('editForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog> 
        <el-dialog 
            title="新增角色" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
            <el-form :model="addForm" status-icon  ref="addForm" label-width="100px"  >
              <el-form-item label="角色名:" prop="rname" >
                <el-input type="input" v-model="addForm.rname"  ></el-input>
              </el-form-item>
              <el-form-item label="角色备注:" prop="jobTitle" >
                <el-input type="textarea"  v-model="addForm.jobTitle" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
                <el-button type="primary" style="margin-left:30px" @click="qx1('editForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>                 
        <el-dialog
          title="角色修改"
          :visible.sync="dialogFormChangeVisible"
          center
          width="30%"
          >
              <el-tree
              ref="tree"
              default-expand-all
                :data="treeData"
                show-checkbox
                node-key="mid"
                :default-checked-keys="showCheck"
                :props="defaultProps">
              </el-tree>
              <el-row style="text-align:center" class="m20">
                <el-button type="primary" style="margin-left:30px" @click="getCheckedKeys">修改</el-button>
                <el-button type="primary" style="margin-left:30px" @click="dialogFormChangeVisible=false">取消</el-button>    
              </el-row>
        </el-dialog>                      
    </div> 
</template>
<script>
import {
  httpRoleList,
  httpSysMinerlist,
  changeRoleList,
  findRoleMenu,
  httpSaveRoleMenu
} from "@/service/http";
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
      dialogFormChangeVisible: false,
      treeData: [],
      showCheck: [],
      defaultProps: {
        children: "list",
        label: "mname"
      },
      roleId: null
    };
  },
  methods: {
    /*  得到角色 */
    gethttpRoleList(startDate, EndDate) {
      httpRoleList(startDate, EndDate).then(res => {
        let data = res.data;
        this.tableData = data;
      });
    },
    reset() {},
    handleSearch() {},
    submitForm() {},
    changeDialog() {},
    handleEdit(index, row) {
      this.dialogFormEditVisible = true;
      this.editForm = null;
      this.editForm = Object.assign({}, row);
    },
    /*  点击添加 */
    handleAdd() {
      this.addForm = {};
      this.dialogFormAddVisible = true;
    },
    handleDelete(index, row) {},
    onSubmit() {},
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "editForm") {
            changeRoleList(
              this.editForm.rid,
              this.editForm.rname,
              this.editForm.jobTitle
            ).then(res => {
              let data = res.data;
              if (data.success) {
                setTimeout(() => {
                  this.dialogFormEditVisible = false;
                }, 20);
                this.$message({
                  message: "修改角色成功",
                  type: "success"
                });
                this.handleSearch();
              } else {
                this.$message.error("修改角色失败");
              }
            });
          }
          if (formName == "addForm") {
            changeRoleList(
              null,
              this.addForm.rname,
              this.addForm.jobTitle
            ).then(res => {
              let data = res.data;
              if (data.success) {
                setTimeout(() => {
                  this.dialogFormAddVisible = false;
                }, 20);
                this.$message({
                  message: "添加角色成功",
                  type: "success"
                });
                this.handleSearch();
              } else {
                this.$message.error("添加角色失败");
              }
            });
          }
        } else {
          return false;
        }
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
        this.gethttpRoleList(this.formInline.time[0], this.formInline.time[1]);
      } else {
        this.gethttpRoleList();
      }
    },
    /* 菜单修改 */
    handleChange(index, row) {
      let RoleId = row.rid;
      this.roleId = null;
      this.roleId = RoleId;
      findRoleMenu(RoleId)
        .then(res => {
          this.treeData = null;
          let data = res.data;
          this.treeData = JSON.parse(JSON.stringify(data));
          this.dialogFormChangeVisible = true;
          let showCheck = [];
          for (let a = 0; a < this.treeData.length; a++) {
            if (this.treeData[a].checked) {
            }
            if (this.treeData[a].list && this.treeData[a].list.length > 0) {
              for (let b = 0; b < this.treeData[a].list.length; b++) {
                if (this.treeData[a].list[b].checked) {
                  showCheck.push(this.treeData[a].list[b].mid);
                }
              }
            }
          }
          this.showCheck.length = 0;
          this.showCheck = showCheck;
        })
        .catch();
    },
    /*  修改菜单 */
    getCheckedKeys() {
      httpSaveRoleMenu(
        this.roleId,
        this.$refs.tree.getCheckedKeys().join(",")
      ).then(res => {
        let data = res.data;
        if (data.success) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogFormChangeVisible = false;
          this.handleSearch();
        } else {
          this.$message.error("修改失败,请联系管理员");
        }
      });
    }
  },
  mounted() {
    this.gethttpRoleList();
  }
};
</script>
<style lang="less" scoped>
</style>

