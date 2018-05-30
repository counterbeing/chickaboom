<template>
  <div class="job-list">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h3>Jobs</h3>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'new-job'}">New Job</router-link>
        </div>
      </div>
    </div>

    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>State</th>
          <th>Duration</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='job in jobs'
          v-bind:key='job.id'
          class="job-row"
          v-on:dblclick='openCustomer(job.id)'>
          <td>{{job.address}}</td>
          <td>{{job.customer_id}}</td>
          <td>{{job.zip}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import router from '@/router'
  import { mapGetters } from 'vuex'


 export default {
   name: 'jobs',
   data() {
     return {
     }
   },
   computed: {
     ...mapGetters(['jobs', 'customers']),
   },
   created() {
   },
   methods: {
     openCustomer(id) {
       router.push({ name: 'customer', params: { id }})
     }
   }
 }
</script>
