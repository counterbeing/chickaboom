
const staging = {
  apiKey: "AIzaSyCSTp7E0h3eQSvM7jWCwClg5MWAXmAU9aQ",
  authDomain: "chickadee-41af5.firebaseapp.com",
  databaseURL: "https://chickadee-41af5.firebaseio.com",
  projectId: "chickadee-41af5",
  storageBucket: "chickadee-41af5.appspot.com",
  messagingSenderId: "142972629636"
}

const production = {
  apiKey: "AIzaSyBMpg_j3H5GteZOrsUrMKo-0ozlI6oZuSg",
  authDomain: "chickaboom-production.firebaseapp.com",
  databaseURL: "https://chickaboom-production.firebaseio.com",
  projectId: "chickaboom-production",
  storageBucket: "chickaboom-production.appspot.com",
  messagingSenderId: "504527290634"
}

function hostIsProd() {
  return window.location.href.indexOf("app") > -1
}

function chooseDatabase() {
  return hostIsProd() ? production : staging
}

export default chooseDatabase()
