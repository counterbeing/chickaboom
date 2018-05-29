<template>
  <div class="customer-list">
    <h3>Customer</h3>
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
     db.collection('customers').get(this.$route.params.id).then(
       snap => {
         console.log(snap);
      })
   },
   methods: {
   }
 }
</script>
