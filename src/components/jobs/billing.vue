
<template>
  <div v-if='job'>
    <div class="sub-section">
      <h3>Order</h3>
      <order :job='job'/>
    </div>
  </div>
</template>

<script>
  import Order from '@/components/partials/order'
  import { mapGetters } from 'vuex'
  // import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

 export default {
   components: { Order },
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
