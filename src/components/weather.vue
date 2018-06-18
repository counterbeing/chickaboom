<template>
  <div class="weather">
    <div class="card"">
      <div class="card-body">
        <i class='weather-icon' :class='icon'></i>
        <h6 class="card-subtitle mb-2 text-muted">Projected Forecast for Time of Job</h6>
        <p class="card-text">{{forecast.main.temp}}°F with {{forecast.weather[0].description}} and winds of about {{forecast.wind.speed}} mph.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'axios'
import '@/vendor/css/weather-icons-wind.min.css'
import '@/vendor/css/weather-icons.min.css'
import weatherIconMap from '@/vendor/weather-icon-map'

export default {
  props: ['location'],
  data(){
    return {
      forecast: null,
    }
  },
  computed: {
    icon() {
      if(!this.forecast) return null
      var prefix = 'wi wi-';
      var code = this.forecast.weather[0].id;
      var icon = weatherIconMap[code].icon;
      if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
      }
      return prefix + icon;
    }
  },
  created() {
    const key = '807d1a295b6e0ffe946cbc9fd373ad15'
    const host = 'http://api.openweathermap.org/data/2.5/weather?'
    get(`${host}q=London,uk&appid=${key}&units=imperial`).then((res) => {
      this.forecast = res.data
    })
  }

}
</script>

<style media="screen">
  .weather-icon {
      font-size: 3em;
      text-align: center;
      display: block;
      padding: .8em;
  }
</style>
