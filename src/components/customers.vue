<template>
  <div class="customer-list">
    <h3>Customers</h3>
    <table class="table">
      <tr>
        <td>Name</td>
        <td>Email</td>
        <td>Phone</td>
      </tr>
      <tr v-for='customer in customers'
        v-bind:key='customer.id'
        class="customer-row"
        v-on:dblclick='openCustomer(customer.id)'>
        <td>{{customer.name}}</td>
        <td>{{customer.email}}</td>
        <td>{{customer.phone}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
 import db from './firebase-init'
 import router from '@/router'

 export default {
   name: 'customers',
   data() {
     return {
       customers: []
     }
   },
   created() {
     db.collection('customers').get().then(
       snap => {
        snap.forEach(doc => {
          const data = {
            'id': doc.id,
            'name': doc.data().name,
            'billing_address': doc.data().billing_address,
            'phone': doc.data().phone,
            'email': doc.data().email,
          }
          this.customers.push(data)
        })
      })
   },
   methods: {
     openCustomer(id) {
       router.push({ name: 'customer', params: { id }})
     }
   }
 }
</script>
