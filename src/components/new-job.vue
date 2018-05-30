<template>
  <div class="customer-list">
    <div class="col-md-12 order-md-1">
          <h3 class="mb-3">New Job</h3>
          <form class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="customer">Customer</label>
                <v-select v-model='customer_select' :options="customer_options" id="customer"/>
                <div class="invalid-feedback">
                  Please select a customer.
                </div>
              </div>
            </div>

            <div class="mb-3"  v-show='!showAddress'>
              <label for="customer.email">Flight Location</label>
              <vue-google-autocomplete
              ref="address"
              id="place-search"
              classname="form-control"
              placeholder="Search for an address"
              v-on:placechanged="getAddressData"
              country="us"
              />
            </div>

            <div v-show='showAddress'>
              <div class="mb-3">
                <label for="address">Address</label>
                <input v-model='job.address.address_1' type="text" class="form-control" id="address_1" placeholder="1234 Main St" required>
                <div class="invalid-feedback">
                  Please enter an address.
                </div>
              </div>

              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="city">City</label>
                  <input v-model='job.address.city' type="text" class="form-control" id="city" placeholder="" required>
                  <div class="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
                <div class="col-md-4 mb-1">
                  <label for="state">State</label>
                  <input v-model='job.address.state' type="text" class="form-control" id="state" placeholder="" required>
                  <div class="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="zip">Zip</label>
                  <input v-model='job.address.zip' type="text" class="form-control" id="zip" placeholder="" required>
                  <div class="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
              </div>
            </div>

            <hr>
            <h4>Video</h4>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="format">Format</label>
                <v-select v-model='format_select' :options="formats" id="format"></v-select>
                <div class="invalid-feedback">
                  Please select a customer.
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label for="fps">Frames Per Second</label>
                <v-select v-model='fps_select' :options="fps_options" id="fps"></v-select>
                <div class="invalid-feedback">
                  Please select a frame rate.
                </div>
              </div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" @click='submit'>Save Job</button>
      </form>
    </div>
  </div>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import db from './firebase-init'
  import formats from './formats'
  import { mapGetters } from 'vuex'


  export default {
    components: { VueGoogleAutocomplete },
    name: 'new-job',
    data() {
      return {
        format_select: null,
        fps_select: null,
        customer_select: null,
        job: {
          customer_id: null,
          permission_to_fly: false,
          photos: {
            quantity: 0,
            aspect_ratio: null,
          },
          videos: {
            duration: 0,
            format: null,
          },
          address: {
            address_1: null,
            state: null,
            zip: null,
            city: null,
          },
        },
      }
    },
    methods: {
      getAddressData: function (addressData) {
        this.job.address.state = addressData.administrative_area_level_1
        this.job.address.zip = addressData.postal_code
        this.job.address.city = addressData.locality
        this.job.address.country = addressData.country
        this.job.address.address_1 = `${addressData.street_number} ${addressData.route}`
        this.job.address.latitude = addressData.latitude
        this.job.address.longitude = addressData.longitude
      },
      autofillAddressFromCustomer: function () {
        this.job.address = this.customer.address
      },
      submit: function () {
        db.collection('jobs').add(this.job)
      }
    },

    computed: {
      ...mapGetters(['customers']),
      fps_options() {
        if(!this.format_select) return []
        return formats[this.format_select.value].frame_rates.map((r) => {
          return { label: r.toString(), value: r.toString() }
        })
      },
      customer() {
        const id = this.customer_select
        if (id === null) return null
        const cust = this.customers.find(c => c.id === id.value)
        return cust
      },
      customer_options() {
        return this.customers.map((customer) => {
          return { label: customer.name, value: customer.id}
        }).filter((customer) => {
          return customer.label !== null
        })
      },
      formats() {
        return Object.keys(formats).map((format) => {
          const chosen = formats[format]
          return {
            label: `${format} (${chosen.dimensions.width} x ${chosen.dimensions.height}px)`,
            value: format
          }
        })
      },
      showAddress() {
        const a = this.job.customer_id
        return a !== null && a !== ''
      }
    },

    watch: {
      customer() {
        this.autofillAddressFromCustomer()
        this.job.customer_id = this.customer.id
      }
    },
  }
</script>
