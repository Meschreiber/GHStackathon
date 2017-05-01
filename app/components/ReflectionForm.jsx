import React from 'react'
import firebase from 'APP/fire'
var database = firebase.database()


// const reflections = {
//   0: {
//     author: 'mschreiber',
//     communication: 4,
//     playsNice: 4,
//     prepared: 4,
//     open: 4,
//     independent: 3,
//     strength: 'I try to always listen to my partner\'s ideas and ask their opinions.',
//     improvement: 'I sometimes ask for help to early'
//   }
// }

// firebase.database().ref('reflections/').set(reflections)



export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reflection: {
        author: 'mschreiber',
        communication: 0,
        playsNice: 0,
        prepared: 0,
        open: 0,
        independent: 0,
        strength: '',
        improvement: ''
      }
    }
  }


  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    this.listenTo(this.props.fireRef)
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
  }

  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    this.listenTo(incoming.fireRef)
  }

  listenTo(fireRef) {
    // If we're already listening to a ref, stop listening there.
    if (this.unsubscribe) this.unsubscribe()

    // Whenever our ref's value changes, set {value} on our state.
    const listener = fireRef.on('value', snapshot =>
      this.setState({ value: snapshot.val() }))

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => fireRef.off('value', listener)
  }

  // Write is defined using the class property syntax.
  // This is roughly equivalent to saying,
  //
  //    this.write = event => (etc...)
  //
  // in the constructor. Incidentally, this means that write
  // is always bound to this.
  postNewReflection = () => {
    // A post entry --> will eventually want a uid to include in the part of the db for that user
    var postData = this.state.reflection
    // Get a key for a new Post
    var newPostKey = this.props.fireRef.child('reflections').push().newPostKey

    // Write a new post's data simultaneously in the reflections list
    var updates = {}
    updates['/reflections/' + newPostKey] = postData

    // Include the line below when there are multiple users
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData
    return this.props.fireRef.update(updates)
  }

  cStarClick = (evt) => {
    const rating = evt.target.getAttribute('value')
    // evt.target.setAttribute('class', 'clicked')
    this.setStars(rating, 'communication')
    var newState = Object.assign(this.state, { reflection: { communication: rating } })
    this.setState(newState)
    console.log('CURRENT STATE', newState)
  }

  nStarClick = (evt) => {
    const rating = evt.target.getAttribute('value')
    // evt.target.setAttribute('class', 'clicked')
    this.setStars(rating, 'playsNice')
    var newState = Object.assign(this.state, { reflection: { playsNice: rating } })
    this.setState(newState)
    console.log('CURRENT STATE', newState)
  }

  pStarClick = (evt) => {
    const rating = evt.target.getAttribute('value')
    // evt.target.setAttribute('class', 'clicked')
    this.setStars(rating, 'prepared')
    var newState = Object.assign(this.state, { reflection: { prepared: rating } })
    this.setState(newState)
    console.log('CURRENT STATE', newState)
  }

  iStarClick = (evt) => {
    const rating = evt.target.getAttribute('value')
    // evt.target.setAttribute('class', 'clicked')
    this.setStars(rating, 'independent')
    var newState = Object.assign(this.state, { reflection: { independent: rating } })
    this.setState(newState)
    console.log('CURRENT STATE', newState)
  }

  oStarClick = (evt) => {
    const rating = evt.target.getAttribute('value')
    // evt.target.setAttribute('class', 'clicked')
    this.setStars(rating, 'open')
    var newState = Object.assign(this.state, { reflection: { open: rating } })
    this.setState(newState)
    console.log('CURRENT STATE', newState)
  }

  setStars = (num, className) => {
    const classes = className + ' star'
    var stars = document.getElementsByClassName(classes)
    for (var i = 0; i < stars.length; i++) {
      if (stars[i].getAttribute('value') <= num) {
        // console.log('looking at ', i, 'STAR', stars[i].getAttribute('value'), stars[i])
        stars[i].classList.remove('clickable')
        stars[i].className += ' clicked '
      } else {
        stars[i].classList.remove('clicked')
        stars[i].className += ' clickable '
      }
    }
  }

  writeStrength = (evt) => {
    var newState = Object.assign(this.state, { reflection: { strength: evt.target.value } })
    this.setState(newState)
  }

  writeImprovement = (evt) => {
    var newState = Object.assign(this.state, { reflection: { improvement: evt.target.value } })
    this.setState(newState)
  }

  render() {
    const { value } = this.state || {}
    // console.log('VALUE', value, 'fireRef', this.props.fireRef)
    return (
      <div>

        <header id="header" className="info">
          <h2>Self Reflection Form</h2>
          <div id="info">
            <p>Please use this opportunity reflect on how you contributed to your team/pairing this week.</p>
          </div>
        </header>
        <form onSubmit={this.postNewReflection}>
          <ul id="form">
            <p> Rate yourself on the following skills and qualities from 0 to 5.</p>
            <li id="communication" className="starRating">
              <fieldset>
                <legend >General Communication Skills</legend>
                <div className="field rating clearfix">
                  <input type="hidden" />
                  <span onClick={this.cStarClick} className="communication star clickable" value="1" >★</span>
                  <span onClick={this.cStarClick} className="communication star clickable" value="2" >★</span>
                  <span onClick={this.cStarClick} className="communication star clickable" value="3" >★</span>
                  <span onClick={this.cStarClick} className="communication star clickable" value="4" >★</span>
                  <span onClick={this.cStarClick} className="communication star clickable" value="5" >★</span>
                </div>
              </fieldset>
            </li>

            <li id="plays-nice" className="starRating">
              <fieldset>
                <legend >Plays Nice with Others</legend>
                <div className="field rating clearfix">
                  <input type="hidden" />
                  <span onClick={this.nStarClick} className="playsNice star clickable" value="1" >★</span>
                  <span onClick={this.nStarClick} className="playsNice star clickable" value="2" >★</span>
                  <span onClick={this.nStarClick} className="playsNice star clickable" value="3" >★</span>
                  <span onClick={this.nStarClick} className="playsNice star clickable" value="4" >★</span>
                  <span onClick={this.nStarClick} className="playsNice star clickable" value="5" >★</span>

                </div>
              </fieldset>
            </li>

            <li id="open" className="starRating">
              <fieldset>
                <legend >Open to New Ideas</legend>
                <div className="field rating clearfix">
                  <input type="hidden" />
                  <span onClick={this.oStarClick} className="open star clickable" value="1" >★</span>
                  <span onClick={this.oStarClick} className="open star clickable" value="2" >★</span>
                  <span onClick={this.oStarClick} className="open star clickable" value="3" >★</span>
                  <span onClick={this.oStarClick} className="open star clickable" value="4" >★</span>
                  <span onClick={this.oStarClick} className="open star clickable" value="5" >★</span>
                </div>
              </fieldset>
            </li>

            <li id="prepared" className="starRating">
              <fieldset>
                <legend >Prepared and Organized</legend>
                <div className="field rating clearfix">
                  <input type="hidden" />
                  <span onClick={this.pStarClick} className="prepared star clickable" value="1" >★</span>
                  <span onClick={this.pStarClick} className="prepared star clickable" value="2" >★</span>
                  <span onClick={this.pStarClick} className="prepared star clickable" value="3" >★</span>
                  <span onClick={this.pStarClick} className="prepared star clickable" value="4" >★</span>
                  <span onClick={this.pStarClick} className="prepared star clickable" value="5" >★</span>
                </div>
              </fieldset>
            </li>

            <li id="independent" className="starRating">
              <fieldset>
                <legend >Driven and Independent</legend>
                <div className="field rating clearfix">
                  <input type="hidden" />
                  <span onClick={this.iStarClick} className="independent star clickable" value="1" >★</span>
                  <span onClick={this.iStarClick} className="independent star clickable" value="2" >★</span>
                  <span onClick={this.iStarClick} className="independent star clickable" value="3" >★</span>
                  <span onClick={this.iStarClick} className="independent star clickable" value="4" >★</span>
                  <span onClick={this.iStarClick} className="independent star clickable" value="5" >★</span>
                </div>
              </fieldset>
            </li>
            <br />
            <li id="strengths">
              <label className="commentary">What was one of your greatest strengths as a pair programmer this week?  This can include either qualities and/or technical skills.</label>
              <div>
                <textarea
                  className="field textarea medium"
                  rows="10"
                  cols="150"
                  onChange={this.writeStrength}
                />
              </div>
            </li>
            <br />
            <li id="improvements" className="notranslate">
              <label className="commentary">What is one thing you would like to improve upon or learn about for next week?</label>
              <div>
                <textarea
                  className="field textarea medium"
                  rows="10"
                  cols="150"
                  onChange={this.writeImprovement}
                />
              </div>
            </li>
            <button className="btn btn-primary mt1">Submit</button>
          </ul>
        </form>
      </div>
    )
  }
}

