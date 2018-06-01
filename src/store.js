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
    jobById: (s, g) => {
      return id => g.jobs.find(j => j.id === id)
    }
  },
  mutations: {
    ...firebaseMutations,
    addJob: function (state, job) {
      state.jobs.push(job)
    },
    deleteCustomer: function (state, customerId) {
      db.collection('customers').doc(customerId).delete()
      // state.customers = state.customers.filter((c) => {
      //   return c.id !== customerId
      // })
      // state.jobs = state.jobs.filter((j) => {
      //   return j.customer_id !== customerId
      // })
    }
  },
  actions:  {
    bindRef: firebaseAction(({ bindFirebaseRef }, { name, ref }) => {
      bindFirebaseRef(name, ref)
    }),
    init: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('customers', db.collection('customers'))
      bindFirebaseRef('jobs', db.collection('jobs'))
    }),
    addJob: function (context, job) {
      context.commit('addJob', job)
    },

    deleteCustomer: function (context, customerId) {
      context.commit('deleteCustomer', customerId)
    }
  }
})
