import axios from 'axios';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});
var qs = require('qs');
//axios 配置
axios.defaults.timeout = 6000000;
//axios.defaults.baseURL = 'http://localhost:8088'; //本地服务器

axios.defaults.baseURL = 'http://47.88.171.117:8088';




// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    ElementUI.Message({
      message: '网络错误,请联系管理员',
      type: "error"
    })
    return Promise.reject(error)
  }
);
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

// 后台管理模块  获取所有父菜单
export function httpFindFatherMenu() {
  return axios({
    url: "/sys/findFatherMenu",
    method: "get"
  })
}


//后台管理模块 / 修改菜单
export function httpSaveMenu(parentId, mname, sort, mid) {
  let data = {
    parentId,
    mname,
    sort,
    mid
  };
  return axios({
    url: '/sys/saveMenu',
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

//后台管理模块 / 角色展示 添加或修改角色·
export function changeRoleList(rid, rname, jobTitle) {
  let data = {
    rid,
    rname,
    jobTitle
  };
  return axios({
    url: '/admin/addRole',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 角色菜单的查找
export function findRoleMenu(RoleId) {
  let data = {
    RoleId
  };
  return axios({
    url: '/admin/findRoleMenu',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 保存菜单栏
export function httpSaveRoleMenu(rid, mids) {
  let data = {
    rid,
    mids
  };
  return axios({
    url: '/admin/saveRoleMenu',
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
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    // data: JSON.stringify(data)
    data: qs.stringify(data)
  })
}

//后台管理模块 / 矿机列表展示
export function httpSysMinerlist(npage, pagesize, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      begainTimeString,
      endTimeString
    }
  };
  return axios({
    url: '/sys/minerlist',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 矿场列表展示
export function httpSysMinerslist(npage, pagesize, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      begainTimeString,
      endTimeString
    }
  };
  return axios({
    url: '/sys/minerslist',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 矿场修改
export function httpSysUpdateminers(name, electricityFees, adress, positionFrees, addUserName, loginId, id) {
  let data = {
    name,
    electricityFees,
    adress,
    positionFrees,
    addUserName,
    loginId,
    id
  };
  return axios({
    url: '/sys/updateminers',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 矿场新增
export function httpSysAddminers(name, electricityFees, adress, positionFrees, addUserName, loginId) {
  let data = {
    name,
    electricityFees,
    adress,
    positionFrees,
    addUserName,
    loginId,
  };
  return axios({
    url: '/sys/addminers',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 订单查询
export function httpIncomeAllorder(npage, pagesize, orderNumString, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      orderNumString,
      begainTimeString,
      endTimeString,
    }
  };
  return axios({
    url: '/income/allorder',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 用户收益菜单
export function httpIncomeAllorderbyuserid(npage, pagesize, userId, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      userId,
      begainTimeString,
      endTimeString,
    }
  };
  return axios({
    url: '/income/allorderbyuserid',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 矿机品牌列表展示
export function httpSysGetminerbrandlist(npage, pagesize, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      begainTimeString,
      endTimeString,
    }
  };
  return axios({
    url: '/sys/getminerbrandlist',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}


//后台管理模块 / 矿机品牌添加
export function httpSysAddminerbrand(brandName, loginId) {
  let data = {
    brandName,
    loginId
  };
  return axios({
    url: '/sys/addminerbrand',
    method: 'post',
    data: qs.stringify(data)
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    //data: JSON.stringify(data)
  })
}

//后台管理模块 / 矿机品牌修改
export function httpSysUpdateminerbrand(brandName, loginId, id) {
  let data = {
    brandName,
    loginId,
    id
  };
  return axios({
    url: '/sys/updateminerbrand',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 矿机型号列表展示
export function httpSysGetminermodellist(npage, pagesize, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      begainTimeString,
      endTimeString,
    }
  };
  return axios({
    url: '/sys/getminermodellist',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}


//后台管理模块 / 矿机型号添加
export function httpSysAddminermodel(loginId, modelName, modelPower, price, powerWaste, attaction, size, brandName, qa) {
  let data = {
    loginId,
    modelName,
    modelPower,
    price,
    powerWaste,
    attaction,
    size,
    brandName,
    qa
  };
  return axios({
    url: '/sys/addminermodel',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 / 矿机型号添加 传递 图片格式
export function httpSysAddminermodelImg(loginId, modelName, modelPower, price, powerWaste, attaction, size, brandName, qa, imgaeUrl) {
  let param = new FormData(); //创建form对象
  param.append('file', imgaeUrl); //通过append向form对象添加数据
  param.append('loginId', loginId); //通过append向form对象添加数据
  param.append('modelName', modelName); //通过append向form对象添加数据
  param.append('modelPower', modelPower); //通过append向form对象添加数据
  param.append('price', price); //通过append向form对象添加数据
  param.append('powerWaste', powerWaste); //通过append向form对象添加数据
  param.append('attaction', attaction); //通过append向form对象添加数据
  param.append('size', size); //通过append向form对象添加数据
  param.append('brandName', brandName); //通过append向form对象添加数据
  param.append('qa', qa); //通过append向form对象添加数据
  return axios({
    url: '/sys/addminermodel',
    method: 'post',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: param
  })
}

//后台管理模块 / 矿机型号修改
export function httpSysUpdateminermodel(loginId, id, modelName, modelPower, price, powerWaste, attaction, size, brandName, qa) {
  let data = {
    loginId,
    id,
    modelName,
    modelPower,
    price,
    powerWaste,
    attaction,
    size,
    brandName,
    qa
  };
  return axios({
    url: '/sys/updateminermodel',
    method: 'post',
    data: qs.stringify(data)
  })
}


//后台管理模块 / 矿机型号修改 传递 图片格式
export function httpSysUpdateminermodelImg(loginId, id, modelName, modelPower, price, powerWaste, attaction, size, brandName, qa, imgaeUrl) {
  let param = new FormData(); //创建form对象
  param.append('file', imgaeUrl); //通过append向form对象添加数据
  param.append('id', id); //通过append向form对象添加数据
  param.append('loginId', loginId); //通过append向form对象添加数据
  param.append('modelName', modelName); //通过append向form对象添加数据
  param.append('modelPower', modelPower); //通过append向form对象添加数据
  param.append('price', price); //通过append向form对象添加数据
  param.append('powerWaste', powerWaste); //通过append向form对象添加数据
  param.append('attaction', attaction); //通过append向form对象添加数据
  param.append('size', size); //通过append向form对象添加数据
  param.append('brandName', brandName); //通过append向form对象添加数据
  param.append('qa', qa); //通过append向form对象添加数据
  return axios({
    url: '/sys/updateminermodel',
    method: 'post',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: param
  })
}



//后台管理模块 / 收益率管理
export function httpIncomeCurrencyparameter(npage, pagesize, currencyParameterId, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      currencyParameterId,
      begainTimeString,
      endTimeString,
    }
  };
  return axios({
    url: '/income/currencyparameter',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 矿机算力功率变化列表展示
export function httpSysMinerpowerlist(npage, pagesize, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      begainTimeString,
      endTimeString,
    }
  };
  return axios({
    url: '/sys/minerpowerlist',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 工单管理 我的工单
export function httpHoHandleorderlist(npage, pagesize, repairmanId, handleorderId, faultType, as_id, handleorderStatus, handleorderRank, begainTimeString, endTimeString) {
  let data = {
    npage,
    pagesize,
    conditionVo: {
      repairmanId,
      handleorderId,
      faultType,
      as_id,
      handleorderStatus,
      handleorderRank,
      begainTimeString,
      endTimeString
    }
  };
  return axios({
    url: '/ho/handleorderlist',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}


//后台管理模块 / 工单管理 接单
export function httpHoReceivehandleorder(id, repairmanId) {
  let data = {
    id,
    repairmanId
  };
  return axios({
    url: '/ho/receivehandleorder',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 工单管理 反馈
export function httpHoResponsehandleorder(id, repairmanId, faultType, remake) {
  let data = {
    id,
    repairmanId,
    faultType,
    remake
  };
  return axios({
    url: '/ho/responsehandleorder',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 工单管理 结单
export function httpHoOverhandleorder(id, repairmanId, faultType, remake, fixedMinerIds) {
  let data = {
    id,
    repairmanId,
    faultType,
    remake,
    fixedMinerIds
  };
  return axios({
    url: '/ho/overhandleorder',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 错误类型 查询所有错误类型
export function httpFtFindAllfaulttype() {
  return axios({
    url: '/ft/findAllfaulttype',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
  })
}

//后台管理模块 / 错误类型 修改
export function httpFtModifyfaulttype(id, faultType, deadline) {
  let data = {
    id,
    faultType,
    deadline
  };
  return axios({
    url: '/ft/modifyfaulttype',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 / 错误类型 新增
export function httpFtAddfaulttype(faultType, deadline) {
  let data = {
    faultType,
    deadline
  };
  return axios({
    url: '/ft/addfaulttype',
    method: 'post',
    headers: {
      'Content-type': 'application/json  '
    },
    data: JSON.stringify(data)
  })
}

//后台管理模块 /班次管理——查询值班员的所有班次
export function httpScheduleWorktime(rid = 0) {
  let data = {
    rid
  };
  return axios({
    url: '/schedule/worktime',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    // data: JSON.stringify(data)
    data: qs.stringify(data)
  })
}

//后台管理模块 /更新值班员工作时间
export function httpscheduleUpdate_time(wtId1, startTime1, endTime1, wtCategory, wtId2, startTime2, endTime2) {
  let data = {
    wtId1,
    startTime1,
    endTime1,
    wtCategory,
    wtId2,
    startTime2,
    endTime2
  };
  return axios({
    url: '/schedule/update_time',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json'
    // },
    // data: JSON.stringify(data)
    data: qs.stringify(data)
  })
}


//后台管理模块 /根据矿场编号对值班人员记录进行分页查询
export function httpscheduleAll_rota(cp, pageSize, mid) {
  let data = {
    cp,
    pageSize,
    mid
  };
  return axios({
    url: '/schedule/all_rota',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    data: qs.stringify(data)
    // data: JSON.stringify(data)
  })
}

//后台管理模块 /值班员管理——添加值班员记录
export function httpscheduleSave_rota(rotaNum, rid, rotaName, rotaAge, rotaSex, rotaPhone, rotaJoinWorkDate, rotaWorkingLife, rotaDepartment, mid) {
  let data = {
    rotaNum,
    rid,
    rotaName,
    rotaAge,
    rotaSex,
    rotaPhone,
    rotaJoinWorkDate,
    rotaWorkingLife,
    rotaDepartment,
    mid
  };
  return axios({
    url: '/schedule/save_rota',
    method: 'post',
    data: qs.stringify(data)
    // headers: {
    //   'Content-type': 'application/json  '
    // },

    // data: JSON.stringify(data)
  })
}

//后台管理模块 /值班员管理——更新值班员记录
export function httpscheduleUpdate_rota(rotaId, rotaNum, rid, rotaName, rotaAge, rotaSex, rotaPhone, rotaJoinWorkDate, rotaWorkingLife, rotaDepartment, mid) {
  let data = {
    rotaId,
    rotaNum,
    rid,
    rotaName,
    rotaAge,
    rotaSex,
    rotaPhone,
    rotaJoinWorkDate,
    rotaWorkingLife,
    rotaDepartment,
    mid
  };
  return axios({
    url: '/schedule/update_rota',
    method: 'post',
    data: qs.stringify(data)
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    // data: JSON.stringify(data)
  })
}

//后台管理模块 /值班员管理——删除值班员记录
export function httpscheduleDelete_rota(rotaId) {
  let data = {
    rotaId,
  };
  return axios({
    url: '/schedule/delete_rota',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    // data: JSON.stringify(data)
    data: qs.stringify(data)
  })
}

//后台管理模块 /排班管理——根据排班表编号、值班员编号、工作班次类别或工作日期对排班记录进行分页查询
export function httpscheduleFind_scheduling(cp, pageSize, sid, rotaId, wtCategory, sdate) {
  let data = {
    cp,
    pageSize,
    sid,
    rotaId,
    wtCategory,
    sdate
  };
  return axios({
    url: '/schedule/find_scheduling',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    // data: JSON.stringify(data)
    data: qs.stringify(data)
  })
}

//后台管理模块 /排班管理——新增排班记录
export function httpscheduleSave_scheduling(rotaId, wtCategory, sdate, state) {
  let data = {
    rotaId,
    wtCategory,
    sdate,
    state
  };
  return axios({
    url: '/schedule/save_scheduling',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    // data: JSON.stringify(data)
    data: qs.stringify(data)
  })
}

//后台管理模块 /排班管理——根据排班表编号删除对应记录
export function httpscheduleDelete_scheduling(sid) {
  let data = {
    sid
  };
  return axios({
    url: '/schedule/delete_scheduling',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    // data: JSON.stringify(data)
    data: qs.stringify(data)
  })
}

//后台管理模块 /排班管理——根据排班表编号更新对应记录
export function httpscheduleUpdate_scheduling(sid, rotaId, wtCategory, sdate, state) {
  let data = {
    sid,
    rotaId,
    wtCategory,
    sdate,
    state
  };
  return axios({
    url: '/schedule/update_scheduling',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json  '
    // },
    // data: JSON.stringify(data)
    data: qs.stringify(data)
  })
}


//后台管理模块 /全网算力
export function httpGETpoolstatsmerge() {
  return axios({
    url: "https://sz-pool.api.btc.com/v1/coins-income",
    method: "get",
    params: {
      access_key: 'r_XcBYADIE1paph',
      puid: '239823',
      lang: 'zh-cn'
    }
  })
}

//后台管理模块 /矿场算力
export function httpGETSZpool() {
  return axios({
    url: "https://sz-pool.api.btc.com/public/v1/pool/stats/merge?access_key=r_XcBYADIE1paph&puid=239823&lang=zh-cn",
    method: "get",
    // params: {
    //   access_key: 'r_XcBYADIE1paph',
    //   puid: '239823',
    //   lang: 'zh-cn'
    // }
  })
}


//大盘统计
export function httpStaFindMarkDo(asId) {
  let data = {
    asId
  };
  return axios({
    url: '/sta/findMarkDo',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 / 获取矿机总数据
export function httpStaFind() {
  return axios({
    url: "/sta/findMinerCount",
    method: "get",
  })
}


//后台管理模块 /故障类型
export function httpStaVariousFaultCount() {
  return axios({
    url: "/sta/variousFaultCount",
    method: "get",
  })
}


//后台管理模块 /统计管理——矿机类型故障率
export function httpfindMalfunctionTypeRate(startTime, endTime) {
  let data = {
    startTime,
    endTime
  };
  return axios({
    url: '/sta/findMalfunctionTypeRate',
    method: 'post',
    data: qs.stringify(data)
  })
}

//后台管理模块 /统计管理——值班人员回单及时率
export function httpfindRepairmanRate(startTime, endTime) {
  let data = {
    startTime,
    endTime
  };
  return axios({
    url: '/sta/findRepairmanRate',
    method: 'post',
    data: qs.stringify(data)
  })
}


/* 前台页面 */

//前台管理模块 / 客户登录
export function httpLogin(username, loginPassword) {
  let data = {
    username,
    loginPassword
  };
  return axios({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

//前台管理模块 / 个人中心——初始化
export function httpUserSingle(uid) {
  let data = {
    uid
  };
  return axios({
    url: '/user/single',
    method: 'post',
    data: qs.stringify(data)
  })
}

//前台管理模块 / 个人中心——登录记录
export function httpUserAllLog(uid) {
  let data = {
    uid
  };
  return axios({
    url: '/user/alllog',
    method: 'post',
    data: qs.stringify(data)
  })
}

//算力租赁——收益记录
export function httpUserProfit(cp, uid) {
  let data = {
    cp,
    uid
  };
  return axios({
    url: '/user/profit',
    method: 'post',
    data: qs.stringify(data)
  })
}


//矿机租赁——收益记录
export function httpUserMachineProfit(cp, uid) {
  let data = {
    cp,
    uid
  };
  return axios({
    url: '/user/machine/profit',
    method: 'post',
    data: qs.stringify(data)
  })
}


//矿机租赁——购买记录
export function httpUserMachineBuyrecord(cp, uid) {
  let data = {
    cp,
    uid
  };
  return axios({
    url: 'user/machine/buyrecord',
    method: 'post',
    data: qs.stringify(data)
  })
}

//算力租赁——购买记录
export function httpUserPowerBuyRecord(cp, uid) {
  let data = {
    cp,
    uid
  };
  return axios({
    url: '/user/power/buyrecord',
    method: 'post',
    data: qs.stringify(data)
  })
}

//获得钱包地址
export function httpSysCustuserwalleturl(cp, uid) {
  let data = {
    cp,
    uid
  };
  return axios({
    url: '/sys/getcustuserwalleturl',
    method: 'post',
    data: qs.stringify(data)
  })
}
