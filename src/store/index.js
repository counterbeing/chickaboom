import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firebase-init'
import router from '@/config/router'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/auth'
import progress from './progress'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { progress },
  state: {
    customers: [],
    jobs: [],
    user: null,
    requestedRoute: null,
  },

  getters: {
    requestedRoute: s => s.requestedRoute,
    user: s => s.user,
    customers: s => s.customers,
    jobs: s => s.jobs,
    jobById: (s, g) => {
      return id => g.jobs.find(j => j.id === id)
    }
  },

  mutations: {
    ...firebaseMutations,
    clearRequestedRoute(state) {
      state.requestedRoute = null
    },
    setRequestedRoute(state, payload) {
      state.requestedRoute = payload
    },
    setUser(state, payload) { state.user = payload },
    clearUser(state) { state.user = null },
    addDeliveredFile(state, { job, file, type }) {
      const jobDoc = db.collection('jobs').doc(job.id);
      const key = `${type}s`
      let files = job[key]
      files = Array.isArray(files) ? files : []
      files.push(file)
      jobDoc.update({ [key]: files })
    },

    removeJobFileReference(state, { job, file }) {
      const jobDoc = db.collection('jobs').doc(job.id);
      const baseType = file.fullPath.match(/\w+\/\w+\/(\w+)\//)[1]
      const key = `${baseType}Files`
      let files = job[key]
      files = Array.isArray(files) ? files : []
      files = files.filter((f) => {
        f.fullPath !== file.fullPath
      })
      jobDoc.update({ [key]: files })
    },
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
      jobDoc.update({ todos: job.todos })
    },
    updateOrderTotals(state, job){
      const jobDoc = db.collection('jobs').doc(job.id);
      return jobDoc.update({ order: job.order })
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
    addJob(context, job) {
      return context.commit('addJob', job)
    },

    addDeliveredFile(context, { job, file, type }) {
      let { fullPath, md5Hash, name, size, updated } = file
      file = { fullPath, md5Hash, name, size, updated }
      return context.commit('addDeliveredFile', {job, file, type})
    },
    removeJobFileReference(context, { job, file}) {
      return context.commit('removeJobFileReference', {job, file})
    },
    deleteCustomer: function (context, customerId) {
      context.commit('deleteCustomer', customerId)
    },
    updateOrderTotals: (context, job) => {
      // Get current order totals
      // Determine if we're replacing a single key
      return context.commit('updateOrderTotals', job)
    },
    updateTodos: (context, job) => {
      context.commit('updateTodos', job)
    },
    signup: ( { commit }, {email, password}) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        commit('setUser', user)
      })
    },
    setUser: ( { commit, getters }, user) => {
      commit('setUser', user)
      const route = getters.requestedRoute
      if(route) {
        router.push({ name: route.name, params: route.params})
      } else {
        router.push({ name: 'home'})
      }
      commit('clearRequestedRoute')
    },
    setRequestedRoute( { commit }, payload) {
      commit('setRequestedRoute', payload)
    },
    signin: ( { commit }, {email, password}) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
          commit('setUser', user.user)
          router.push({ name: 'jobs'})
        })
      })
      .catch(function() {
      });
    },
    signout: ({ commit }) => {
      return firebase.auth().signOut()
      .then(() => {
        commit('clearUser')
        router.replace('signin');
      });
    }

  }
})
