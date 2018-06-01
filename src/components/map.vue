<template>
  <div class="google-map" :id="mapName"></div>
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
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }
    this.map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({
        position,
        map: this.map
      });
    this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    });
  }
};
</script>
<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
