<template>
  <div class="customer-list">
    <h3>Customers</h3>
    <ul v-for='customer in customers'>
      <li>{{customer.name}}</li>
    </ul>
  </div>
</template>

<script>
 export default {
   name: 'customer-list',
   data() {
     return {
     }
   }
 }
</script>
