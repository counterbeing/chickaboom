import Vue from 'vue'
import Router from 'vue-router'
import Customers from '@/components/customers'
import Customer from '@/components/customer'
import NewCustomer from '@/components/new-customer'
import Jobs from '@/components/jobs'

Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
