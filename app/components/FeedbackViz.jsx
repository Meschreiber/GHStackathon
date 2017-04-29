import React from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'
import RadarChart from './Radar'
import Comments from './Comments'

/* -----------------    COMPONENT     ------------------ */

class FeedbackViz extends React.Component {
  constructor(props) {
    super(props)
    //props should include week.num to say week number 
    // props should have week.dates to say dates of the week
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id="main">
          <div id="radar">
            <RadarChart />
          </div>
          <div />
          <div id="allComments">
            <div id="strengths">
              <h1>Strengths</h1>
              <Comments />
            </div>
            <div id="improvements">
              <h1>Improvements</h1>
              <Comments />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedbackViz
