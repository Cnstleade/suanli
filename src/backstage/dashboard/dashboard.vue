<template>
    <div class="dashboard">
      <canvas id="cvs"   height="114" >
      </canvas>
      <div class="dashboard-top">
        <div class="dashboard-children">
          <img height="50px" src="../../../static/zby.png" alt="">
          <div id="elForm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
              <el-form-item label="当前账号：">
                <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="delivery">
                <el-switch v-model="formInline.regio"
                  active-color="#13ce66"
                  inactive-color="#62bee0"
                  active-text="轮播"
                ></el-switch>
              </el-form-item>              
            </el-form>
          </div>
        </div>
        <div  class="dashboard-title">助币云矿机监控平台</div> 
        <div id="elButton">
          <span>2018-11-6 15:00</span>
           <el-button type="primary" icon="el-icon-back" size="mini" class="elButton">返回</el-button>
        </div>
      </div>
      <div class="dashboard-middle">
        <div class="dashboard-middle-container">
          <div class="dashboard-middle-container-pro" >
            <div >
              <img class="dashboard-middle-container-pro-i1" src="../../assets/images/2_03.png" width="100px" alt="">
              <img class="dashboard-middle-container-pro-i2" src="../../assets/images/2_05.png" width="80px" alt="">
              <img class="dashboard-middle-container-pro-i3" src="../../assets/images/2_08.png" width="60px" alt="">
            </div>
            <div class="dashboard-middle-container-pro-detail">
                矿机故障数
              <span>46</span>
            </div>
          </div>
          <div class="dashboard-middle-container-num">
            <img  src="../../assets/images/3_06.png" width="120px" alt="">
            <div >
              <p>矿机总数</p>
              <span>8888888</span>
              <p>活跃矿机总数</p>
              <span>8888883</span>
            </div>
          </div>
          <div>收益总览</div>
          <i class="el-icon-arrow-left dashboard-middle-icon dashboard-middle-1"></i>
          <i class="el-icon-arrow-right dashboard-middle-icon dashboard-middle-2"></i>
          <i class="el-icon-arrow-left dashboard-middle-icon dashboard-middle-3"></i>
          <i class="el-icon-arrow-right dashboard-middle-icon dashboard-middle-4"></i>
 
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ims: "../../../static/logo.png",
      formInline: {},
      screenWidth: document.body.clientWidth,
      width: document.body.clientWidth
    };
  },
  mounted() {
    this._init();
    window.onresize = () => {
      return (() => {
        this._init();
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
        this.width = this.screenWidth;
      })();
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
          that.width = that.screenWidth;
          that.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    _init() {
      var cvs = document.getElementById("cvs");
      cvs.width = this.width;
      var ctx = cvs.getContext("2d");
      //设置线宽
      ctx.lineWidth = 1;
      ctx.beginPath();
      //设置线的颜色
      ctx.strokeStyle = "#1E2D51";
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 50);
      ctx.lineTo(400, 50);
      ctx.lineTo(420, 80);
      ctx.lineTo(520, 80);
      ctx.lineTo(530, 70);
      // ;
      ctx.lineTo(this.width / 2 + 430, 70);
      // this.width / 2 + 430; 1390
      ctx.lineTo(this.width / 2 + 440, 80); //1400
      ctx.lineTo(this.width / 2 + 540, 80);
      ctx.lineTo(this.width / 2 + 560, 50);
      ctx.lineTo(this.width, 50);
      ctx.lineTo(this.width, 0);
      //执行画线
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.strokeStyle = "#52FFFC";
      ctx.moveTo(540, 75);
      ctx.lineTo(this.width / 2 + 420, 75);
      ctx.stroke();
    }
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  font-family: Tahoma, "Microsoft Yahei", Simsun, sans-serif;
}
.dashboard {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  background: url("../../assets/bg2.jpg");
  background-size: 100% 100%;
  #cvs {
  }
  .dashboard-top {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    .dashboard-children {
      width: 400px;
      #elForm {
        margin-top: 10px;
        margin-left: 25px;
      }
    }
    .dashboard-title {
      flex-grow: 1;
      text-align: center;
      color: #62bee0;
      font-weight: bold;
      font-size: 30px;
      line-height: 80px;
      letter-spacing: 5px;
      background-image: -webkit-linear-gradient(
        bottom,
        #3e76eb,
        #24abd6,
        #62bee0
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    strong {
      color: #62bee0;
      font-size: 30px;
      line-height: 50px;
      background-image: -webkit-linear-gradient(
        bottom,
        #3e76eb,
        #24abd6,
        #62bee0
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    #elButton {
      width: 400px;
      text-align: right;
      padding-top: 10px;
      span {
        margin-right: 20px;
        color: #50f9f9;
        font-size: 12px;
        line-height: 32px;
      }
      .elButton {
        margin-right: 20px;
      }
    }
  }
  .dashboard-middle {
    width: 100%;
    .dashboard-middle-container {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 95%;
      height: 240px;
      margin: 0 auto;
      padding: 20px 0;
      background: #0b1016;
      .dashboard-middle-icon {
        color: #62bee0;
        font-weight: bold;
        font-size: 36px;
        position: absolute;
      }
      .dashboard-middle-1 {
        transform: rotate(45deg);
        top: -15px;
        left: -15px;
      }
      .dashboard-middle-2 {
        transform: rotate(-45deg);
        top: -15px;
        right: -15px;
      }
      .dashboard-middle-3 {
        transform: rotate(-45deg);
        bottom: -15px;
        left: -15px;
      }
      .dashboard-middle-4 {
        transform: rotate(45deg);
        bottom: -15px;
        right: -15px;
      }
      & > div {
        color: red;
      }
      .dashboard-middle-container-pro {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        position: relative;
        min-width: 400px;
        border: 1px solid #1e2d51;
        img {
          position: absolute;
        }
        .dashboard-middle-container-pro-i1 {
          top: 20px;
          left: 15px;
          -webkit-transform: rotate(360deg);
          animation: rotation 3s linear infinite;
          -moz-animation: rotation 3s linear infinite;
          -webkit-animation: rotation 3s linear infinite;
          -o-animation: rotation 3s linear infinite;
        }
        .dashboard-middle-container-pro-i2 {
          top: 80px;
          left: 110px;
          -webkit-transform: rotate(360deg);
          animation: rotation 3s linear infinite;
          -moz-animation: rotation 3s linear infinite;
          -webkit-animation: rotation 3s linear infinite;
          -o-animation: rotation 3s linear infinite;
        }
        .dashboard-middle-container-pro-i3 {
          top: 130px;
          left: 45px;
          -webkit-transform: rotate(360deg);
          animation: rotation 3s linear infinite;
          -moz-animation: rotation 3s linear infinite;
          -webkit-animation: rotation 3s linear infinite;
          -o-animation: rotation 3s linear infinite;
        }
        .dashboard-middle-container-pro-detail {
          width: 150px;
          color: #f77900;
          font-weight: bold;
          padding: 40px 0;
          span {
            display: block;
            margin-top: 20px;
            font-size: 70px;
            line-height: 100px;
            font-weight: 600;
          }
        }
      }
      .dashboard-middle-container-num {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 350px;
        border: 1px solid #1e2d51;
        padding: 20px 0;
        font-weight: bold;
        img {
          margin-left: 40px;
        }
        & > div {
          width: 150px;
          text-align: center;
          p {
            color: #66c2e0;
          }
          span {
            color: #01bb1c;
          }
        }
      }
    }
  }
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
<style  lang="less">
#elForm {
  input {
    background: none;
    border: 1px solid #62bee0;
    color: #62bee0;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #62bee0;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #62bee0;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #62bee0;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #62bee0;
  }
  label {
    color: #62bee0;
    font-weight: 600;
  }
  span {
    color: #62bee0;
    font-weight: bold;
  }
}
#elButton {
  button {
    background: none;
    color: #50f9f9;
    border-radius: 10%;
    border-color: #50f9f9;
  }
}
</style>


