
<template>
  <div  v-if='job' class="job-list">
    <contact-info :customer="customer"/>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">

      <h3>Job</h3>
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

    <div class="row">

      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
             <div class="calendar-icon">
               <font-awesome-icon icon="calendar-alt" />
             </div>
            <h6 class="card-subtitle mb-2 text-muted">{{ job_time | long_date }}</h6>
            <p>{{ job_time | default_time }}</p>
            <add-to-cal :job='job' :customer='customer'/>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <weather :job="job"/>
      </div>

      <div class="col-md-6">
        <todos :job='job'/>
      </div>
    </div>

    <hr>
    <h3>Job Location</h3>
    <google-map :address="job.address" v-if='job'/>

    <hr>

    <videos :videos='job.videos'/>

    <hr>

    <h3>Photos</h3>
  </div>
</template>

<script>
  import Todos from  '@/components/partials/todos'
  import Weather from  '@/components/partials/weather'
  import ContactInfo from  '@/components/partials/contact-info'
  // import router from '@/router'
  import { mapGetters } from 'vuex'
  import GoogleMap from './map'
  import AddToCal from './add-to-cal'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import Videos from '@/components/partials/videos'

 export default {
   name: 'job',
   components: {
     GoogleMap, ContactInfo, AddToCal, Weather, FontAwesomeIcon, Todos, Videos
   },
   props: ['customerId'],
   computed: {
     ...mapGetters(['jobById', 'customers']),
     job_time() { return '2018-06-22 15:00:00' },
     duration() { return 3 },
     job() { return this.jobById(this.$route.params.id) },
     customer(){
       if(!this.job) return null
       const customer = this.customers.find(c => this.job.customer_id === c.id)
       if(!customer) return null
       return customer
     }
   },
   methods: { }
 }
</script>

<style>
    .calendar-icon {
      font-size: 3em;
      text-align: center;
      display: block;
      padding: 1.2rem;
    }
</style>
