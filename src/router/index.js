import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VuePolling from "vue-polling"
import vueJquery from "vue-jquery"


Vue.use(VueRouter)
Vue.use(VuePolling)
Vue.use(vueJquery)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/poll',
    name: 'poll',
    component: ()=> import('../views/Poll.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
