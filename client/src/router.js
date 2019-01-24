import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Registro from './views/Registro'
import Account from './views/Account'
import Enterprise from './views/Enterprise'
import EnterpriseProfile from './components/EnterpriseProfile'
import Jobs from './views/Jobs'
import JobList from './components/JobList'
import User from './views/User'
import Feed from './views/Feed'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      alias: '/home'
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
      path: '/feed',
      name: 'Feed',
      component: Feed,
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
        { path: "jobs", component: JobList, props: true }
      ]
    },
    {
      path: '/user/:username',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: Jobs,
      meta: {
        requiresAuth: true
      }
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