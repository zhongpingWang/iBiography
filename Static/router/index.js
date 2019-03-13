import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Register from '../src/register/Index'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/ibiography/page/register',
      name:"register",
      component: Register
    }
  ]
})

export default router
