<template>
  <div class="row" v-if='address'>

    <div class="col-md-4">
      <ul class="list-group">
        <li class="list-group-item">
          <h5 class="card-title">Address</h5>
          <div class="street">{{address.address_1}}</div>
          <div class="state">{{address.city}},  {{address.state}} {{address.zip}}</div>
        </li>
        <li class="list-group-item" v-if='distance'>
          <h5 class="card-title">Getting There</h5>
          <div>
            {{distance.text}}
            {{duration.text}}
          </div>
        </li>
        <li class="list-group-item" v-if='distance'>
          <h5 class="card-title">Travel Expenses</h5>
          <div>
            A total of {{total_price | currency}} for {{duration_hours | currency('')}}
            hours, at the rate of {{settings.company.travel.hourly_rate | currency}}
            per hour<span v-if="cost_per_mile">, with a
            per mile fee of {{settings.company.travel.cost_per_mile | currency}}</span>.
          </div>
        </li>
      </ul>
    </div>

    <div class="col-md-8">
      <div class="google-map" :id="mapName"></div>
    </div>
  </div>
</template>

<script>
/* global google */
import Settings from '@/config/default-settings'
import { mapActions } from 'vuex'
export default {
  name: 'google-map',
  props: ['job'],
  data: function () {
    return {
      mapName: "google-map",
      map: null,
      directionsService: null,
      directionsDisplay: null,
      distance: null,
      duration: null,
    }
  },
  computed: {
    settings() { return Settings },
    address() { return this.job.address },
    cost_per_mile() {
      const cost =  Settings.company.travel.cost_per_mile
      return cost !== null && cost > 0 ? cost : false
    },
    mileage_fee() {
      const metersPerMile = 1609.34
      if(!this.distance) return null
      const miles = this.distance.value / metersPerMile
      return miles * Settings.company.travel.cost_per_mile
    },
    duration_price() {
      return this.duration_hours * Settings.company.travel.hourly_rate
    },
    duration_hours() {
      if(!this.duration) return null
      return this.duration.value/(60*60)
    },
    total_price() {
      return this.duration_price + this.mileage_fee
    }
  },
  methods: {
    ...mapActions(['updateOrderTotals']),
    initMap() {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.map = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 7,
      });
      this.directionsDisplay.setMap(this.map)
    },
    calculateAndDisplayRoute() {
      this.directionsService.route({
        origin: '333 Meadow Cross Rd, 04086',
        destination: `${this.address.latitude}, ${this.address.longitude}`,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.distance = response.routes[0].legs[0].distance
          this.duration = response.routes[0].legs[0].duration
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      })
    },
  },
  mounted() {
    this.initMap()
    this.calculateAndDisplayRoute()
  },
  watch: {
    total_price() {
      this.job.order = {
        travel_fee: this.total_price,
        travel_duration: this.duration_hours
      }
      this.updateOrderTotals(this.job)
    }
  }
}
</script>
<style scoped>
.google-map {
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
