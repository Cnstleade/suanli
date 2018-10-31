<template>
    <div class="register">
        <div class="register-wrap">
            <img src="../assets/logo.png" alt="">
            <div class="register-detail">
                  <h1>用户注册</h1>
                  <input type="text" placeholder="请输入手机号码">
                  <input type="text" placeholder="图像验证码">
                   <input type="text" placeholder="短信验证码">
                    <input type="text" placeholder="密码（字母加数字6-18位）">
                     <input type="text" placeholder="重复密码">
                  <p>
                    <a href="#">注册表示您已同意（助币云算力用户协议）</a>
                  </p>
                  <DragDiv @confirm="showConfig"></DragDiv>
                  <button class="registers">创建</button>
                  <a class="add">已有账号去登录</a>
            </div>
        </div>
        <!-- <div class="register-wrap">
          <div class="ms-title">
            <img src="../assets/logo.png" alt="">
          </div>
          <div class="ms-register">

          </div>
        </div>         -->
    </div>
</template>

<script>
import DragDiv from "./common/dragDiv";
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
        this.$store.dispatch("SETregister");
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
    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem("ROLE");
    sessionStorage.removeItem("registerID");
    sessionStorage.removeItem("fk_username");
    console.log("登录");
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
.register {
  width: 100%;
  position: relative;
  @media screen and (max-width: 576px) {
    & {
      height: 750px;
      padding-top: 20px;
    }
  }
  @media screen and (min-width: 577px) {
    & {
      height: 1094px;
    }
  }
  background-image: url(../../static/denglu.jpg);
  .register-wrap {
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
    .register-detail {
      @media screen and (max-width: 576px) {
        & {
           height: 650px;
        }
      }
      @media screen and (min-width: 577px) {
        & {
           height: 550px;
        }
      }        
    
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
        height: 36px;
        line-height: 36px;
        border: 0px solid #d2d2d2;
        padding-left: 20px;
        padding-right: 20px;
        margin: 10px 0;
        font-size: 16px;
        border-radius: 8px;
        background: #373b47;
        outline: none;
      }
      .registers {
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
