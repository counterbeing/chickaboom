<template id="">
  <div class="">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h3>{{customer.name}}</h3>
      <div class="btn-toolbar mb-2 mb-md-0 d-print-none">
        <div class="btn-group mr-2">
          <a href="#" @click="deleteCustomer(customer.id)" class="btn btn-sm btn-outline-secondary">Delete Customer</a>
          <router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'new-customer'}">Edit Customer</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Contact</h5>
            <table class='contact-table'>
              <tr>
                <td>name</td> <td> {{customer.name}}</td>
              </tr>
              <tr>
                <td>email</td> <td> <a :href="'mailto:' + customer.email">{{customer.email}}</a></td>
              </tr>
              <tr>
                <td>phone</td> <td> <a :href="phone_link"> {{customer.phone}}</a></td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Billing Address</h5>
            <div class="street">{{customer.address.address_1}}</div>
            <div class="state">{{customer.address.city}},  {{customer.address.state}} {{customer.address.zip}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export  default {
  name: 'contact-info',
  props: ['customer'],
  methods: {
    ...mapActions(['deleteCustomer'])
  },
  computed: {
    phone_link () {
      return `tel:${this.customer.phone}`
    }
  }
}
</script>

<style>
    .contact-table tr td:first-child {
      color: #777;
      text-align: right;
      padding-right: 0.25em;
    }

</style>
