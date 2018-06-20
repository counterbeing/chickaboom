import Vue from 'vue'
import moment from 'moment'

Vue.filter('round', function(value, decimals) {
  if(!value) { value = 0 }
  if(!decimals) { decimals = 0}
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
})

Vue.filter('long_date', function(date) {
  const m = moment(date)
  return m.format('dddd, MMMM Do YYYY')
})

Vue.filter('default_time', function(date) {
  const m = moment(date)
  return m.format('LT')
})
