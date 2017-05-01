import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import WhoAmI from './WhoAmI'

import firebase from 'APP/fire'

// Get the auth API from Firebase.
const auth = firebase.auth()

export const email = user => {
  if (!user) return 'Nobody'
  if (user.isAnonymous) return 'Anonymous'
  return user.email
}

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
auth.onAuthStateChanged(user => user || auth.signInAnonymously())
var user = firebase.auth().currentUser
console.log('CURRENT USER EMAIL:', email(user))

/* -----------------    COMPONENT     ------------------ */

const Viewbar = () =>
  <div>
    <ul className="viewbar">
      <li>
        <Link to="/reflection/mschreiber" activeClassName="active">Self Reflection Form</Link>
      </li>
      <li>
        <Link to="/form/aalexander" activeClassName="active">Partner Feedback Form</Link>
      </li>
      <li>
        <Link to="/feedback/week/1" activeClassName="active">Feedback Visualization</Link>
      </li>
      <li>
        {/* WhoAmI takes a firebase auth API and renders either a
          greeting and a logout button, or sign in buttons, depending
          on if anyone's logged in */}
        <WhoAmI auth={auth} />
      </li>
    </ul>
  </div>

export default Viewbar
