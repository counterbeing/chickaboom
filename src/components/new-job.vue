<template>
  <div class="customer-list">
    <div class="col-md-12 order-md-1">
          <h3 class="mb-3">New Job</h3>
          <form class="needs-validation" @submit.prevent="submit" novalidate>
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
            <h4>General</h4>

            <div class="col-md-6 mb-3">

              <div class="custom-control custom-checkbox">
              <input
              class="custom-control-input"
              id="same-address"
              type="checkbox"
              v-model="job.permission_to_fly"
              true-value="yes"
              false-value="no"
              >
              <label class="custom-control-label" for="same-address">Permission to fly?</label>
            </div>
            </div>

            <hr>
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h2 class="h3">Videos</h2>
              <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                  <button @click='addVideo' class="btn btn-sm btn-outline-secondary">Add Video</button>
                </div>
              </div>
            </div>

            <new-video
            v-for='(video, index) in job.videos'
            :key='`video-${index}`'
            :value='job.videos[index]'
            @change='updateVideo(index, ...arguments)'
            />

            <button class="btn btn-primary btn-lg btn-block">Save Job</button>
      </form>
    </div>
  </div>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import NewVideo from './new-video'
  import router from '@/router'
  import { mapGetters } from 'vuex'

  export default {
    components: { VueGoogleAutocomplete, NewVideo },
    name: 'new-job',
    data() {
      return {
        format_select: null,
        fps_select: null,
        customer_select: null,
        job: {
          customer_id: null,
          permission_to_fly: false,
          photos: [{
            quantity: 0,
            aspect_ratio: null,
          }],
          videos: [{
            duration: 0,
            format: null,
            frame_rate: null,
            notes: null,
          }],
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
      updateVideo(index, video) {
        this.job.videos[index] = video
      },
      addVideo() {
        const template = {
            duration: 0,
            format: null,
            frame_rate: null,
            notes: null,
          }
        this.job.videos.push(template)
      },
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
      submit() {
        this.$store.dispatch('addJob', this.job).then(() => {
          router.push({ name: 'customer', params: { id: this.job.customer_id }})
        })
      }
    },

    created() {
      const customerId = this.$route.params.customerId
      if(!customerId) return
      const option = this.customer_options.find(c => c.value == customerId)
      this.customer_select = option
    },

    computed: {
      ...mapGetters(['customers']),
      customer() {
        const id = this.customer_select
        if (id === null) return null
        return this.customers.find(c => c.id === id.value)
      },
      customer_options() {
        return this.customers.map((customer) => {
          return { label: customer.name, value: customer.id}
        }).filter((customer) => {
          return customer.label !== null
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
      },
    },
  }
</script>
