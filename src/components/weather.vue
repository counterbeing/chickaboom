<template>
  <div class="weather" v-if='forecast'>
    <div class="card">
      <div class="card-body">
        <div v-if='warning' class="alert alert-warning" role="alert">Weather may be poor for flying.</div>
        <i class='weather-icon' :class='icon'></i>
        <h6 class="card-subtitle mb-2 text-muted">Projected Forecast for Time of Job</h6>
        <p class="card-text">{{expectedWeather.main.temp | round}}°F with {{expectedWeather.weather[0].description}} and winds of about {{expectedWeather.wind.speed | round}}mph.</p>
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
  props: ['job'],
  data(){
    return {
      forecast: null,
    }
  },
  computed: {
    warning() { if(this.expectedWeather.wind.speed > 15) return true },
    icon() {
      if(!this.forecast) return null
      var prefix = 'wi wi-';
      var code = this.expectedWeather.weather[0].id;
      var icon = weatherIconMap[code].icon;
      if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
      }
      return prefix + icon;
    },
    expectedWeather() {
      return this.forecast.list[29]
    }
  },
  created() {
    const key = '807d1a295b6e0ffe946cbc9fd373ad15'
    const host = 'http://api.openweathermap.org/data/2.5/forecast'
    get(`${host}?q=London,uk&lat=${this.job.address.latitude}&lon=${this.job.address.longitude}&appid=${key}&units=imperial`).then((res) => {
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
