<template>
  <div class="row">

    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Job Location</h5>
          <div class="street">{{address.address_1}}</div>
          <div class="state">{{address.city}},  {{address.state}} {{address.zip}}</div>
          <div class="">
            dist: {{distance}}
            dur: {{duration}}
          </div>

        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="google-map" :id="mapName"></div>

    </div>
  </div>
</template>

<script>
/* global google */
export default {
  name: 'google-map',
  props: ['address'],
  data: function () {
    return {
      mapName: "google-map",
      markerCoordinates: [{
        latitude: this.address.latitude,
        longitude: this.address.longitude,
      }],
      map: null,
      directionsService: null,
      directionsDisplay: null,
      distance: null,
      duration: null,
    }
  },
  methods: {
    initMap() {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.map = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 7,
        center: {lat: this.address.latitude, lng: this.address.longitude}
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
  /* width: 800px; */
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
