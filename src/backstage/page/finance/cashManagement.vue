
<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="提现管理"
              :closable="false"
            type="success">
            </el-alert>           
        </el-row>
        <el-row class="mt-4 d-flex flex-row flex-nowrap justify-content-end">
            <div style="flex-grow:1" >
                <!-- <el-button  icon="el-icon-plus" @click="handleAdd" type="primary">新增</el-button> -->
            </div>             
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item >
                <el-input v-model="formInline.user" placeholder="关键字"></el-input>
              </el-form-item>
              <!-- <el-form-item >
                <el-select v-model="formInline.region" placeholder="角色">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->
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
            <el-table-column prop="PROFITUID" label="ID" align="center"></el-table-column>
            <el-table-column prop="MACHINEUID" label="用户ID" align="center"></el-table-column>
            <el-table-column prop="PROFIT" label="提现金额" align="center"></el-table-column>
            <el-table-column prop="PROFITTIME" label="提现时间" align="center"></el-table-column>
            <el-table-column prop="PROFITTYPE" label="类型" align="center"></el-table-column>
            <el-table-column prop="PROFITTYPE" label="状态" align="center"></el-table-column>            
            <el-table-column label="操作" align="center" min-width="150" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-if="scope.row.PROFITTYPE==1"
                  type="success"
                  @click="handleSH(scope.$index, scope.row)">审核</el-button>
                <el-button
                  size="mini"
                  v-if="scope.row.PROFITTYPE==2"
                 type="info" 
                  @click="handleFB(scope.$index, scope.row)">放币</el-button>                  
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
              </template>
            </el-table-column>            
        </el-table>
        <el-dialog 
            title="审核编辑表" 
            :visible.sync="dialogFormSHVisible" 
            center
            width="30%"
            >
          <!-- <el-form :model="editForm">
            <el-form-item label="名称" label-width="100px">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" label-width="100px">
              <el-select v-model="editForm.region" placeholder="请选择备注">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form> -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormSHVisible = false">通过</el-button>
            <el-button type="primary" @click="dialogFormSHVisible = false">取消</el-button>
          </div>
        </el-dialog> 
        <el-dialog 
            title="放币编辑表" 
            :visible.sync="dialogFormFBVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm">
            <el-form-item label="提币地址" label-width="100px">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="提币数量" label-width="100px">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>            
            <!-- <el-form-item label="备注" label-width="100px">
              <el-select v-model="editForm.region" placeholder="请选择备注">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormFBVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormFBVisible = false">确 定</el-button>
          </div>
        </el-dialog>         
        <el-dialog 
            title="新增提现表" 
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
export default {
  data() {
    return {
      search: {},
      loading: false,
      tableData: [
        { PROFITUID: 11, PROFITTYPE: 1 },
        { PROFITUID: 12, PROFITTYPE: 2 }
      ],
      npage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      formInline: {},
      editForm: {},
      addForm: {},
      dialogFormEditVisible: false,
      dialogFormAddVisible: false,
      dialogFormSHVisible:false,
      dialogFormFBVisible:false
    };
  },
  methods: {
    reset() {},
    handleSearch() {},
    submitForm() {},
    changeDialog() {},
    handleEdit(index, row) {
      this.dialogFormEditVisible = true;
    },
    handleAdd() {
      this.dialogFormAddVisible = true;
    },
    handleSH(index, row) {
      this.dialogFormSHVisible = true;
    },
    handleFB(index, row) {
      this.dialogFormFBVisible = true;
    },
    handleDelete(index, row) {},
    onSubmit() {}
  }
};
</script>
<style lang="less" scoped>
</style>

