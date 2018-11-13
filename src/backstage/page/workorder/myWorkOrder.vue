<template>
    <div class="containers">
        <el-row>
            <el-alert
              title="我的工单"
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
                <el-input v-model="formInline.handleorderId" placeholder="工单Id"></el-input>
              </el-form-item> 
              <el-form-item >
                <el-input v-model="formInline.faultType" placeholder="错误id"></el-input>
              </el-form-item>   
              <el-form-item >
                <el-input v-model="formInline.as_id " placeholder="子账号id"></el-input>
              </el-form-item>                             
            </el-form>            
        </el-row>
        <el-row class=" d-flex flex-row flex-nowrap justify-content-end">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item >
                <el-input v-model="formInline.handleorderStatus" placeholder="工单状态"></el-input>
              </el-form-item>  
              <el-form-item >
                <el-input v-model="formInline.handleorderRank" placeholder="工单等级"></el-input>
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
 
            <el-table-column prop="id" label="工单id" align="center" width="90"></el-table-column>
            <el-table-column prop="remake" label="工单描述" align="center" width="200">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.remake" placement="top">
                      <span>{{scope.row.remake}}</span>
                  </el-tooltip>
              </template>                 
            </el-table-column>
            <el-table-column prop="faultType" label="错误类型id" align="center" width="100">
              
            </el-table-column>
            <el-table-column prop="mpfId" label="损坏矿机id列表" align="center" width="200">
              <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.mpfId" placement="top">
                      <span>{{scope.row.mpfId}}</span>
                  </el-tooltip>
              </template>                    
            </el-table-column>
            <el-table-column prop="asId" label="下发工单管理员id" align="center" min-width="140"></el-table-column>
            <el-table-column prop="status" label="工单当前状态" align="center" min-width="140">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status==1?'success':scope.row.status==2?'info':scope.row.status==3?'warning':scope.row.status==4?'danger':scope.row.status==5?'':''">
                  {{scope.row.status==1?'初始':scope.row.status==2?'已接单':scope.row.status==3?'已反馈':scope.row.status==4?'已结单':scope.row.status==5?'返厂维修':''}}
                </el-tag>                    
              </template>
            </el-table-column>
           <el-table-column prop="createTime" label="生成时间" align="center" width="160">
              <template slot-scope="scope">
                {{scope.row.createTime|dateServer}}
              </template>
            </el-table-column> 
           <el-table-column prop="updateTime" label="更新时间" align="center" width="160">
              <template slot-scope="scope">
                {{scope.row.updateTime|dateServer}}
              </template>
            </el-table-column> 
           <el-table-column prop="repairmanName" label="维修员名字" align="center" width="160">
            </el-table-column>  
           <el-table-column prop="repairmanId" label="维修员id" align="center" width="160">
            </el-table-column>  
           <el-table-column prop="faultTypestr" label="错误信息" align="center" width="160">
            </el-table-column>  
           <el-table-column prop="asIdstr" label="子账号" align="center" width="160">
            </el-table-column>                                                 
            <el-table-column prop="rank" label="工单等级" align="center" min-width="140"></el-table-column>
            <el-table-column type="expand" label="更多详情" width="80" >
              <template slot-scope="props" >
                <el-alert
                  title="提现情况"
                  type="success"
                  :closable="false"
                  center
                  >
                </el-alert>
                <el-table
                  :data="props.row.mpf"
                  border 
                    highlight-current-row style="width: 100%;font-weight:bold"
                  >
                       <el-table-column fixed prop="id" label="矿机id" align="center" sortable></el-table-column>
                       <el-table-column prop="machineName" label="矿机名称" align="center" sortable></el-table-column>
                       <el-table-column prop="code" label="矿机编号" align="center" sortable></el-table-column> 
                       <el-table-column prop="minerUid" label="所在矿场id" align="center" sortable></el-table-column> 
                       <el-table-column prop="row" label="行" align="center" sortable></el-table-column> 
                       <el-table-column prop="clos" label="列" align="center" sortable></el-table-column> 
                       <el-table-column prop="modelUid" label="所属型号" align="center" sortable></el-table-column> 
                       <el-table-column prop="standardPower" label="额定算力" align="center" sortable></el-table-column> 
                       <el-table-column prop="nowpower" label="标准算力" align="center" sortable></el-table-column> 
                       <el-table-column prop="price" label="价格" align="center" sortable></el-table-column> 
                       <el-table-column prop="poolId" label="所属矿池id" align="center" sortable></el-table-column> 
                       <el-table-column prop="currency" label="币种" align="center" sortable></el-table-column> 
                       <el-table-column prop="type" label="用途" align="center" sortable></el-table-column> 
                       <el-table-column prop="repairfees" label="维修费用" align="center" sortable></el-table-column> 
                       <el-table-column prop="isell" label="是否启用" align="center" sortable></el-table-column> 
                       <el-table-column prop="minerUid" label="是否销售" align="center" sortable></el-table-column> 
                      <el-table-column prop="addTime" label="添加时间" align="center" sortable>
                        <template slot-scope="scope">
                            {{scope.row.addTime|dateServer}}
                        </template>                          
                      </el-table-column>                       
                       <el-table-column prop="addbyId" label="添加人" align="center" sortable></el-table-column> 
                       <el-table-column prop="minerAccount" label="矿机账户" align="center" sortable></el-table-column> 
                       <el-table-column prop="minerDesc" label="矿机描述" align="center" sortable></el-table-column> 
                       <el-table-column prop="overclock" label="是否超频 " align="center" sortable></el-table-column> 
                       <el-table-column prop="asId" label="管理员id" align="center" sortable></el-table-column> 
                      <el-table-column prop="productionTime" label="生产时间" align="center" sortable>
                        <template slot-scope="scope">
                            {{scope.row.productionTime|dateServer}}
                        </template>                          
                      </el-table-column>                      
                </el-table>
              </template>
            </el-table-column>      
            <el-table-column label="操作" align="center" min-width="220" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  v-if="scope.row.status==1"
                  @click="handleTake(scope.$index, scope.row)">接单</el-button>
                <el-button
                  size="mini"
                  type="success"
                     v-if="scope.row.status!==2"
                  @click="handleFeedback(scope.$index, scope.row)">反馈</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  v-if="scope.row.status!==4"
                  @click="handleDelete(scope.$index, scope.row)">结单</el-button>                  
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
            title="反馈信息" 
            :visible.sync="dialogFormfeedbackVisible" 
            center
            width="30%"
            >
          <el-form :model="feedbackForm" ref="feedbackForm" :rules="rules" >
            <el-form-item label="工单ID" label-width="100px">
              <el-input v-model="feedbackForm.id" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="错误ID" label-width="100px" prop="faultType">
              <el-input v-model="feedbackForm.faultType" autocomplete="off"></el-input>
            </el-form-item>            
            <el-form-item label="工单描述" label-width="100px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="工单描述"
                v-model="feedbackForm.remake">
              </el-input>              
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormfeedbackVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('feedbackForm')">确 定</el-button>
          </div>
        </el-dialog>   
        <el-dialog 
            title="结单信息" 
            :visible.sync="dialogFormDeleteVisible" 
            center
            width="30%"
            id="dialogFormDeleteVisible"
            >
          <el-form :model="deleteForm" ref="deleteForm" :rules="rules" >
            <el-form-item label="工单ID" label-width="100px">
              <el-input v-model="deleteForm.id" autocomplete="off"  disabled></el-input>
            </el-form-item>
            <el-form-item label="错误ID" label-width="100px" prop="faultType">
              <el-input v-model="deleteForm.faultType" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="矿机列表" label-width="100px">
              <template>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </template>              
            </el-form-item>           
            <el-form-item label="工单描述" label-width="100px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="工单描述"
                v-model="deleteForm.remake">
              </el-input>              
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormDeleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('deleteForm')">确 定</el-button>
          </div>
        </el-dialog>                             
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  httpHoHandleorderlist,
  httpHoReceivehandleorder,
  httpHoResponsehandleorder,
  httpHoOverhandleorder
} from "@/service/http";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      npage: 1,
      pagesize: 10,
      total: 0,
      formInline: {},
      feedbackForm: {},
      deleteForm: {},
      dialogFormfeedbackVisible: false,
      dialogFormDeleteVisible: false,
      rules: {
        faultType: [
          { required: true, message: "请选择错误ID", trigger: "change" }
        ]
      },
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true
    };
  },
  mounted() {
    this._init(this.npage, this.pagesize, this.loginId);
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "loginId"
      // ...
    ])
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    _init(
      npage,
      pagesize,
      repairmanId,
      handleorderId,
      faultType,
      as_id,
      handleorderStatus,
      handleorderRank,
      begainTimeString,
      endTimeString
    ) {
      httpHoHandleorderlist(
        npage,
        pagesize,
        repairmanId,
        handleorderId,
        faultType,
        as_id,
        handleorderStatus,
        handleorderRank,
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
        this._init(
          this.npage,
          this.pagesize,
          this.loginId,
          Number(this.formInline.handleorderId)
          //   Number(this.formInline.faultType),
          //   Number(this.formInline.as_id),
          //   this.formInline.handleorderStatus,
          //   this.formInline.handleorderRank,
          //   this.formInline.time[0],
          //   this.formInline.time[1]
        );
      } else {
        this._init(
          this.npage,
          this.pagesize,
          this.loginId,
          Number(this.formInline.handleorderId)
          //   Number(this.formInline.faultType),
          //   Number(this.formInline.as_id),
          //   this.formInline.handleorderStatus,
          //   this.formInline.handleorderRank
        );
      }
    },
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "feedbackForm") {
            this._httpHoResponsehandleorder(
              this.feedbackForm.id,
              this.loginId,
              this.feedbackForm.faultType,
              this.feedbackForm.remake
            );
          }
          if (formName == "deleteForm") {
            this._httpHoOverhandleorder(
              this.deleteForm.id,
              this.loginId,
              this.deleteForm.faultType,
              this.deleteForm.remake,
              this.checkedCities.join(",")
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 接单 */
    handleTake(index, row) {
      this.$confirm("是否接受此订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpHoReceivehandleorder(row.id, this.loginId).then(res => {
            let data = res.data;
            if (data.code == 200) {
              this.$message({
                message: data.msg,
                type: "success"
              });
              setTimeout(() => {
                this.reset();
              }, 1000);
            } else {
              this.$message({
                message: data.msg,
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消接单"
          });
        });
    },
    /* 反馈 */
    handleFeedback(index, row) {
      this.feedbackForm = JSON.parse(JSON.stringify(row));
      this.dialogFormfeedbackVisible = true;
    },
    _httpHoResponsehandleorder(id, repairmanId, faultType, remake) {
      httpHoResponsehandleorder(id, repairmanId, faultType, remake).then(
        res => {
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.dialogFormfeedbackVisible = false;
            setTimeout(() => {
              this.reset();
            }, 1000);
          } else {
            this.$message({
              message: data.msg,
              type: "error"
            });
          }
        }
      );
    },
    /*  结单 */
    handleDelete(index, row) {
      this.deleteForm = JSON.parse(JSON.stringify(row));
      this.cities = row.mpfId.split(",");
      this.dialogFormDeleteVisible = true;
    },
    _httpHoOverhandleorder(id, repairmanId, faultType, remake, fixedMinerIds) {
      httpHoOverhandleorder(
        id,
        repairmanId,
        faultType,
        remake,
        fixedMinerIds
      ).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: data.msg,
            type: "success"
          });
          this.dialogFormDeleteVisible = false;
          setTimeout(() => {
            this.reset();
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

<style>
#darkCell .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#dialogFormDeleteVisible .el-checkbox {
  width: 50px;
  margin-left: 30px;
}
</style>