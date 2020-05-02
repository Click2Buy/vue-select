import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from './views/Demo.vue'
import Api from './views/Api.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Demo',
    component: Demo
  },
  {
    path: '/api',
    name: 'Api',
    component: Api
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
