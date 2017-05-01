import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'


import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'


import Form from './components/Form'
import ReflectionFormIndex from './components/ReflectionFormIndex'
import FeedbackViz from './components/FeedbackViz'
import Viewbar from './components/Viewbar'
// import { fetchFeedbackFromWeek } from './redux/feedback'

// Code below moved to Viewbar Component
// -------------------------------------
// import firebase from 'APP/fire'
// // Get the auth API from Firebase.
// const auth = firebase.auth()
// // Ensure that we have (almost) always have a user ID, by creating
// // an anonymous user if nobody is signed in.
// auth.onAuthStateChanged(user => user || auth.signInAnonymously())


/* -----------------    COMPONENT     ------------------ */


const App = ({ children }) =>
  <div>
    <div id='views'>
      <Viewbar />
    </div>
    {/* Render our children (whatever the router gives us) */}
    {children}
  </div>

render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Form} />
      <Route path="feedback/week/:weekId" component={FeedbackViz} />
      <Route path="form/" component={Form} />
      <Route path="reflection/:name" component={ReflectionFormIndex} />
    </Route>
  </Router>,
  document.getElementById('app')
)
