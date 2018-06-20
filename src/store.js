import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firebase-init'
import router from '@/config/router'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
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

    deleteCustomer: function (context, customerId) {
      context.commit('deleteCustomer', customerId)
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
