import Vue from 'vue'
import Router from 'vue-router'
import Customers from '@/components/customers'
import store from '@/store'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: load('auth/signup'),
    meta: {
      authRequired: false
    }
  },

  {
    path: '/signin',
    name: 'signin',
    component: load('auth/signin'),
    meta: {
      authRequired: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: Customers
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers
  },
  {
    path: '/customer/:id',
    name: 'customer',
    component: load('customer')
  },
  {
    path: '/customer/new',
    name: 'new-customer',
    component: load('new-customer')
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: load('jobs')
  },
  {
    path: '/job/:id',
    name: 'job',
    component: load('job')
  },
  {
    path: '/jobs/new',
    name: 'new-job',
    component: load('new-job')
  },
  {
    path: '/jobs/:id/billing',
    name: 'job-billing',
    component: load('jobs/billing')
  },
  {
    path: '/jobs/:id/work',
    name: 'job-work',
    component: load('jobs/work')
  },
  {
    path: '/jobs/:id/files',
    name: 'job-files',
    component: load('jobs/files')
  }
]

function load(path) {
  return function(resolve) {
    require(['@/components/' + path + '.vue'], resolve);
  }
}

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const authRequired = to.matched.some((route) => {
    if(!('authRequired' in route.meta)) return true
    return route.meta.authRequired
  })

  if (authRequired && !currentUser) {
    store.dispatch('setRequestedRoute', to)
    next('/signin')
  } else {
    next()
  }
})

export default router
