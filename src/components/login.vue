<template>
    <div class="login">
        <div class="login-wrap">
            <img src="../assets/logo.png" alt="">
            <div class="login-detail">
                  <h1>用户登录</h1>
                  <input type="text" placeholder="请输入手机号码" v-model="username"  @focus="show=false">
                  <input type="text" placeholder="密码" v-model="password"  @focus="show=false">
                  <p>
                    <a href="#">忘记密码?</a>
                  </p>
                  <DragDiv @confirm="showConfig" v-if="show"></DragDiv>
                  <button class="logins" @click="submitForm" :disabled="show">登录</button>
                  <a class="add">创建一个新账号</a>
            </div>
        </div>
    </div>
</template>

<script>
import DragDiv from "./common/dragDiv";
import { mapState, mapGetters, mapMutations } from "vuex";
import { httpLogin } from "@/service/http";
export default {
  data() {
    return {
      changF: false,
      username: "",
      password: "",
      show: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  components: {
    DragDiv
  },
  methods: {
    ...mapMutations(["USER_LOGIN"]),
    _httpLogin(username, loginPassword) {
      httpLogin(username, loginPassword).then(res => {
        let data = res.data;
        if (data.code == 200) {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          this.USER_LOGIN(data.data);
          this.$router.push({ path: "/index/" });
        } else {
          this.$message({
            message: data.msg,
            type: "error"
          });
        }
      });
    },
    submitForm() {
      if (this.username != "" && this.password != "") {
        this.show = true;
      } else {
        this.$message({
          message: "请输入用户名或密码",
          type: "error"
        });
      }
    },
    showConfig(msg) {
      this._httpLogin(this.username, this.password);
    }
  },
  mounted() {
    console.log();
  }
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: content-box;
}
.login {
  width: 100%;
  position: relative;
  @media screen and (max-width: 576px) {
    & {
      height: 500px;
      padding-top: 20px;
    }
  }
  @media screen and (min-width: 577px) {
    & {
      height: 1094px;
    }
  }
  background-image: url(../../static/denglu.jpg);
  .login-wrap {
    @media screen and (max-width: 576px) {
      & {
      }
    }
    @media screen and (min-width: 577px) {
      & {
        width: 500px;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translateX(-50%) translateY(-50%);
      }
    }

    img {
      @media screen and (max-width: 576px) {
        & {
          transform: scale(1);
          display: none;
        }
      }
      @media screen and (min-width: 577px) {
        & {
          transform: scale(1.2);
        }
      }
    }
    .login-detail {
      height: 450px;
      background: #2d2f3e;
      border-radius: 4%;
      box-sizing: content-box;
      padding: 48px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;

      h1 {
        font-weight: bold;
        font-size: 24px;
        color: #e2e7e1;
        padding-bottom: 20px;
        border-bottom: 1px solid #424453;
      }
      input {
        height: 48px;
        line-height: 48px;
        border: 0px solid #d2d2d2;
        padding-left: 20px;
        padding-right: 20px;
        margin: 15px 0;
        font-size: 16px;
        border-radius: 8px;
        background: #373b47;
        outline: none;
        color: #fff;
        font-weight: bold;
      }
      .logins {
        margin: 15px 0;
        height: 50px;
        background: #009ffd;
        line-height: 50px;
        border: none;
        border-radius: 3px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
      // .add {
      //   display: block;
      //   margin: 20px 0;
      //   height: 50px;
      //   background: #009ffd;
      //   line-height: 50px;
      //   border: none;
      //   border-radius: 3px;
      //   font-size: 16px;
      //   color: #fff;
      //   cursor: pointer;
      // }
      .add {
        display: block;
        margin: 15px auto;
        width: 170px;
        border: 2px solid #d86f06;
        color: #d86f06;
        text-decoration: none;
        text-align: center;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
      }
      p {
        text-align: right;
        a {
          font-size: 14px;
          color: #e2e7e1;
          text-decoration: none;
          line-height: 42px;
        }
      }
    }
  }
}
</style>
