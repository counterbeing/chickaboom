import Vue from 'vue'
import Router from 'vue-router'
import Customers from '@/components/customers'
import Customer from '@/components/customer'
import NewCustomer from '@/components/new-customer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
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
      path: '/customer/:id/edit',
      name: 'new-customer',
      component: NewCustomer
    }
  ]
})
