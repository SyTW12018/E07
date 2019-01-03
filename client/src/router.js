import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Registro from './views/Registro'
import Account from './views/Account'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registro
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
    }
  ]
})
