<template>
  <div class="customer-list">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 class="h3">Customers</h1>
      <div class="btn-toolbar mb-2 mb-md-0 d-print-none">
        <div class="btn-group mr-2">
          <router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'new-customer'}">New Customer</router-link>
        </div>
      </div>
    </div>

    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='customer in customers'
          v-bind:key='customer.id'
          class="customer-row"
          v-on:dblclick='openCustomer(customer.id)'>
          <td>{{customer.name}}</td>
          <td>{{customer.email}}</td>
          <td>{{customer.phone}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
 import router from '@/config/router'
 import { mapGetters } from 'vuex'

 export default {
   name: 'customers',
   data() {
     return { }
   },
   created() {},
   computed: {
     ...mapGetters(['customers'])
   },
   methods: {
     openCustomer(id) {
       router.push({ name: 'customer', params: { id }})
     }
   }
 }
</script>
