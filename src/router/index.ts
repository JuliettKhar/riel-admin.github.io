import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: {name: 'users'},
  },
  {
    path: '/new/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "create" */ '../views/User.vue')
  },
  {
    path: '/new/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/User.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UsersTable.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
