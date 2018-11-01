
<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="矿机型号管理"
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
            id="darkCell"
            v-loading="loading">
 
            <el-table-column prop="id" label="ID" align="center" width="50"></el-table-column>
            <el-table-column prop="modelName" label="品牌名" align="center" min-width="140"></el-table-column>
            <el-table-column prop="modelPower" label="额定算力" align="center" min-width="140"></el-table-column>
            <el-table-column prop="price" label="价格" align="center" min-width="140"></el-table-column>
            <el-table-column prop="imgaeUrl" label="图片地址" align="center" min-width="140"></el-table-column>
            <el-table-column prop="powerWaste" label="功耗" align="center" min-width="140"></el-table-column>
            <el-table-column prop="attaction" label="注意事项" align="center" min-width="140"></el-table-column>
            <el-table-column prop="size" label="规格" align="center" min-width="140"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" min-width="160">
              <template slot-scope="scope">
                {{scope.row.createTime|dateServer}}
              </template>
            </el-table-column>
            <el-table-column prop="brandName" label="品牌名" align="center" min-width="140"></el-table-column>
            <el-table-column prop="adminUserName" label="创建人" align="center" min-width="120"></el-table-column>
            <el-table-column prop="qa" label="质保" align="center" min-width="120"></el-table-column>
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
            title="编辑矿机型号" 
            :visible.sync="dialogFormEditVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm" ref="editForm" :rules="rules" >
            <el-form-item label="品牌名" label-width="100px">
              <el-input v-model="editForm.modelName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="额定算力" label-width="100px">
              <el-input v-model="editForm.modelPower" autocomplete="off"></el-input>
            </el-form-item>            
            <el-form-item label="价格" label-width="100px">
              <el-input v-model="editForm.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="功耗" label-width="100px">
              <el-input v-model="editForm.powerWaste" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="注意事项" label-width="100px">
              <el-input v-model="editForm.attaction" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="规格" label-width="100px">
              <el-input v-model="editForm.size" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌名" label-width="100px">
              <el-input v-model="editForm.brandName" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="质保" label-width="100px">
              <el-input v-model="editForm.qa" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="是否上传图片" label-width="100px">
              <el-switch
                v-model="editForm.isImg"
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>  
            <el-form-item v-if="editForm.isImg"  label="选取图片" label-width="100px">
              <el-upload
                class="upload-demo"
                ref="uploadEdit"
                action="1"
                :limit="3"
                :before-upload="beforeAvatarUploadEdit"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
              </el-upload>                 
            </el-form-item>                                                                                                                      
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-dialog> 
        <el-dialog 
            title="新增矿机型号" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
          <el-form :model="addForm" ref="addForm" :rules="rules" >
            <el-form-item label="品牌名" label-width="100px">
              <el-input v-model="addForm.modelName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="额定算力" label-width="100px">
              <el-input v-model="addForm.modelPower" autocomplete="off"></el-input>
            </el-form-item>            
            <el-form-item label="价格" label-width="100px">
              <el-input v-model="addForm.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="功耗" label-width="100px">
              <el-input v-model="addForm.powerWaste" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="注意事项" label-width="100px">
              <el-input v-model="addForm.attaction" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="规格" label-width="100px">
              <el-input v-model="addForm.size" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌名" label-width="100px">
              <el-input v-model="addForm.brandName" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="质保" label-width="100px">
              <el-input v-model="addForm.qa" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="是否上传图片" label-width="100px">
              <el-switch
                v-model="addForm.isImg"
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>  
            <el-form-item v-if="addForm.isImg"  label="选取图片" label-width="100px">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="1"
                :limit="3"
                :before-upload="beforeAvatarUploadAdd"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
              </el-upload>                 
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
  httpSysGetminermodellist,
  httpSysAddminermodelImg, //带图片的添加
  httpSysAddminermodel, //不带图片的添加
  httpSysUpdateminermodel,
  httpSysUpdateminermodelImg
} from "@/service/http";
import { mapGetters } from "vuex";
import { timeFormat } from "@/config/time";
export default {
  data() {
    return {
      search: {},
      loading: false,
      num: true,
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
        this.gethttpSysGetminermodellist(
          this.npage,
          this.pagesize,
          this.formInline.time[0],
          this.formInline.time[1]
        );
      } else {
        this.gethttpSysGetminermodellist(this.npage, this.pagesize);
      }
    },
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "addForm") {
            this.handleAddForm();
          }
          if (formName == "editForm") {
            this.handleEditForm();
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
    /*   得到矿机列表 后台管理模块 / 矿机列表展示 */
    gethttpSysGetminermodellist(
      npage,
      pagesize,
      begainTimeString,
      endTimeString
    ) {
      this.loading = true;
      httpSysGetminermodellist(
        npage,
        pagesize,
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
    },
    /* 新增矿机型号 后台管理模块 / 矿机型号添加 */
    handleAddForm(
      loginId,
      modelName,
      modelPower,
      price,
      powerWaste,
      attaction,
      size,
      brandName,
      qa,
      imgaeUrl
    ) {
      if (this.addForm.isImg) {
        this.$refs.upload.submit();
      } else {
        httpSysAddminermodel(
          this.loginId,
          this.addForm.modelName,
          this.addForm.modelPower,
          this.addForm.price,
          this.addForm.powerWaste,
          this.addForm.attaction,
          this.addForm.size,
          this.addForm.brandName,
          this.addForm.qa
        ).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.dialogFormAddVisible = false;
            this.reset();
          } else {
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        });
      }
    },
    /* 新增矿机型号 后台管理模块 / 矿机型号修改 */
    handleEditForm(
      loginId,
      id,
      modelName,
      modelPower,
      price,
      powerWaste,
      attaction,
      size,
      brandName,
      qa,
      imgaeUrl
    ) {
      if (this.editForm.isImg) {
        this.$refs.uploadEdit.submit();
      } else {
        httpSysUpdateminermodel(
          this.loginId,
          this.editForm.id,
          this.editForm.modelName,
          this.editForm.modelPower,
          this.editForm.price,
          this.editForm.powerWaste,
          this.editForm.attaction,
          this.editForm.size,
          this.editForm.brandName,
          this.editForm.qa
        ).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.dialogFormEditVisible = false;
            this.reset();
          } else {
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        });
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    /* 新增矿机型号 后台管理模块 / 矿机型号新增 添加图片 */
    beforeAvatarUploadAdd(file) {
      httpSysAddminermodelImg(
        this.loginId,
        this.addForm.modelName,
        this.addForm.modelPower,
        this.addForm.price,
        this.addForm.powerWaste,
        this.addForm.attaction,
        this.addForm.size,
        this.addForm.brandName,
        this.addForm.qa,
        file
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.dialogFormAddVisible = false;
          this.reset();
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    /* 新增矿机型号 后台管理模块 / 矿机型号修改 添加图片 */
    beforeAvatarUploadEdit(file) {
      httpSysUpdateminermodelImg(
        this.loginId,
        this.editForm.id,
        this.editForm.modelName,
        this.editForm.modelPower,
        this.editForm.price,
        this.editForm.powerWaste,
        this.editForm.attaction,
        this.editForm.size,
        this.editForm.brandName,
        this.editForm.qa,
        file
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.dialogFormEditVisible = false;
          this.reset();
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    }
  },
  mounted() {
    this.gethttpSysGetminermodellist(this.npage, this.pagesize);
  }
};
</script>
<style lang="less" scoped>
</style>
<style>
#darkCell .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>


