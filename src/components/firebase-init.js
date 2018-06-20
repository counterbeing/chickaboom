import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './firebase-config'

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.firestore().settings( { timestampsInSnapshots: true })

export default firebaseApp.firestore()
