<template>
  <div class="customer-list">



    <div class="col-md-12 order-md-1">
          <h3 class="mb-3">New Customer</h3>
          <form class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="name">Name</label>
              <input v-model='name' type="text" class="form-control" id="name" placeholder="Jesus H. Christ" value="" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div class="mb-3">
              <label for="email">Email</label>
              <input v-model='email' type="email" class="form-control" id="email" placeholder="you@example.com">
              <div class="invalid-feedback">
                Please enter a valid email address for  shipping updates.
              </div>
            </div>

            <div class="mb-3">
              <label for="phone">Phone</label>
              <input v-model='phone' type="tel" class="form-control" id="phone" placeholder="555-555-5555">
              <div class="invalid-feedback">
                Please enter a valid email address for  shipping updates.
              </div>
            </div>

            <div class="mb-3"  v-show='!showAddress'>
              <label for="email">Billing Address</label>
              <vue-google-autocomplete
              ref="address"
              id="place-search"
              classname="form-control"
              placeholder="Search for billing address"
              v-on:placechanged="getAddressData"
              country="us"
              />
            </div>

            <div v-show='showAddress'>
              <div class="mb-3">
                <label for="address">Address</label>
                <input v-model='address.address_1' type="text" class="form-control" id="address_1" placeholder="1234 Main St" required>
                <div class="invalid-feedback">
                  Please enter a billing address.
                </div>
              </div>

              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="zip">City</label>
                  <input v-model='address.city' type="text" class="form-control" id="city" placeholder="" required>
                  <div class="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
                <div class="col-md-4 mb-1">
                  <label for="state">State</label>
                  <input v-model='address.state' type="text" class="form-control" id="state" placeholder="" required>
                  <div class="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="zip">Zip</label>
                  <input v-model='address.zip' type="text" class="form-control" id="zip" placeholder="" required>
                  <div class="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Save Customer</button>
      </form>
    </div>
  </div>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  export default {
    components: { VueGoogleAutocomplete },
    name: 'new-customer',
    data() {
      return {
        phone: null,
        name: null,
        email: null,
        address: {
          address_1: null,
          state: null,
          zip: null,
          city: null,
        },
      }
    },
    methods: {
      getAddressData: function (addressData) {
        this.address.state = addressData.administrative_area_level_1
        this.address.zip = addressData.postal_code
        this.address.city = addressData.locality
        this.address.country = addressData.country
        this.address.address_1 = `${addressData.street_number} ${addressData.route}`
        this.address.address_2 = addressData.city
        this.address.latitude = addressData.latitude
        this.address.longitude = addressData.longitude
      }
    },
    computed: {
      showAddress() {
        const a = this.address.address_1
        return a !== null && a !== ''
      }
    }
  }
</script>
