import Vue from 'vue'
import Vuex from 'vuex'
import db from './components/firebase-init'
import { firebaseMutations, firebaseAction } from 'vuexfire'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: [],
    jobs: []
  },
  getters: {
    customers: state => state.customers,
    jobs: state => state.jobs,
  },
  mutations: {
    ...firebaseMutations
  },
  actions:  {
    bindRef: firebaseAction(({ bindFirebaseRef }, { name, ref }) => {
      bindFirebaseRef(name, ref)
    }),
    init: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('customers', db.collection('customers'))
      bindFirebaseRef('jobs', db.collection('jobs'))
    })
  }
})
