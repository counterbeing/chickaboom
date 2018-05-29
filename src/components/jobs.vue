<template>
  <div class="job-list">
    <h3>Jobs</h3>
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
          <td>{{job.state}}</td>
          <td>{{job.zip}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
 import db from './firebase-init'
 import router from '@/router'

 export default {
   name: 'jobs',
   data() {
     return {
       jobs: []
     }
   },
   created() {
     db.collection('jobs').get().then(
       snap => {
        snap.forEach(doc => {
          const data = {
            'id': doc.id,
            'address': doc.data().address,
            'notes': doc.data().notes,
            'format': doc.data().format
          }
          this.jobs.push(data)
        })
      })
   },
   methods: {
     openCustomer(id) {
       router.push({ name: 'customer', params: { id }})
     }
   }
 }
</script>
