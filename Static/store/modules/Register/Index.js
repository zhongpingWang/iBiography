
import actions from './Actions'
import mutations from './Mutations'
// initial state
const state = { 

  UserList:[],

  pageIndex:1, //加载的页码

  WSRoot:[],
}

// getters
const getters = {
  RegisterStore: state => state
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
} 