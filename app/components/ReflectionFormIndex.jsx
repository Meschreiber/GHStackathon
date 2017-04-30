// A necessary glue? 

import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import ReflectionForm from './ReflectionForm'

// This component is a little piece of glue between React router (in main.jsx)
// and our form component. It takes in props.params.name and
// shows the form along with that title.
export default ({params: {name}}) =>
  <div>
    <h1>{name}</h1>
    {/* Here, we're passing in a Firebase reference to
        /scratchpads/$scratchpadTitle. This is where the scratchpad is
        stored in Firebase. Each scratchpad is just a string that the
        component will listen to, but it could be the root of a more complex
        data structure if we wanted. */}
    <ReflectionForm fireRef={db.ref('reflections').child(name)}/>
  </div>
  