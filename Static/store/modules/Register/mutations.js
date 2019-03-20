import * as MutationType from '../../MutationType'

export default {
  // 注册
  [MutationType.REGISTER_USER](state, payloay) {
    debugger
  },

  // 获取
  [MutationType.FETCH_USER](state, payloay) { 
    state.UserList = payloay.data.data
  },

  //删除用户
  [MutationType.DEL_USERINFO](state,payloay){

    $.each(state.UserList,function(i,item){
        if(item._id == payloay.data._id){
            state.UserList.splice(i,1);
            return false;
        }
    });
    

  }
}
