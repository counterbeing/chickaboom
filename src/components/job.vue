
<template>
  <div class="job-list">
      <contact-info :customer="customer"/>
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

    <pre>
    {{job}}
    </pre>

    <hr>
    <h3>Job Location</h3>
    <google-map :address="job.address" v-if='job'/>

    <hr>
    <h3>Videos</h3>

    <div v-for='(video, index) in job.videos' :key='index'>
      <h2>{{index + 1}}</h2>
      <pre>
      {{video}}
      </pre>
    </div>
  </div>
</template>

<script>
  import ContactInfo from  '@/components/contact-info'
  import router from '@/router'
  import { mapGetters } from 'vuex'
  import GoogleMap from './map'


 export default {
   name: 'job',
   components: { GoogleMap, ContactInfo },
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
       if(!this.job) return null
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
