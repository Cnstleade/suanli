export default {
  Roles({
    commit
  }, newrouter) {
    return new Promise((resolve, reject) => {
      commit('SET_NEWROUER', newrouter); //存储最新路由
      resolve(newrouter);
    }).catch(error => {
      reject(error);
    });
  },
}
