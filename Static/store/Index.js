import Vue from 'vue'
import Vuex from 'vuex'

import RegisterStore from './modules/Register/Index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    RegisterStore},
  strict: debug
})
