import Vue from 'vue'
import './router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('v-select', vSelect)

Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
