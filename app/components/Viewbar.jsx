import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import WhoAmI from './components/WhoAmI'

import firebase from 'APP/fire'

// Get the auth API from Firebase.
const auth = firebase.auth()

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
auth.onAuthStateChanged(user => user || auth.signInAnonymously())

/* -----------------    COMPONENT     ------------------ */

const Viewbar = () =>
  <nav className="navbar navbar-default">
    <div id='auth'>
      {/* WhoAmI takes a firebase auth API and renders either a
          greeting and a logout button, or sign in buttons, depending
          on if anyone's logged in */}
      <WhoAmI auth={auth} />
    </div>
  </nav>

export default Viewbar
