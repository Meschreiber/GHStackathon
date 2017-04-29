import React from 'react'

export default () => null

// (

//   <div>
//     <form>
//       <header id="header" className="info">
//         <h2>Workshop Feedback Form</h2>
//         <div>Please rate your partner on the following skills and qualities from 0 to 5, 0 being the lowest and 5 being the highest.
//           All ratings are shared anonymously.</div>
//       </header>

//       <ul>
//         <li id="communication" className="notranslate">
//           <fieldset>
//             <legend id="title" className="desc">General Communication Skills</legend>
//             <div id="Rating10" className="field rating clearfix">
//               <input id="Field10" name="Field10" type="hidden" value="4"/>
//                 <span className="star clickable" value="1" tabIndex="7"></span>
//                 <span className="star clickable" value="2" tabIndex="9"></span>
//                 <span className="star clickable" value="3" tabIndex="11"></span>
//                 <span className="star clickable" value="4" tabIndex="13"></span>
//                 <span className="star clickable" value="5" tabIndex="15"></span>
//             </div>
//           </fieldset>
//         </li>

//         <li id="plays-nice" className="notranslate">
//           <fieldset>
//             <legend id="title" className="desc">Plays Nice with Others</legend>
//             <div id="Rating10" className="field rating clearfix">
//               <input id="Field10" name="Field10" type="hidden" value="4"/>
//                 <span className="star clickable" value="1" tabIndex="7"></span>
//                 <span className="star clickable" value="2" tabIndex="9"></span>
//                 <span className="star clickable" value="3" tabIndex="11"></span>
//                 <span className="star clickable" value="4" tabIndex="13"></span>
//                 <span className="star clickable" value="5" tabIndex="15"></span>
              
//             </div>
//           </fieldset>
//         </li>

//         <li id="open" className="notranslate">
//           <fieldset>
//             <legend id="title" className="desc">Open to New Ideas</legend>
//             <div id="Rating10" className="field rating clearfix">
//               <input id="Field10" name="Field10" type="hidden" value="4"/>
//                 <span className="star clickable" value="1" tabIndex="7"></span>
//                 <span className="star clickable" value="2" tabIndex="9"></span>
//                 <span className="star clickable" value="3" tabIndex="11"></span>
//                 <span className="star clickable" value="4" tabIndex="13"></span>
//                 <span className="star clickable" value="5" tabIndex="15"></span>
              
//             </div>
//           </fieldset>
//         </li>

//         <li id="organized" className="notranslate">
//           <fieldset>
//             <legend id="title" className="desc">Organized and Prepared</legend>
//             <div id="Rating10" className="field rating clearfix">
//               <input id="Field10" name="Field10" type="hidden" value="4"/>
//                 <span className="star clickable" value="1" tabIndex="7"></span>
//                 <span className="star clickable" value="2" tabIndex="9"></span>
//                 <span className="star clickable" value="3" tabIndex="11"></span>
//                 <span className="star clickable" value="4" tabIndex="13"></span>
//                 <span className="star clickable" value="5" tabIndex="15"></span>
              
//             </div>
//           </fieldset>
//         </li>

//         <li id="driven" className="notranslate">
//           <fieldset>
//             <legend id="title" className="desc">Driven and Independent</legend>
//             <div id="Rating10" className="field rating clearfix">
//               <input id="Field10" name="Field10" type="hidden" value="4"/>
//                 <span className="star clickable" value="1" tabIndex="7"></span>
//                 <span className="star clickable" value="2" tabIndex="9"></span>
//                 <span className="star clickable" value="3" tabIndex="11"></span>
//                 <span className="star clickable" value="4" tabIndex="13"></span>
//                 <span className="star clickable" value="5" tabIndex="15"></span>
              
//             </div>
//           </fieldset>
//         </li>


