
<template>
  <div class="job-list">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h3>Job</h3>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <router-link
          class="btn btn-sm btn-outline-secondary"
          :to="{name: 'new-job', params: { customerId }}">
          New Job
          </router-link>
        </div>
      </div>
    </div>

    {{job}}
    {{customer.name}}
  </div>
</template>

<script>
  import router from '@/router'
  import { mapGetters } from 'vuex'


 export default {
   name: 'jobs',
   props: ['customerId'],
   data() {
     return {
     }
   },
   computed: {
     ...mapGetters(['jobById', 'customers']),
     job() {
       return this.jobById(this.$route.params.id)
     },
     customer(){
       if(this.job.customer_id === null) return null
       const customer = this.customers.find(c => this.job.customer_id === c.id)
       if(!customer) return null
       return customer
     }
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
