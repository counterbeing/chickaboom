// import db from '@/config/firebase-init'
import firebase from 'firebase/app'
import 'firebase/storage'
import Vue from 'vue'

export default {
  state: {
    uploadJobs: {},
  },
  mutations: {
    addUploadTask(state, snapshot) {
      const subset = {
        bytesTransferred: snapshot.bytesTransferred,
        totalBytes: snapshot.totalBytes,
        state: snapshot.state,
      }
      Vue.set(state.uploadJobs, snapshot.ref.fullPath, subset)
    }
  },
  actions: {
    addUploadTask({ commit }, uploadTask) {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
      commit('addUploadTask', snapshot)
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // eslint-disable-next-line no-console
        // console.log('Upload is ' + progress + '% done')
      }, function(error) {
        // eslint-disable-next-line no-console
        console.log(error)
        switch (error.code) {
          case 'storage/unauthorized':
          break;
          case 'storage/canceled':
          break;
          case 'storage/unknown':
          break;
        }
      }, function() {})
    },
  },
  getters: {
    uploadStatus(state) {
      const defaults = { totalBytesTransferred: 0, totalTotalBytes: 0, percent: 0 }
      if(state.uploadJobs.length < 1) return defaults
      return Object.keys(state.uploadJobs).reduce((acc, key) => {
        const status = state.uploadJobs[key]
        acc.totalBytesTransferred += status.bytesTransferred
        acc.totalTotalBytes += status.totalBytes
        acc.percent = (acc.totalBytesTransferred / acc.totalTotalBytes) * 100
        return acc
      }, defaults)
    },
    uploadsActive(state) {
      return state.uploadJobs.length ? true : false
    },
    uploadsCount(state) {
      return state.uploadJobs.length
    },
  }
}
