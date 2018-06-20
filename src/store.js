import Vue from 'vue'
import Vuex from 'vuex'
import db from './components/firebase-init'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import router from '@/router'
import firebase from 'firebase/app'
import 'firebase/auth'
// import { auth } from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: [],
    jobs: [],
    user: null,
  },

  getters: {
    user: s => s.user,
    customers: s => s.customers,
    jobs: s => s.jobs,
    jobById: (s, g) => {
      return id => g.jobs.find(j => j.id === id)
    }
  },

  mutations: {
    ...firebaseMutations,
    setUser(state, payload) {
      state.user = payload
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
    },
    signup: ( { commit }, {email, password}) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        commit('setUser', user)
      })
    },
    setUser: ( { commit }, user) => {
      commit('setUser', user)
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
    signout: () => {
      return firebase.auth().signOut()
      .then(() => {
        router.replace('signin');
      });
    }

  }
})
