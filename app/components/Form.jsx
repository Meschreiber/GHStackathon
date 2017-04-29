import React from 'react'

export default () =>
(
  <div>
    <form>
      <header id="header" className="info">
        <h2>Workshop Feedback Form</h2>
        <div>
        <p> Please rate your partner on the following skills and qualities from 0 to 5, 0 being the lowest and 5 being the highest. All ratings are shared anonymously. </p>
        </div>
      </header>

      <ul>
        <li id="communication" className="starRating">
          <fieldset>
            <legend >General Communication Skills</legend>
            <div className="field rating clearfix">
              <input name="communication" type="hidden"/>
                <span className="star clickable" value="1" tabIndex="7"></span>
                <span className="star clickable" value="2" tabIndex="9"></span>
                <span className="star clickable" value="3" tabIndex="11"></span>
                <span className="star clickable" value="4" tabIndex="13"></span>
                <span className="star clickable" value="5" tabIndex="15"></span>
            </div>
          </fieldset>
        </li>

        <li id="plays-nice" className="starRating">
          <fieldset>
            <legend >Plays Nice with Others</legend>
            <div className="field rating clearfix">
              <input name="nice" type="hidden"/>
                <span className="star clickable" value="1" tabIndex="7"></span>
                <span className="star clickable" value="2" tabIndex="9"></span>
                <span className="star clickable" value="3" tabIndex="11"></span>
                <span className="star clickable" value="4" tabIndex="13"></span>
                <span className="star clickable" value="5" tabIndex="15"></span>
              
            </div>
          </fieldset>
        </li>

        <li id="open" className="starRating">
          <fieldset>
            <legend >Open to New Ideas</legend>
            <div className="field rating clearfix">
              <input name="open" type="hidden"/>
                <span className="star clickable" value="1" tabIndex="7"></span>
                <span className="star clickable" value="2" tabIndex="9"></span>
                <span className="star clickable" value="3" tabIndex="11"></span>
                <span className="star clickable" value="4" tabIndex="13"></span>
                <span className="star clickable" value="5" tabIndex="15"></span>
              
            </div>
          </fieldset>
        </li>

        <li id="organized" className="starRating">
          <fieldset>
            <legend >Organized and Prepared</legend>
            <div className="field rating clearfix">
              <input name="organized" type="hidden"/>
                <span className="star clickable" value="1" tabIndex="7"></span>
                <span className="star clickable" value="2" tabIndex="9"></span>
                <span className="star clickable" value="3" tabIndex="11"></span>
                <span className="star clickable" value="4" tabIndex="13"></span>
                <span className="star clickable" value="5" tabIndex="15"></span>
              
            </div>
          </fieldset>
        </li>

        <li id="driven" className="starRating">
          <fieldset>
            <legend >Driven and Independent</legend>
            <div className="field rating clearfix">
              <input name="driven" type="hidden" />
                <span className="star clickable" value="1" tabIndex="7"></span>
                <span className="star clickable" value="2" tabIndex="9"></span>
                <span className="star clickable" value="3" tabIndex="11"></span>
                <span className="star clickable" value="4" tabIndex="13"></span>
                <span className="star clickable" value="5" tabIndex="15"></span>
              
            </div>
          </fieldset>
        </li>


        <li id="strengths" className="commentary">
          <label>List one of your partner's greatest strengths as a pair programmer.  This can include either qualities and/or technical skills.</label>
          <div>
            <textarea
            className="field textarea medium"
            spellcheck="true"
            rows="10"
            cols="50"
            onkeyup="handleInput(this);"
            onchange="handleInput(this);">
          </textarea>
          </div>
        </li>

          <p >Would you like to share this feedback (areas of improvement) anonymously or non-anonymously?</p>
          <div ng-repeat="option in options" className="ng-scope">
            <label >
              <input
              type="radio"
              ng-model="partner.opinion"
              name="pair-rating"
              ng-value="1"
              className="ng-valid ng-not-empty ng-dirty ng-touched"/>
                Anonymously
                </label><br />
          </div>
          <div ng-repeat="option in options" className="ng-scope">
          <label>
              <input
              type="radio"
              ng-model="partner.opinion"
              name="pair-rating"
              ng-value="1"
              className="ng-valid ng-not-empty ng-dirty ng-touched"/>
                Put my name on it!
            </label><br /></div>


        <li id="improvements" className="notranslate">
          <label  id="title7" for="Field7">Give one specific suggestion on how they could improve as a developer and/or team member.</label>
          <div>
            <textarea
            className="field textarea medium"
            spellcheck="true"
            rows="10"
            cols="50"
            onkeyup="handleInput(this); "
             onchange="handleInput(this);"
            ></textarea>
          </div>

          <p >Would you like to share this feedback (areas of improvement) anonymously or non-anonymously?</p>
          <div ng-repeat="option in options" className="ng-scope">
            <label >
              <input
              type="radio"
              ng-model="partner.opinion"
              name="pair-rating"
              ng-value="1"
              className="ng-valid ng-not-empty ng-dirty ng-touched"/>
                Anonymously
                </label><br />
          </div>
          <div ng-repeat="option in options" className="ng-scope">
          <label>
              <input
              type="radio"
              ng-model="partner.opinion"
              name="pair-rating"
              ng-value="1"
              className="ng-valid ng-not-empty ng-dirty ng-touched"/>
                Put my name on it!
            </label><br /></div>
        </li>

        <li>
          <p >Please tell us if you would like to pair with INSERT PARTNER NAME in the future. We will keep this confidential.</p>
          <div>
            <label className="ng-binding">
              <input type="radio" ng-model="partner.opinion" name="pair-rating"/>Yes, please!                       
            </label>
            <br />
          </div>
          <div ng-repeat="option in options" className="ng-scope">
            <label className="ng-binding">
              <input type="radio" ng-model="partner.opinion"/>
                I don't mind either way.                              
            </label>
            <br />
          </div>
          <div ng-repeat="option in options" className="ng-scope">
            <label className="ng-binding">
              <input type="radio" ng-model="partner.opinion" name="pair-rating"/>I'd prefer not to, thanks.</label>
            ><br />
          </div>
          <textarea placeholder="Leave an optional comment" className="field mt2 pair-comment ng-valid ng-dirty ng-valid-parse ng-touched ng-empty"></textarea>
          <br />
          <label className="block mt1 mb1"><input ng-model="partner.wantsToTalk" type="checkbox" className="ng-pristine ng-untouched ng-valid ng-empty"/>I want to talk to someone about this pairing</label>
        </li>
        <button className="btn btn-primary mt1" ng-click="submit(partner)">Submit</button>
      </ul>
    </form>
  </div>
)