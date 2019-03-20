import * as MutationType from '../../MutationType'
import $http from '../../../Api/Http'

// commit 到 mutation  dispatch 到另外一个 action 
export default {

  // 注册新用户
  regiterUser({ dispatch, commit, state, rootState }, payloay) {
    $http.post({
      URLType: 'regiterUser',
      data: payloay.data
    }, (data) => {
      debugger
      //   dispatch('fetchAllTags', data.items)
      commit(MutationType.REGISTER_USER, { data: data})
    })
  },

  // 获取用户
  fetchUser({ dispatch, commit, state, rootState }, payloay) {
    $http.fetch({
      URLType: 'fetchUser'
    }, (data) => {

      if (data.code == 0) {
        commit(MutationType.FETCH_USER, { data: data})
      }
    })
  },

  // 删除用户
  delUser({dispatch, commit, state, rootState},payloay) {


    $http.delete({
      URLType: 'delUser',
      data: payloay.data
    }, (data) => {

        if(data.code==0){
            commit(MutationType.DEL_USERINFO,payloay);
        }

    })
  },


  updateUser({dispatch,commit},payloay){

    $http.put({
        URLType:"updateUser",
        data:payloay.data
    },(data)=>{

        if(data.code == 0){
            commit(MutationType.UPDATE_USER,payloay.data)
        }

    });


  }









}
