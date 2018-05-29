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
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Contact</h5>
            <p class="card-text">email: {{customer.email}}</p>
            <p class="card-text">phone: {{customer.phone}}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Mail</h5>
            <div class="name">{{customer.name}}</div>
            <div class="street">{{customer.address.address_1}}</div>
            <div class="state">{{customer.address.city}},  {{customer.address.state}} {{customer.address.zip}}</div>
          </div>
        </div>

      </div>
    </div>

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
