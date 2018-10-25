<template>
     <!--    充值中心 -->
    <div class="recharge">
        <div class=" recharge-top">
           <p><strong>人民币充值</strong><span>温馨提示： 地址仅接受 人民币 充值，任何非 人民币 的充值将不可找回。</span></p>
            <div class=" recharge-top-input">
                <span>充值记录</span>
                <div class="position-relative">
                    <!-- <span>充值记录</span> -->
                    <input type="text" placeholder="请输入金额">
                    <b class="yuan">元</b>
                    <p>
                        <span>充值最低金额为：100元</span>
                        <b>账户余额： 0.00元</b>
                    </p>
                     <button>立即充值</button>
                </div>
                
            </div>
            
        </div>
        <div class=" recharge-bottom">
       
            <div class="col-12 recharge-bottom-show">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="收益记录" name="first">
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="明细"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="净收益"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="累计收益">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="购买记录" name="second">
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="明细"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="净收益"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="累计收益">
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
      dynamicValidateForm: {},
      activeName: "first",
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
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.recharge {
  margin-top: 30px;
  .recharge-top {
    background: #fff;
    @media screen and (max-width: 720px) {
      & {
        flex-direction: column;
        flex-wrap: nowrap;
        background: #fff;
        border-radius: 2%;
        margin: 20px -15px;
        padding: 30px 0;
      }
      & > p {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        height: 47px;
        margin: 0;
        strong {
          padding-left: 20px;
          font-size: 13px;
        }
        span {
          line-height: 16px;
          font-size: 12px;
          text-align: left;
          color: #ff2929;
          max-width: 69%;
          display: flex;
          justify-content: center;
          align-items: Center;
        }
      }
      .recharge-top-input > span {
        display: none;
      }

      & > div {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;

        & > span {
          display: block;
        }
        input {
          width: 320px;
          height: 48px;
          border: 1px solid #d2d2d2;
          padding-left: 20px;
          font-size: 14px;
          outline: none;
        }
        .yuan {
          display: block;
          width: 20px;
          height: 30px;
          position: absolute;
          top: 10px;
          right: 40px;
          text-align: right;
          line-height: 30px;
          font-weight: 400;
          color: Red;
        }
        p {
          width: 320px;
          height: 26px;
          border: 1px solid #d2d2d2;
          border-top: none;
          background: #f5f5f5;
          font-size: 12px;
          color: #888;
          line-height: 26px;
          padding: 0 20px;
        }
        button {
          margin-top: 20px;
          width: 260px;
          height: 50px;
          background: #009ffd;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 50px;
          font-size: 16px;
          box-shadow: 0 5px 0 #0880d7, 0 7px 3px rgba(0, 0, 0, 0.3);
          outline: none;
          transition: all 0.3s ease-in-out 0s;
          &:hover {
            box-shadow: 0 5px 0 #077ace, 0 6px 3px rgba(0, 0, 0, 0.3);
            background: #0087d7;
          }
        }
      }
    }
    @media screen and (min-width: 721px) {
      & {
        border-top: 4px solid #d86f06;
        border-radius: 2%;
        height: 360px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }
      & > p {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #d2d2d2;
        strong {
          margin-left: 30px;
          font-size: 16px;
          color: #888;
        }
        span {
          color: #d44141;
          font-size: 12px;
        }
      }
      .recharge-top-input {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;

        & > span {
          width: 220px;
          font-size: 16px;
          text-align: right;
          font-weight: 700;
        }
        & > div {
          margin-left: 20px;
          & > span {
            display: none;
          }
          input {
            width: 485px;
            height: 48px;
            border: 1px solid #d2d2d2;
            padding-left: 20px;
            font-size: 14px;
            outline: none;
          }
          & > b {
            display: block;
            width: 100px;
            height: 30px;
            position: absolute;
            top: 10px;
            right: 20px;
            text-align: right;
            line-height: 30px;
            font-weight: 400;
          }
          p {
            width: 485px;
            height: 26px;
            border: 1px solid #d2d2d2;
            border-top: none;
            background: #f5f5f5;
            font-size: 12px;
            color: #888;
            line-height: 26px;
            padding: 0 20px;
          }
          button {
            margin-top: 20px;
            width: 320px;
            height: 50px;
            background: #009ffd;
            color: #fff;
            border: none;
            cursor: pointer;
            border-radius: 50px;
            font-size: 16px;
            box-shadow: 0 5px 0 #0880d7, 0 7px 3px rgba(0, 0, 0, 0.3);
            outline: none;
            transition: all 0.3s ease-in-out 0s;
            &:hover {
              box-shadow: 0 5px 0 #077ace, 0 6px 3px rgba(0, 0, 0, 0.3);
              background: #0087d7;
            }
          }
        }
      }
    }
  }
}
.recharge-bottom {
  @media screen and (max-width: 720px) {
    & {
      margin: 10px -15px;
    }
  }
  @media screen and (min-width: 721px) {
    & {
      margin: 0;
    }
  }
}
.recharge-bottom-show {
  background: #fff;
}
</style>

