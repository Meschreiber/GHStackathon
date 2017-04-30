const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
const config = {
  apiKey: "AIzaSyBCZ0ibdAMLT_mwLTJzn6J6K67LGf4bzSM",
  authDomain: "fir-a38e9.firebaseapp.com",
  databaseURL: "https://fir-a38e9.firebaseio.com",
  projectId: "fir-a38e9",
  storageBucket: "fir-a38e9.appspot.com",
  messagingSenderId: "380147728762"
}

// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
