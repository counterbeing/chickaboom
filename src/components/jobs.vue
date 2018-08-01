<template>
  <div class="job-list">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h3>Jobs</h3>
      <div class="btn-toolbar mb-2 mb-md-0 d-print-none">
        <div class="btn-group mr-2">
          <router-link
          class="btn btn-sm btn-outline-secondary"
          :to="{name: 'new-job', params: { customerId }}">
          New Job
          </router-link>
        </div>
      </div>
    </div>

    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Videos</th>
          <th>Photos</th>
          <th>Hours</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(job, index) in filteredJobs'
          v-bind:key='job.id'
          class="job-row"
          v-on:dblclick='openJob(job.id)'>
          <td>2018.07.15</td>
          <td>{{customer[index]}}</td>
          <td>{{job.videos.length}}</td>
          <td>10</td>
          <td>6.5 Hours</td>
          <td>$520.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import router from '@/config/router'
  import { mapGetters } from 'vuex'


 export default {
   name: 'jobs',
   props: ['customerId'],
   data() {
     return {
     }
   },
   computed: {
     ...mapGetters(['jobs', 'customers']),
     customer(){
       return this.filteredJobs.map((job) => {
         if(job.customer_id === null) return null
         const customer = this.customers.find(c => job.customer_id === c.id)
         if(!customer) return null
         return customer.name
       })
     },
     filteredJobs() {
       const jobsWithCustomer = this.jobs.filter((job) => {
         return this.customers.find(c => job.customer_id === c.id)
       })
       // Show only jobs for a partiuclar customer if needed
       if(!this.customerId) return jobsWithCustomer
       return jobsWithCustomer.filter((job) => {
         return job.customer_id === this.customerId
       })
     },
   },
   created() {
   },
   methods: {
     openJob(id) {
       router.push({ name: 'job', params: { id }})
     }
   }
 }
</script>
