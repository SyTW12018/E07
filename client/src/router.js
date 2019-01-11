import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Registro from './views/Registro'
import Account from './views/Account'
import Enterprise from './views/Enterprise'
import EnterpriseProfile from './components/EnterpriseProfile'
import EnterpriseJobs from './components/EnterpriseJobs'

Vue.use(Router)

let router = new Router({
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
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/business/:name',
      name: 'Enterprise',
      component: Enterprise,
      meta: {
        requiresAuth: true
      },
      children: [
        { path: "", component: EnterpriseProfile },
        { path: "jobs", component: EnterpriseJobs, props: true }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login', params: { nextUrl: to.fullPath }
      })
    }
    else {
      next();
    }
  }
  else {
    next();
  }
})

export default router;