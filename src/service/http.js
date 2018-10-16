import axios from 'axios';
import Vue from 'vue';
var qs = require('qs');
//axios 配置
axios.defaults.timeout = 6000000;


//   /*得到代办人/
// export function httpFindAllSignature() {
//     return axios({
//       url: "/apmsg/findAllSignature",
//       method: "get",

//     })
//   }

// export function httpFindMessageRecording(pageNum, pageSize, messagerId) {
//     let data = {
//       pageNum,
//       pageSize,
//       messagerId
//     };
//     return axios({
//       url: "/apmsg/findMessageRecording",
//       method: "post",
//       headers: {
//         'Content-type': 'application/x-www-form-urlencoded'
//       },
//       data: qs.stringify(data)
//     })
//   }

//后台管理模块 / admin 贷后管理 逾期列表展示 下拉点击查看详细信息
export function httpGetPrice() {
  return axios({
    url: "http://www.rhy.com/index/getPrice",
    method: "get",
  })
}
