import Vue from 'vue'
import './router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from './store'
import Vue2Filters from 'vue2-filters'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('v-select', vSelect)

Vue.use(Vue2Filters)
Vue.use(BootstrapVue);
Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
