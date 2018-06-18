import Vue from 'vue'
import Vuex from 'vuex'
import db from './components/firebase-init'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import router from '@/router'

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
    addJob(state, job) {
      return db.collection('jobs').add(job)
    },
    deleteCustomer(state, customerId) {
      db.collection('customers').doc(customerId).delete().then(() => {
       router.push({ name: 'customers'})
      })
    },
    updateTodos(state, job){
      const jobDoc = db.collection('jobs').doc(job.id);
      jobDoc.update({ todos: job.todos })}
  },
  actions:  {
    bindRef: firebaseAction(({ bindFirebaseRef }, { name, ref }) => {
      bindFirebaseRef(name, ref)
    }),
    init: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('customers', db.collection('customers'))
      bindFirebaseRef('jobs', db.collection('jobs'))
    }),
    addJob(context, job) {
      return context.commit('addJob', job)
    },

    deleteCustomer: function (context, customerId) {
      context.commit('deleteCustomer', customerId)
    },
    updateTodos: (context, job) => {
      context.commit('updateTodos', job)
    }
  }
})
