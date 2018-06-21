import Vue from 'vue'
import Router from 'vue-router'
import Customers from '@/components/customers'
import Customer from '@/components/customer'
import NewCustomer from '@/components/new-customer'
import Jobs from '@/components/jobs'
import Job from '@/components/job'
import NewJob from '@/components/new-job'
import Signin from '@/components/auth/signin'
import Signup from '@/components/auth/signup'
import store from '@/store'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

// router
const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      authRequired: false
    }
  },

  {
    path: '/signin',
    name: 'signin',
    component: Signin,
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
    component: Customer
  },
  {
    path: '/customer/new',
    name: 'new-customer',
    component: NewCustomer
  },
  // {
  //   path: '/customer/:id/edit',
  //   name: 'edit-customer',
  //   component: EditCustomer
  // },
  {
    path: '/jobs',
    name: 'jobs',
    component: Jobs
  },
  {
    path: '/job/:id',
    name: 'job',
    component: Job
  },
  {
    path: '/jobs/new',
    name: 'new-job',
    component: NewJob
  }
]

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const authRequired = to.matched.some((route) => {
    if(!('authRequired' in route.meta)) return true
    return route.meta.authRequired
  })

  if (authRequired && !currentUser) {
    // console.log('redirect to signin, and save requested route', to);
    store.dispatch('setRequestedRoute', to)
    next('/signin')
  // } else if (store.getters.requestedRoute && authRequired && currentUser) {
    // next(requested.path)
  } else {
    next()
  }
})

export default router