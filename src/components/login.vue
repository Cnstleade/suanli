<template>
    <div class="login">
        <div class="login-wrap">
            <img src="../assets/logo.png" alt="">
            <div class="login-detail">
                  <h1>用户登录</h1>
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
export default {
  data() {
    return {
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
    }
  },
  mounted() {
    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem("ROLE");
    sessionStorage.removeItem("LOGINID");
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
.login {
  width: 100%;

  @media screen and (max-width: 576px) {
    & {
      height: 500px;
    }
  }
  @media screen and (min-width: 577px) {
    & {
      height: 1094px;
    }
  }
  background-image: url(../../static/denglu.jpg);
  .login-wrap {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    img {
      @media screen and (max-width: 576px) {
        & {
          transform: scale(1);
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
      h1 {
      }
    }
  }
}
</style>
