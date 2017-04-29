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
    var strengthComments = [
      {
        id: 1,
        text: 'Kate really knows her stuff. She clearly read and re-read the pre-reading and took detailed notes during the lecture. She was also able to communicate her ideas clearly.',
        author: 'Anonymous'
      },
      {
        id: 2,
        text: 'Kate might be the most naturally gifted programmer in the cohort.',
        author: 'Jodie'
      },
      {
        id: 3,
        text: 'She is so focused and made me focused too. I don\'t think we took a break once in 6 hours! Also, her notes are out of this world.',
        author: 'Fish'
      },
    ]

    var improvementComments = [
      {
        id: 4,
        text: 'I don\'t think we took a break once in 6 hours ....',
        author: 'Fish'
      },
      {
        id: 5,
        text: 'For lack of a better way to say it, Kate can be difficult to work with. She insisted on driving AND navigating the entire time. I wish she had been open to some of my ideas',
        author: 'Anonymous'
      },
      {
        id: 6,
        text: 'Nothing! Kate is perfect in each and every way.',
        author: 'Jodie'
      },
    ]

    return (
      <div>
        <Navbar />
        <div id="main">
          <div id="radar">
            <RadarChart />
          </div>
          <div />
          <div id="allComments">
            <div className="comments" id="strengths">
              <h1>Strengths and Contributions</h1>
              <Comments comments={strengthComments} />
            </div>
            <br/>
            <div className="comments" id="improvements">
              <h1>Areas for improvement</h1>
              <Comments comments={improvementComments}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedbackViz
