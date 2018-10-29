<template>
    <div class="login">
        <div class="login-wrap">
            <img src="../assets/logo.png" alt="">
            <div class="login-detail">
                  <h1>用户登录{{isLogin}}</h1>
                  <input type="text" placeholder="请输入手机号码">
                  <input type="text" placeholder="密码">
                  <p>
                    <a href="#">忘记密码?</a>
                  </p>
                  <DragDiv @confirm="showConfig"></DragDiv>
                  <button class="logins">登录</button>
                  <a class="add">创建一个新账号</a>
            </div>
        </div>
        <!-- <div class="login-wrap">
          <div class="ms-title">
            <img src="../assets/logo.png" alt="">
          </div>
          <div class="ms-login">

          </div>
        </div>         -->
    </div>
</template>

<script>
import DragDiv from "./common/dragDiv";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      changF: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {
     ...mapGetters(["isLogin"])
  },
  components: {
    DragDiv
  },
  methods: {
    submitForm() {
      if (this.ruleForm.username != "" && this.ruleForm.password != "") {
        let params = {
          username: this.ruleForm.username,
          password: this.ruleForm.password
        };
        this.$store.dispatch("SETLogin");
      } else {
        Message({
          message: "填写用户名和密码",
          center: true
        });
      }

      /*this.$refs[formName].validate(valid => {
          if (valid) {
            localStorage.setItem("fk_username", this.ruleForm.username);
            this.$router.push("/");
          } else {
            return false;
          }
        });*/
    },
    showConfig(msg) {
      console.log(msg);
      this.changF = msg;
    }
  },
  mounted() {
    // this.$store.dispatch("Logout");
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
        top: 50%;
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
