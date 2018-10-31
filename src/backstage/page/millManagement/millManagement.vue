
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
            <el-table-column prop="machineName" label="矿机名称" align="center" width="100"></el-table-column>
            <el-table-column prop="code" label="编号" align="center" width="100"></el-table-column>
            <el-table-column prop="row" label="位置行" align="center" width="80"></el-table-column>
            <el-table-column prop="clos" label="位置列" align="center" width="80"></el-table-column>
            <el-table-column prop="standardPower" label="额定功率" align="center" width="80"></el-table-column>
            <el-table-column prop="type" label="用途" align="center" width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type==1?'success':scope.row.type==2?'info':scope.row.type==3?'warning':scope.row.type==4?'danger':''">
                  {{scope.row.type==1?'自营':scope.row.type==2?'托管':scope.row.type==3?'矿机租赁':scope.row.type==4?'算力租赁':''}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="isShow" label="是否启用" align="center" width="80">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type?'success':'danger'">
                  {{scope.row.type?'启用':'不启用'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="minerDesc" label="描述" align="center" class="darkCell" min-width="100">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.minerDesc" placement="top">
                      <span>{{scope.row.minerDesc}}</span>
                  </el-tooltip>
              </template>                 
            </el-table-column>
            <el-table-column prop="minerAccount" label="矿工子账号" align="center" width="100"></el-table-column>
            <el-table-column prop="production_time" label="矿机生产日期" align="center" width="100"></el-table-column>            
            <el-table-column prop="minerUid" label="矿场id" align="center" width="80"></el-table-column>            
            <el-table-column prop="modelUid" label="型号id" align="center" width="80"></el-table-column>            
            <el-table-column prop="nowpower" label="现在算力" align="center" width="80"></el-table-column>            
            <el-table-column prop="standardPower" label="额定算力" align="center" width="80"></el-table-column>            
            <el-table-column prop="poolId" label="所在矿池id" align="center" width="100"></el-table-column>            
            <el-table-column prop="isell" label="所在矿池id" align="center" width="100"></el-table-column>            
            <el-table-column prop="overclock" label="是否超频" align="center" width="80"></el-table-column>            
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
            title="编辑矿机" 
            :visible.sync="dialogFormEditVisible" 
            center
            width="30%"
            >
          <el-form :model="editForm"  ref="editForm" :rules="rules">
            <el-form-item label="矿机名称" label-width="100px">
              <el-input v-model="editForm.machineName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="矿机编号" label-width="100px">
              <el-input v-model="editForm.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="位置行" label-width="100px">
              <el-input v-model="editForm.row" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="位置列" label-width="100px">
              <el-input v-model="editForm.row" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="额定功率" label-width="100px">
              <el-input v-model="editForm.standardPower" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" label-width="100px">
              <el-input v-model="editForm.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="矿机的用途" label-width="100px">
                <el-select v-model="editForm.type" placeholder="角色">
                  <el-option label="自营" value="1"></el-option>
                  <el-option label="托管" value="2"></el-option>
                  <el-option label="矿机租赁" value="3"></el-option>
                  <el-option label="算力租赁" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用" label-width="100px">
              <el-switch
                v-model="editForm.isShow"
                active-text="启用"
                inactive-text="不启用">
              </el-switch>
            </el-form-item>            
            <el-form-item label="描述" label-width="100px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="editForm.minerDesc">
              </el-input>
            </el-form-item> 
            <el-form-item label="矿机子账号" label-width="100px">
              <el-input v-model="editForm.minerAccount" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="矿机生产日期" label-width="100px">
              <el-date-picker
                v-model="editForm.production_time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>      
            <el-form-item label="矿场id" label-width="100px">
              <el-input v-model="editForm.minerUid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="型号id" label-width="100px">
              <el-input v-model="editForm.modelUid" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="现在算力" label-width="100px">
              <el-input v-model="editForm.nowpower" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="额定算力" label-width="100px">
              <el-input v-model="editForm.standardPower" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="所在矿池id" label-width="100px">
              <el-input v-model="editForm.poolId" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="是否销售" label-width="100px">
              <el-switch
                v-model="editForm.isell"
                active-text="启"
                inactive-text="否">
              </el-switch>              
            </el-form-item>   
            <el-form-item label="是否超频" label-width="100px">
              <el-switch
                v-model="editForm.isShow"
                active-text="启"
                inactive-text="否">
              </el-switch>
            </el-form-item>                                                                                                                                                   
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-dialog> 
        <el-dialog 
            title="新增矿机" 
            :visible.sync="dialogFormAddVisible" 
            center
            width="30%"
            >
          <el-form :model="addForm" ref="addForm" :rules="rules" >
            <el-form-item label="矿机名称" label-width="100px">
              <el-input v-model="addForm.machineName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="矿机编号" label-width="100px">
              <el-input v-model="addForm.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="位置行" label-width="100px">
              <el-input v-model="addForm.row" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="位置列" label-width="100px">
              <el-input v-model="addForm.clos" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="额定功率" label-width="100px">
              <el-input v-model="addForm.standardPower" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" label-width="100px">
              <el-input v-model="addForm.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="矿机的用途" label-width="100px">
                <el-select v-model="addForm.type" placeholder="角色">
                  <el-option label="自营" value="1"></el-option>
                  <el-option label="托管" value="2"></el-option>
                  <el-option label="矿机租赁" value="3"></el-option>
                  <el-option label="算力租赁" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用" label-width="100px">
              <el-switch
                v-model="addForm.isShow"
                active-text="启用"
                inactive-text="不启用">
              </el-switch>
            </el-form-item>            
            <el-form-item label="描述" label-width="100px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="addForm.minerDesc">
              </el-input>
            </el-form-item> 
            <el-form-item label="矿机子账号" label-width="100px">
              <el-input v-model="addForm.minerAccount" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="矿机生产日期" label-width="100px">
              <el-date-picker
                v-model="addForm.production_time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>      
            <el-form-item label="矿场id" label-width="100px">
              <el-input v-model="addForm.minerUid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="型号id" label-width="100px">
              <el-input v-model="addForm.modelUid" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="现在算力" label-width="100px">
              <el-input v-model="addForm.nowpower" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="额定算力" label-width="100px">
              <el-input v-model="addForm.standardPower" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="所在矿池id" label-width="100px">
              <el-input v-model="addForm.poolId" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="是否销售" label-width="100px">
              <el-switch
                v-model="addForm.isell"
                active-text="启"
                inactive-text="否">
              </el-switch>              
            </el-form-item>   
            <el-form-item label="是否超频" label-width="100px">
              <el-switch
                v-model="addForm.overclock"
                active-text="启"
                inactive-text="否">
              </el-switch>
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
import { httpSysMinerlist, httpSysAddminer } from "@/service/http";
export default {
  data() {
    return {
      search: {},
      loading: false,
      num: true,
      tableData: [{ MACHINEUID: 1 }],
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
      if (this.formInline.time && this.formInline.time.length) {
        this.gethttpSysMinerlist(
          this.npage,
          this.pagesize,
          this.formInline.time[0],
          this.formInline.time[1]
        );
      } else {
        this.gethttpSysMinerlist(this.npage, this.pagesize);
      }
    },
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "addForm") {
            this.handleAddForm(
              this.addForm.machineName,
              this.addForm.code,
              this.addForm.row,
              this.addForm.clos,
              this.addForm.standardPower,
              this.addForm.price,
              this.addForm.type,
              this.addForm.isShow ? true : false,
              this.addForm.minerDesc,
              this.addForm.minerAccount,
              this.addForm.production_time,
              this.addForm.minerUid,
              this.addForm.modelUid,
              this.addForm.nowpower,
              //差一个额定算力
              this.addForm.poolId,
              this.addForm.isell ? true : false,
              this.addForm.overclock ? true : false
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
    /*   得到矿机列表 后台管理模块 / 矿机列表展示 */
    gethttpSysMinerlist(npage, pagesize, begainTimeString, endTimeString) {
      this.loading = true;
      httpSysMinerlist(npage, pagesize, begainTimeString, endTimeString).then(
        res => {
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
        }
      );
    },
    /* 新增矿机 后台管理模块 / 单台矿机录入 */
    handleAddForm(
      machineName,
      code,
      row,
      clos,
      standardPower,
      price,
      type,
      isShow,
      minerDesc,
      minerAccount,
      production_time,
      minerUid,
      modelUid,
      nowpower,
      poolId,
      isell,
      overclock
    ) {
      httpSysAddminer(
        machineName,
        code,
        row,
        clos,
        standardPower,
        price,
        type,
        isShow,
        minerDesc,
        minerAccount,
        production_time,
        minerUid,
        modelUid,
        nowpower,
        poolId,
        isell,
        overclock
      ).then();
    }
  },
  mounted() {
    this.gethttpSysMinerlist(this.npage, this.pagesize);
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


