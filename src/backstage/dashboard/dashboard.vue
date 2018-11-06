<template>
    <div class="dashboard">
      <canvas id="cvs" width="100%" height="400" style="border:1px solid pink;margin:20px auto;">

      </canvas>
      <div>
        <div>
          <img height="70px" src="../../../static/zby.png" alt="">
          <div id="elForm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ims: "../../../static/logo.png",
      formInline: {}
    };
  },
  mounted() {
    this._init();
  },
  methods: {
    _init() {
      var cvs = document.getElementById("cvs");
      var cW = cvs.style.width;
      var cH = cvs.style.height;
      var imgObj = new Image();
      imgObj.src = this.ims;
      var imgW = "100";
      var imgH = "50";

      imgObj.onload = function() {
        imgW = imgObj.width;
        imgH = imgObj.height;
        var ctx = cvs.getContext("2d");
        ctx.drawImage(this, 0, 0, 100, 50);
      };
    }
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.dashboard {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  padding-top: 5%;
  background: url("../../assets/bg.jpg");
  background-size: 100% 100%;
  #cvs {
    width: 100%;
    display: none;
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
}
</style>


