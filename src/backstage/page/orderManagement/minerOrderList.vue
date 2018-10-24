
<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="矿机订单列表"
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
            <el-table-column prop="MACHINEORDERUID" label="ID" align="center"></el-table-column>
            <el-table-column prop="MACHINEGOODSUID" label="套餐ID" align="center"></el-table-column>
            <el-table-column prop="USERUID" label="用户ID" align="center"></el-table-column>
            <el-table-column prop="MACHINEORDERSN" label="订单号" align="center"></el-table-column>
            <el-table-column prop="ORDERAMOUNT" label="订单总价格" align="center"></el-table-column>
            <el-table-column prop="GOODSPRICE" label="套餐总价" align="center"></el-table-column>
            <el-table-column prop="ELECTRICITYFEES" label="电费总价格" align="center"></el-table-column>
            <el-table-column prop="NUMBER" label="购买数量" align="center"></el-table-column>
            <el-table-column prop="NUMBER" label="订单来源" align="center">
              <template slot-scope="scope">
                {{scope.row.NUMBER==1?'自助币云':"贝叶金服"}}
              </template>
            </el-table-column>
            <el-table-column prop="REPAIRFEES" label="维修费" align="center"></el-table-column>
            <el-table-column prop="ENABLED" label="是否有效" align="center"></el-table-column>
            <el-table-column prop="REPAIRFEES" label="是否冻结" align="center">
              <template slot-scope="scope">
                {{scope.row.NUMBER==1?'已冻结':"未冻结"}}
              </template>              
            </el-table-column>  
            <el-table-column prop="PAYTIME" label="冻结时间" align="center"></el-table-column>                      
            <el-table-column prop="PAYSTATUS" label="付款状态" align="center"></el-table-column>
            <el-table-column prop="PAYMENT" label="支付方式" align="center"></el-table-column>
            <el-table-column prop="PAYTIME" label="支付时间" align="center"></el-table-column>
            <el-table-column prop="WORKDAY" label="开始工作时间" align="center"></el-table-column>
            <el-table-column prop="ADDTIME" label="添加时间" align="center"></el-table-column>
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
        <el-dialog 
            title="编辑订单列表" 
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
        </el-dialog> 
        <el-dialog 
            title="新增订单列表" 
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
      tableData: [{ MACHINEORDERUID: 1 },{ MACHINEORDERUID: 3,NUMBER:1 },{ MACHINEORDERUID: 2,NUMBER:2 }],
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

