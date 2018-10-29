import axios from 'axios';
import Vue from 'vue';
var qs = require('qs');
//axios 配置
axios.defaults.timeout = 6000000;
axios.defaults.baseURL = 'http://47.88.171.117:8088';
//axios.defaults.baseURL =  'http://101.132.171.38:7994'

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

//后台管理模块 / 登录
export function httpSysLogin(username, password) {
  let data = {
    username,
    password
  };
  return axios({
    url: '/sys/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 获取菜单
export function httpGetMenu(loginId) {
  const data = {
    loginId
  };
  return axios({
    url: "/sys/menu",
    method: "post",
    data: qs.stringify(data)
  })
}

//后台管理模块 /  菜单字典管理
export function httpMenulist(pageSize, pageNum, parentId, mname) {
  let data = {
    pageSize,
    pageNum,
    parentId,
    mname
  };
  return axios({
    url: '/sys/menulist',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 / 角色展示
export function httpRoleList(startDate, EndDate) {
  let data = {
    startDate,
    EndDate
  };
  return axios({
    url: '/admin/rolelist',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 单台矿机录入
export function httpSysAddminer(machineName, code, row, clos, standardPower, price, type, isShow, minerDesc, minerAccount, production_time, minerUid, modelUid, nowpower, poolId, isell, overclock) {
  let data = {
    machineName,
    code,
    row,
    clos,
    standardPower,
    price,
    type,
    isShow,
    minerDesc,
    minerAccount,
    production_time,
    minerUid,
    modelUid,
    nowpower,
    poolId,
    isell,
    overclock
  };
  return axios({
    url: '/sys/addminer',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 角色展示
export function httpSysMinerlist(nPageNumber, pageSize, begainTimeString, endTimeString) {
  let data = {
    nPageNumber,
    pageSize,
    conditionVo: {
      begainTimeString,
      endTimeString
    }
  };
  return axios({
    url: '/sys/minerlist',
    method: 'post',
    data: qs.stringify(data)
  })
}
