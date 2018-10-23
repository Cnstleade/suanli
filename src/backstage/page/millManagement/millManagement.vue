
<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="矿机管理"
              :closable="false"
            type="success">
            </el-alert>           
        </el-row>
        <el-row class="mt-4 d-flex flex-row flex-nowrap justify-content-end">
            <div style="flex-grow:1" >
                <el-button  icon="el-icon-plus" @click="handleAdd" type="primary">新增</el-button>
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
            <el-table-column prop="MACHINEUID" label="ID" align="center"></el-table-column>
            <el-table-column prop="MACHINENAME" label="矿机名称" align="center"></el-table-column>
            <el-table-column prop="CODE" label="编号" align="center"></el-table-column>
            <el-table-column prop="MINERUID" label="所在矿场" align="center"></el-table-column>
            <el-table-column prop="ROW" label="位置行" align="center"></el-table-column>
            <el-table-column prop="CLOS" label="位置列" align="center"></el-table-column>
            <el-table-column prop="MODELUID" label="所属型号" align="center"></el-table-column>
            <el-table-column prop="STANDARDPOWER" label="标准算力" align="center"></el-table-column>
            <el-table-column prop="NOWPOWER" label="当前算力" align="center"></el-table-column>
            <el-table-column prop="PRICE" label="矿机价格" align="center"></el-table-column>
            <el-table-column prop="POOL" label="所在矿池" align="center"></el-table-column>
            <el-table-column prop="CURRENCY" label="当前执行的币种" align="center"></el-table-column>
            <el-table-column prop="TYPE" label="矿机所属类型" align="center"></el-table-column>
            <el-table-column prop="REPAIRFEES" label="维修费" align="center"></el-table-column>
            <el-table-column prop="ISSHOW" label="是否启用" align="center"></el-table-column>
            <el-table-column prop="ISELL" label="已售出" align="center"></el-table-column>
            <el-table-column prop="ADDTIME" label="添加时间" align="center"></el-table-column>
            <el-table-column prop="ADDBY" label="添加者" align="center"></el-table-column>
            <el-table-column prop="MINER_ACCOUNT" label="矿工子账号" align="center"></el-table-column>
            <el-table-column prop="MINER_DESC" label="矿工名称" align="center"></el-table-column>
            <el-table-column prop="OVERCLOCK" label="是否超频" align="center"></el-table-column>
            <el-table-column prop="PRODUCTION_TIME" label="出厂时间" align="center"></el-table-column>
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
        <el-dialog 
            title="编辑矿机" 
            :visible.sync="dialogFormEditVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm">
            <el-form-item label="活动名称" label-width="100px">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" label-width="100px">
              <el-select v-model="editForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormEditVisible = false">确 定</el-button>
          </div>
        </el-dialog> 
        <el-dialog 
            title="新增矿机" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
          <el-form :model="addForm">
            <el-form-item label="活动名称" label-width="100px">
              <el-input v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" label-width="100px">
              <el-select v-model="addForm.region" placeholder="请选择活动区域">
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
      tableData: [{ MACHINEUID: 1 }],
      npage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      formInline: {},
      editForm: {},
      addForm: {},
      dialogFormEditVisible: false,
      dialogFormAddVisible: false
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
    handleDelete(index, row) {},
    onSubmit() {}
  }
};
</script>
<style lang="less" scoped>
</style>

