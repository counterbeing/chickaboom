<template>
  <div class="customer-list" v-if="customer">
    <contact-info :customer="customer"/>
    <hr>
    <jobs :customer-id='customer.id'/>
  </div>
</template>

<script>
 import Jobs from '@/components/jobs'
 import ContactInfo from  '@/components/contact-info'
 import { mapGetters, mapActions } from 'vuex'

   export default {
    name: 'customer',
    components: { Jobs, ContactInfo },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['customers']),
     customer() {
       return this.customers.find((c) => c.id === this.$route.params.id)
     }
    },
    methods: {
      ...mapActions(['deleteCustomer'])
    }
  }

</script>
