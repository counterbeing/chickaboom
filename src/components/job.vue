
<template>
  <div  v-if='job' class="job-list">
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

    <div class="row">

      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
             <div class="calendar-icon">
               <font-awesome-icon icon="calendar-alt" />
             </div>
            <h6 class="card-subtitle mb-2 text-muted">2018-06-20</h6>
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
    <h3>Videos</h3>

    <div v-for='(video, index) in job.videos' :key='index'>
      <h2>{{index + 1}}</h2>
      <pre>
        {{video}}
      </pre>
    </div>

    <hr>
    <h3>Photos</h3>

    <!-- <div v-for='(video, index) in job.videos' :key='index'>
      <h2>{{index + 1}}</h2>
      <pre>
        {{video}}
      </pre>
    </div> -->
  </div>
</template>

<script>
  import Weather from  '@/components/weather'
  import Todos from  '@/components/todos'
  import ContactInfo from  '@/components/contact-info'
  import router from '@/router'
  import { mapGetters } from 'vuex'
  import GoogleMap from './map'
  import AddToCal from './add-to-cal'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

 export default {
   name: 'job',
   components: { GoogleMap, ContactInfo, AddToCal, Weather, FontAwesomeIcon, Todos },
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

   methods: {
     openJob(id) {
       router.push({ name: 'job', params: { id }})
     }
   }
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
