<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="菜单字典管理"
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
                <el-input v-model="formInline.mname" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item >
                <el-select v-model="formInline.parentId" placeholder="请选择角色">
                  <el-option
                    v-for="item in parentRole"
                    :key="item.mid"
                    :label="item.mname"
                    :value="item.mid">
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
            highlight-current-row style="width: 100%;font-weight:bold"
            class="m20"
            v-loading="loading"
            id="eleTable"
          >
            <el-table-column
              prop="mid"
              label="序号"
              fixed
              width="70"
              sortable
              align="center">
            </el-table-column>  
            <el-table-column
              prop="parent"
              label="父菜单名称"
              min-width="150"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="children"
              label="是否有子菜单"
              min-width="150"
              align="center">
                  <template slot-scope="scope">
                      <el-tag
                          :type="scope.row.children?'':'danger'"
                      >{{scope.row.children?'有':'无'}}</el-tag>
                  </template>                         
            </el-table-column>  
            <el-table-column
              prop="mname"
              label="菜单名"
               min-width="150"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="sort"
              label="排列权重"
               min-width="150"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="createtime"
               min-width="150"
              label="创建时间"
              align="center">
            </el-table-column>  
            <el-table-column
              prop="createuserName"
               min-width="150"
              label="创建人"
              align="center">
            </el-table-column>                                                                                        
            <el-table-column prop="cz"  align="center" label="操作"   >
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="success"
                    @click="handleAllocation(scope.$index, scope.row)"
                   >修改菜单</el-button>
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
        <!-- <el-dialog 
            title="编辑权限" 
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
        </el-dialog>  -->
        <el-dialog 
            title="新增权限" 
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
        <el-dialog
          title="角色修改"
          :visible.sync="dialogVisibleEdit"
          center
          width="30%"
          >
            <el-form :model="editForm" status-icon  ref="editForm" label-width="100px"  :rules="rules" >
              <el-form-item label="父组件菜单:" prop="parentId" >
                <el-select  v-model="editForm.parentId" placeholder="父组件菜单:">
                      <el-option
                        v-for="item in parentRole"
                        :key="item.mid"
                        :label="item.mname"
                        :value="item.mid">
                      </el-option>
                </el-select>    
              </el-form-item>           
              <el-form-item label="菜单名:" prop="mname" >
                <el-input type="input"  v-model="editForm.mname" ></el-input>
              </el-form-item>
              <el-form-item label="权重:"  >
                <el-input type="number"  v-model="editForm.sort" ></el-input>
              </el-form-item>              
              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
                <el-button type="primary" style="margin-left:30px" @click="cancel('editForm')">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>                       
    </div> 
</template>
<script>
import { httpMenulist, httpFindFatherMenu, httpSaveMenu } from "@/service/http";
export default {
  data() {
    return {
      search: {},
      loading: false,
      tableData: [{ RULEUID: 1 }],
      npage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      formInline: {},
      editForm: {},
      addForm: {},
      dialogFormEditVisible: false,
      dialogFormAddVisible: false,
      dialogVisibleEdit: false,
      rules: {},
      /*   角色 */
      parentRole: []
    };
  },
  methods: {
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
      this.gethttpMenulist(
        this.pagesize,
        this.npage,
        this.formInline.parentId,
        this.formInline.mname
      );
    },
    /*   得到菜单字典管理 后台管理模块 /  菜单字典管理 */
    gethttpMenulist(pageSize, pageNum, parentId, mname) {
      this.loading = true;
      httpMenulist(pageSize, pageNum, parentId, mname).then(res => {
        let data = res.data;
        this.total = data.total;
        this.tableData = data.rows;
        this.loading = false;
      });
    },
    /*   得到菜单字典管理 后台管理模块 / 请选择角色 */
    gethttpFindFatherMenu() {
      httpFindFatherMenu().then(res => {
        let data = res.data;
        this.parentRole = data;
      });
    },
    /* 点击修改菜单传递参数 */
    handleAllocation(index, row) {
      this.dialogVisibleEdit = true;
      this.editForm = Object.assign({}, row);
    },
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "editForm") {
            this.gethttpSaveMenu(
              this.editForm.parentId,
              this.editForm.mname,
              this.editForm.sort,
              this.editForm.mid
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /*  重置表单 */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /* 取消模态框 */
    cancel(formName) {
      if (formName == "editForm") {
        this.editForm = {};
        this.dialogVisibleEdit = false;
      }
    },
    /*  后台管理模块 / 修改菜单 */
    gethttpSaveMenu(parentId, mname, sort, mid) {
      httpSaveMenu(parentId, mname, sort, mid).then(res => {
        let data = res.data;
        if (data.statu == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogVisibleEdit = false;
          this.handleSearch();
        }
      });
    }
  },
  mounted() {
    this.gethttpMenulist(this.pagesize, this.npage);
    this.gethttpFindFatherMenu();
  }
};
</script>
<style lang="less" scoped>
</style>

