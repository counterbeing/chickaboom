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
            A total of {{duration_price | currency}} for {{duration_hours | currency('')}}
            hours, at the rate of {{settings.company.travel.hourly_rate | currency}} per hour.
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
export default {
  name: 'google-map',
  props: ['address'],
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
    duration_price() {
      return this.duration_hours * Settings.company.travel.hourly_rate
    },
    duration_hours() {
      if(!this.duration) return null
      return this.duration.value/(60*60)
    },
  },
  methods: {
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
    }
  },
  mounted() {
    this.initMap()
    this.calculateAndDisplayRoute()
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
