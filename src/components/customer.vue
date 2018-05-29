<template>
  <div class="customer-list">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h3>{{customer.name}}</h3>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'new-customer'}">Edit Customer</router-link>
        </div>
      </div>
    </div>
    <h4>Contact</h4>
    <ul>
      <li>{{customer.phone}}</li>
      <li><a href="mailto:${customer.email}">{{customer.email}}</a></li>
    </ul>

    <hr>
    <p>jobs</p>
  </div>
</template>

<script>
 import db from './firebase-init'

 export default {
   name: 'customers',
   data() {
     return {
       customer: null
     }
   },
   created() {
     db.collection('customers').doc(this.$route.params.id).get().then(snap => {
       this.customer = snap.data()
     })

   },
   methods: {
   }
 }
</script>
