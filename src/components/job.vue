
<template>
  <div  v-if='job'>
    <contact-info :customer="customer" class='sub-section'/>
    <div class="sub-section">
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
  </div>

    <div class="sub-section">
      <h3>Job Location</h3>
      <hr>
      <google-map :job="job" v-if='job'/>
    </div>

    <div class="row">
      <div class='sub-section col-lg-6' v-if='job.videos'>
        <videos :videos='job.videos'/>
      </div>

      <div class='sub-section col-lg-6' v-if='job.photos'>
        <photos :photos='job.photos'/>
      </div>
    </div>

    <div class="sub-section">
      <h3>Order</h3>
      <order :job='job'/>
    </div>

  </div>
</template>

<script>
  import Todos from  '@/components/partials/todos'
  import Weather from  '@/components/partials/weather'
  import ContactInfo from  '@/components/partials/contact-info'
  import GoogleMap from '@/components/partials/map'
  import Videos from '@/components/partials/videos'
  import Photos from '@/components/partials/photos'
  import Order from '@/components/partials/order'
  import AddToCal from '@/components/partials/add-to-cal'

  import { mapGetters } from 'vuex'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

  export default {
    name: 'job',
    components: {
      GoogleMap, ContactInfo, AddToCal, Weather, FontAwesomeIcon,
      Todos, Videos, Order, Photos
    },
    props: ['customerId'],
    computed: {
      ...mapGetters(['jobById', 'customers']),
      job_time() { return this.job.date.toDate() },
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
.sub-section{
  /* border: 1px solid red; */
  padding-top: 1em;
}
.calendar-icon {
  font-size: 3em;
  text-align: center;
  display: block;
  padding: 1.2rem;
}
</style>
