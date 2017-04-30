import React from 'react'

export default class extends React.Component {
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
  write = event => this.props.fireRef &&
    this.props.fireRef.set(event.target.value)
  // in your own case, push on submit to add another entry

  render() {
    const { value } = this.state || {}
    return (
      <div>

        <header id="header" className="info">
          <h2>Self Reflection Form</h2>
          <div id="info">
            <p>Please use this opportunity reflect on how you contributed to your team/pairing this week.</p>
          </div>
        </header>
        <form>
          <ul id="form">
            <p> Rate yourself on the following skills and qualities from 0 to 5.</p>
            <li id="communication" className="starRating">
              <fieldset>
                <legend >General Communication Skills</legend>
                <div className="field rating clearfix">
                  <input name="communication" type="hidden" />
                  <span className="star clickable" value="1" >★</span>
                  <span className="star clickable" value="2" >★</span>
                  <span className="star clickable" value="3" >★</span>
                  <span className="star clickable" value="4" >★</span>
                  <span className="star clickable" value="5" >★</span>
                </div>
              </fieldset>
            </li>

            <li id="plays-nice" className="starRating">
              <fieldset>
                <legend >Plays Nice with Others</legend>
                <div className="field rating clearfix">
                  <input name="nice" type="hidden" />
                  <span className="star clickable" value="1" >★</span>
                  <span className="star clickable" value="2" >★</span>
                  <span className="star clickable" value="3" >★</span>
                  <span className="star clickable" value="4" >★</span>
                  <span className="star clickable" value="5" >★</span>

                </div>
              </fieldset>
            </li>

            <li id="open" className="starRating">
              <fieldset>
                <legend >Open to New Ideas</legend>
                <div className="field rating clearfix">
                  <input name="open" type="hidden" />
                  <span className="star clickable" value="1" >★</span>
                  <span className="star clickable" value="2" >★</span>
                  <span className="star clickable" value="3" >★</span>
                  <span className="star clickable" value="4" >★</span>
                  <span className="star clickable" value="5" >★</span>
                </div>
              </fieldset>
            </li>

            <li id="organized" className="starRating">
              <fieldset>
                <legend >Organized and Prepared</legend>
                <div className="field rating clearfix">
                  <input name="organized" type="hidden" />
                  <span className="star clickable" value="1" >★</span>
                  <span className="star clickable" value="2" >★</span>
                  <span className="star clickable" value="3" >★</span>
                  <span className="star clickable" value="4" >★</span>
                  <span className="star clickable" value="5" >★</span>
                </div>
              </fieldset>
            </li>

            <li id="driven" className="starRating">
              <fieldset>
                <legend >Driven and Independent</legend>
                <div className="field rating clearfix">
                  <input name="driven" type="hidden" />
                  <span className="star clickable" value="1" >★</span>
                  <span className="star clickable" value="2" >★</span>
                  <span className="star clickable" value="3" >★</span>
                  <span className="star clickable" value="4" >★</span>
                  <span className="star clickable" value="5" >★</span>
                </div>
              </fieldset>
            </li>
            <br />
            <li id="strengths">
              <label className="commentary">What was one of your greatest strengths as a pair programmer this week?  This can include either qualities and/or technical skills.</label>
              <div>
                <textarea
                  className="field textarea medium"
                  spellcheck="true"
                  rows="10"
                  cols="150"
                />
              </div>
            </li>
            <br />
            <li id="improvements" className="notranslate">
              <label className="commentary">What is one thing you would like to improve upon or learn about for next week?</label>
              <div>
                <textarea
                  className="field textarea medium"
                  spellcheck="true"
                  rows="10"
                  cols="150"
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

