<template>
  <!--   账单明细 -->
    <div class="billing">
        <div class="row billing-bottom mt-4 ">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
             <el-form-item label="币种">
               <el-select v-model="formInline.region" placeholder="活动区域">
                 <el-option label="区域一" value="shanghai"></el-option>
                 <el-option label="区域二" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="操作">
               <el-select v-model="formInline.region" placeholder="活动区域">
                 <el-option label="区域一" value="shanghai"></el-option>
                 <el-option label="区域二" value="beijing"></el-option>
               </el-select>
             </el-form-item>
            </el-form>
            <el-form :inline="true" :model="formInline" class="demo-form-inline-1">
             <el-form-item >
               <el-button type="danger" round>全部时间</el-button>
             </el-form-item>
             <el-form-item >
               <el-button type="danger" round>最近7天</el-button>
             </el-form-item>
             <el-form-item >
               <el-button type="danger" round>最近1个月</el-button>
             </el-form-item>                          
             <el-form-item >
                <el-date-picker
                  v-model="formInline.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="onSubmit">查询</el-button>
             </el-form-item>
            </el-form>            
            <div class="col-12 billing-bottom-show">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="提取记录" name="first">
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="时间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="操作"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="币种">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="数量">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="账户余额">
                      </el-table-column>                                            
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      activeName: "first",
      formInline: {}
    };
  },
  methods: {
    handleClick() {},
    onSubmit() {
      console.log("submit!");
    }
  },
  mounted(){
      console.log('+++++++++++++')
  }
};
</script>

<style lang="less" scoped>
.billing {
  background: #fff;
  margin-top: 30px;
  padding: 0 20px;
  @media screen and (max-width: 720px) {
    & {
      margin: 30px -15px;
    }
  }
  .billing-bottom {
    flex-direction: column;
  }
  .demo-form-inline {
    margin-top: 20px;
    align-self: flex-end;
  }
  .demo-form-inline-1 {
    align-self: flex-end;
  }
}
</style>

