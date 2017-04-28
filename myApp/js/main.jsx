import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import {render} from 'react-dom'

import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Root from './components/Root'
import Form from './components/Form'
import FeedbackViz from './components/FeedbackViz'
import { fetchFeedbackFromWeek } from './redux/feedback'

import firebase from 'APP/fire'

// Get the auth API from Firebase.
const auth = firebase.auth()

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
auth.onAuthStateChanged(user => user || auth.signInAnonymously())


/* -----------------    COMPONENT     ------------------ */


const App = ({ children, fetchInitialData }) =>
  <div>
    <nav>
      {/* WhoAmI takes a firebase auth API and renders either a
          greeting and a logout button, or sign in buttons, depending
          on if anyone's logged in */}
      <WhoAmI auth={auth}/>
    </nav>
    {/* Render our children (whatever the router gives us) */}
    {children}
  </div>

render(
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={  fetchInitialData }>
      <IndexRoute component={Form} />
      <Route path="feedback" component={FeedbackViz} />
      <Route path="*" component={Form} />
    </Route>
  </Router>,
  document.getElementById('app')
)


/* -----------------    CONTAINER     ------------------ */

// const mapProps = null;

// const mapDispatch = dispatch => ({
//   fetchInitialData: () => {
//     let weekNum = 1; //hard-coded for now
//     dispatch(fetchFeedbackFromWeek(weekNum));
//   }
// });

// export default connect(mapProps, mapDispatch)(Routes);
