const functions = require('firebase-functions');
const moment = require('moment')

// const firestore = new Firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// firestore.settings(settings);


const admin = require('firebase-admin');
admin.initializeApp({credential: admin.credential.applicationDefault()})
var db = admin.firestore()

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

exports.updateTimestamps = functions.https.onRequest((request, response) => {
  var jobsRef = db.collection('jobs')
  jobsRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id);
        return doc.ref.update({
          date: randomDate(new Date, moment().add(30, 'days').toDate())
        })
      })
      return true
    })
    .catch(err => {
      console.log('Error getting documents', err);
    })
});