//         <li id="strengths" className="notranslate">
//           <label className="desc" id="title7" for="Field7">List one of your partner's greatest strengths as a pair programmer.  This can include either qualities and/or technical skills.</label>
//           <div>
//             <textarea id="Field7" name="Field7" className="field textarea medium" spellcheck="true" rows="10" cols="50" tabIndex="37" onkeyup="handleInput(this); "
//               onchange="handleInput(this);"></textarea>
//           </div>
//         </li>

//         <p className="ng-binding">Would you like to share this feedback (strengths) anonymously or non-anonymously?</p>
//         <div ng-repeat="option in options" className="ng-scope">
//           <label className="ng-binding">
//             <input type="radio" ng-model="partner.opinion" name="pair-rating" ng-value="1" className="ng-valid ng-not-empty ng-dirty ng-touched" value="1" style=""/>
//               Anonymously 
//           </label><br />
//         </div>
//         <div ng-repeat="option in options" className="ng-scope">
//           <label className="ng-binding">
//             <input type="radio" ng-model="partner.opinion" name="pair-rating" ng-value="0" className="ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched" value="0" style=""/>
//               Put my name on it!br
                    
//           </label><br /></div>


//         <li id="strengths" className="notranslate">
//           <label className="desc" id="title7" for="Field7">Give one specific suggestion on how they could improve as a developer and/or team member.</label>
//           <div>
//             <textarea id="Field7" name="Field7" className="field textarea medium" spellcheck="true" rows="10" cols="50" tabindex="37" onkeyup="handleInput(this); "
//               onchange="handleInput(this);"></textarea>
//           </div>

//           <p className="ng-binding">Would you like to share this feedback (strengths) anonymously or non-anonymously?</p>
//           <div ng-repeat="option in options" className="ng-scope">
//             <label className="ng-binding">
//               <input type="radio" ng-model="partner.opinion" name="pair-rating" ng-value="1" className="ng-valid ng-not-empty ng-dirty ng-touched" value="1" style=""/>
//                 Anonymously
                        
//             </label><br />
//           </div>
//           <div ng-repeat="option in options" className="ng-scope">
//             <label className="ng-binding">
//               <input type="radio" ng-model="partner.opinion" name="pair-rating" ng-value="0" className="ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched" value="0" style=""/>
//                 Put my name on it!
                            
//             </label><br /></div>
//         </li>

//         <li>
//           <p className="ng-binding">Please tell us if you would like to pair with Kate Caldwell in the future. We will keep this confidential.</p>
//           <div ng-repeat="option in options" className="ng-scope">
//             <label className="ng-binding">
//               <input type="radio" ng-model="partner.opinion" name="pair-rating" ng-value="1" className="ng-pristine ng-untouched ng-valid ng-not-empty" value="1"/>Yes, please!
                              
//             </label>

//             <br />
//           </div>
//           <div ng-repeat="option in options" className="ng-scope">
//             <label className="ng-binding">
//               <input type="radio" ng-model="partner.opinion" name="pair-rating" ng-value="0" className="ng-pristine ng-untouched ng-valid ng-not-empty" value="0"/>
//                 I don't mind either way.
                                    
//             </label>
//             <br />
//           </div>
//           <div ng-repeat="option in options" className="ng-scope">
//             <label className="ng-binding">
//               <input type="radio" ng-model="partner.opinion" name="pair-rating" ng-value="-2" className="ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched" value="-2" style=""/>I'd prefer not to, thanks.</label>
//             ><br />
//           </div>
//           <textarea placeholder="Leave an optional comment" className="field mt2 pair-comment ng-valid ng-dirty ng-valid-parse ng-touched ng-empty" ng-model="partner.comment" style=""></textarea>
//           <br />
//           <label className="block mt1 mb1"><input ng-model="partner.wantsToTalk" type="checkbox" className="ng-pristine ng-untouched ng-valid ng-empty"/>I want to talk to someone about this pairing</label>

//         </li>
//         <button className="btn btn-primary mt1" ng-click="submit(partner)">Submit</button>
//       </ul>
//     </form>

//   </div>

// )