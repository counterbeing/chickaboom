import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import Vue2Filters from 'vue2-filters'
import './config/filters'

import router from '@/config/router'

// FontAwesome
import fontawesome from '@fortawesome/fontawesome'
// import brands from '@fortawesome/fontawesome-free-brands'
import faSpinner from '@fortawesome/fontawesome-free-solid/faCalendarAlt'
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
fontawesome.library.add(faSpinner, faCircle, faCheck)


import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('v-select', vSelect)

Vue.use(Vue2Filters)
Vue.use(BootstrapVue);
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch('setUser', user)
  } else {
    router.push({ name: 'signin' })
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
