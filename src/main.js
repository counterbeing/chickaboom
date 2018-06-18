import Vue from 'vue'
import './router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from './store'
import Vue2Filters from 'vue2-filters'

// FontAwesome
import fontawesome from '@fortawesome/fontawesome'
// import brands from '@fortawesome/fontawesome-free-brands'
import faSpinner from '@fortawesome/fontawesome-free-solid/faCalendarAlt'
fontawesome.library.add(faSpinner)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('v-select', vSelect)

Vue.use(Vue2Filters)
Vue.use(BootstrapVue);
Vue.config.productionTip = false

Vue.filter('round', function(value, decimals) {
  if(!value) { value = 0 }
  if(!decimals) { decimals = 0}
  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  return value;
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
