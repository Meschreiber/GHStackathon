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
          <h2>Partner Feedback Form</h2>
          <div id="info">
            <p>Please use this opportunity to give constructive criticism to your partner.  All feedback can be shared anonymously if selected.</p>
          </div>
        </header>
        <form>
          <ul id="form">
            <p> Rate your partner on the following skills and qualities from 0 to 5. Ratings are always shared anonymously. </p>
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
              <label className="commentary">List one of your partner's greatest strengths as a pair programmer.  This can include either qualities and/or technical skills.</label>
              <div>
                <textarea
                  className="field textarea medium"
                  spellcheck="true"
                  rows="10"
                  cols="150"
                  value={value}
                  onChange={this.write} />
              </div>
            </li>

            <p>Would you like to share this feedback (strengths) anonymously or non-anonymously?</p>
            <div ng-repeat="option in options" className="ng-scope">
              <label className="ng-binding">
                <input type="radio" name="strength-anon" />Anonymously
                </label>
              <br />
            </div>
            <div ng-repeat="option in options" className="ng-scope">
              <label className="ng-binding">
                <input type="radio" name="strength-anon" />Put my name on it!
                </label>
              <br />
            </div>

            <br />
            <li id="improvements" className="notranslate">
              <label className="commentary">Give one specific suggestion on how they could improve as a developer and/or team member.</label>
              <div>
                <textarea
                  className="field textarea medium"
                  spellcheck="true"
                  rows="10"
                  cols="150"
                  onkeyup="handleInput(this); "
                  onchange="handleInput(this);"
                ></textarea>
              </div>

              <p >Would you like to share this feedback (areas of improvement) anonymously or non-anonymously?</p>
              <div ng-repeat="option in options" className="ng-scope">
                <label className="ng-binding">
                  <input type="radio" name="improv-anon" />Anonymously
                </label>
                <br />
              </div>
              <div ng-repeat="option in options" className="ng-scope">
                <label className="ng-binding">
                  <input type="radio" name="improv-anon" />Put my name on it!
                </label>
                <br />
              </div>
            </li>

            <li>
              <p >Please tell us if you would like to pair with Allison Alexander in the future. We will keep this confidential.</p>
              <div>
                <label className="ng-binding">
                  <input type="radio" ng-model="partner.opinion" name="pair-rating" />Yes, please!
            </label>
                <br />
              </div>
              <div ng-repeat="option in options" className="ng-scope">
                <label className="ng-binding">
                  <input type="radio" ng-model="partner.opinion" name="pair-rating" />
                  I don't mind either way.
            </label>
                <br />
              </div>
              <div ng-repeat="option in options" className="ng-scope">
                <label className="ng-binding">
                  <input type="radio" ng-model="partner.opinion" name="pair-rating" />I'd prefer not to, thanks.</label>
                <br />
              </div>
              <br />
              <textarea
                placeholder="Leave an optional comment"
                rows="2"
                cols="150"></textarea>
              <br />
              <label className="block mt1 mb1"><input ng-model="partner.wantsToTalk" type="checkbox" className="ng-pristine ng-untouched ng-valid ng-empty" />I want to talk to someone about this pairing</label>
            </li>
            <button className="btn btn-primary mt1" ng-click="submit(partner)">Submit</button>
          </ul>
        </form>
      </div>
    )
  }
}
