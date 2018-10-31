<template>
    <div class="pCenter">
      <div class="pCenter-top">
        <ul class="pCenter-top-left">
          <li>账户信息</li>
          <li>账户安全</li>
        </ul>
        <ul  class="pCenter-top-right">
          <li>
            <span><i>UID</i><strong>{{userCenter.uid}}</strong></span>
            
          </li>
          <li>
            <span><i>账户昵称</i><strong>{{userCenter.username}}</strong></span>
            
            <button @click.prevent="dialogName = true">修改</button>
          </li>
          <li>
            <span><i>身份认证</i><strong>{{userCenter.idcard}}</strong></span>
            
            <button @click.prevent="dialogID = true">去认证</button>            
          </li>
          <li>
            <span><i>手机绑定</i><strong>{{userCenter.phoneNumber}}</strong></span>
            
            <button @click.prevent="dialogPhone = true">去修改</button>             
          </li>
          <li>
            <span><i>邮箱绑定</i><strong>{{userCenter.email}}</strong></span>
            
            <button @click.prevent="dialogEmail = true">去修改</button>                 
          </li>
          <li>
            <span><i>登录密码</i><strong>********</strong></span>
            
            <button @click.prevent="dialogPass = true">修改</button>               
          </li>
          <li>
            <span><i>资金密码</i><strong>********</strong></span>
            
            <button @click.prevent="dialogMoney = true">修改</button>               
          </li>
        </ul>
      </div>
        <div class="row pCenter-bottom mt-4">
            <div class="col-12 pCenter-bottom-show">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="最近十次登录" name="first">
                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="ltime"
                        label="时间"
                        align="center"
                        width="180">
                          <template slot-scope="scope">
                            {{scope.row.ltime|dateServer}}
                          </template>  
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="登录地区"
                        align="center"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="lip"
                        align="center"
                        label="登录IP">
                      </el-table-column>
                      <el-table-column
                        prop="lfrom"
                        align="center"
                        label="登录方式">
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        align="center"
                        label="状态">
                      </el-table-column>                                            
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="登录记录" name="second">
                    <el-table
                      :data="alllog"
                      style="width: 100%">
                      <el-table-column
                        prop="ltime"
                        label="时间"        align="center"
                        width="180">
                          <template slot-scope="scope">
                            {{scope.row.ltime|dateServer}}
                          </template>                          
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="登录地区"
                                align="center"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="lip"
                        label="IP"
                                align="center"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="lfrom"
                        label="登录来源"
                                align="center"
                        width="180">
                      </el-table-column>                                            
                      <el-table-column
                        prop="status"
                                align="center"
                        label="登录状态">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
            </div>
        </div>  
        <el-dialog title="修改昵称" :visible.sync="dialogName" center   :width="width">
        </el-dialog>
        <el-dialog title="身份认证" :visible.sync="dialogID" center   :width="width">
        </el-dialog>        
        <el-dialog title="手机绑定" :visible.sync="dialogPhone" center   :width="width">
        </el-dialog>
        <el-dialog title="邮箱绑定" :visible.sync="dialogEmail" center   :width="width">
        </el-dialog>
        <el-dialog title="修改登录密码" :visible.sync="dialogPass" center   :width="width">
        </el-dialog>
        <el-dialog title="修改资金密码" :visible.sync="dialogMoney" center   :width="width">
        </el-dialog>                                
    </div>
</template>

<script>
import { httpUserSingle, httpUserAllLog } from "@/service/http";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      width: document.body.clientWidth > 721 ? "30%" : "90%",
      dialogName: false,
      dialogID: false,
      dialogPhone: false,
      dialogEmail: false,
      dialogPass: false,
      dialogMoney: false,
      activeName: "first",
      tableData: [],
      userCenter: {},
      alllog: []
    };
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // that.screenWidth = that.$store.state.canvasWidth
          console.log(that.screenWidth);
          that.screenWidth > 721 ? (that.width = "30%") : (that.width = "90%");
          // that.init();
          that.timer = false;
        }, 400);
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo", "isLogin"])
  },
  methods: {
    handleClick() {},
    /*  个人中心初始化 */
    _httpUserSingle(uid) {
      httpUserSingle(uid).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.tableData = data.data.loginlogten;
          this.userCenter = JSON.parse(JSON.stringify(data.data));
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    /* 个人中心——登录记录 */
    _httpUserAllLog(uid) {
      httpUserAllLog(uid).then(res => {
        let data = res.data;
        this.alllog = data;
        // if (data.code == 200) {

        // } else {
        //   this.$message.error(data.msg);
        // }
      });
    }
  },
  mounted() {
    this._httpUserSingle(this.userInfo.uid);
    this._httpUserAllLog(this.userInfo.uid);
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  }
};
</script>
<style lang="less" scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.pCenter {
  margin-top: 30px;
  @media screen and (max-width: 720px) {
    & {
      margin: 30px -15px;
    }
  }

  .pCenter-top {
    background: #fff;
    @media screen and (max-width: 720px) {
      & {
        background: #fff;
        border-radius: 2%;
        .pCenter-top-left {
          display: none;
        }
        .pCenter-top-right {
          li {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            span {
              color: #888;
              padding-left: 5px;
              i {
                display: inline-block;
                width: 90px;
              }
              strong {
                color: #333;
              }
            }
            button {
              width: 84px;
              height: 26px;
              outline: 0 none;
              border: 1px solid #009ffd;
              border-radius: 3px;
              line-height: 24px;
              font-size: 12px;
              text-align: center;
              margin-right: 20px;
              background: #009ffd;
              color: #fff;
              vertical-align: middle;
              cursor: pointer;
            }
          }
        }
      }
    }
    @media screen and (min-width: 721px) {
      & {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
      }
      .pCenter-top-left {
        width: 200px;
        flex-grow: 1;
        text-align: center;
        color: #888;
        :nth-child(1) {
          border-bottom: 1px solid #ebebeb;
          border-top: 1px solid #ebebeb;
          border-left: 4px solid #d86f06;
          height: 70px;
          line-height: 70px;
        }
        :nth-child(2) {
          border-bottom: 1px solid #ebebeb;
          border-top: 1px solid #ebebeb;
          border-left: 4px solid #d86f06;
          margin-top: 140px;
          height: 70px;
          line-height: 70px;
        }
      }

      .pCenter-top-right {
        width: 670px;
        li {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          height: 70px;
          border-bottom: 1px solid #ebebeb;
          border-left: 1px solid #ebebeb;
          width: 100%;

          span {
            color: #888;
            padding-left: 60px;
            i {
              display: inline-block;
              width: 160px;
            }
            strong {
              color: #333;
            }
          }
          button {
            width: 84px;
            height: 26px;
            outline: 0 none;
            border: 1px solid #009ffd;
            border-radius: 3px;
            line-height: 24px;
            font-size: 12px;
            text-align: center;
            margin-right: 20px;
            background: #009ffd;
            color: #fff;
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
    }
  }
  .pCenter-bottom {
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
  .pCenter-bottom-show {
    background: #fff;
  }
}
</style>

