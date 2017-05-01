import React from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'
// import RadarChart from './Radar'
import Comments from './Comments'
import { data, summary } from './data'

import * as ReactD3 from 'react-d3-components'
var BarChart = ReactD3.BarChart



import firebase from 'APP/fire'
var database = firebase.database()
firebase.database().ref('feedback/').set(data)


var tooltipBar = function(x, y0, y) {
  let characteristic = ''
  switch (x) {
  case 'C':
    characteristic = 'communication'
    break
  case 'N':
    characteristic = 'plays nice'
    break
  case 'P':
    characteristic = 'prepared'
    break
  case 'I':
    characteristic = 'independent'
    break
  case 'O':
    characteristic = 'open'
    break
  default:
    break
  }
  return characteristic + ": " + y;
}

// const ratings = [
//   {
//     label: 'peer',
//     values: [{ x: 'C', y: 3.2 }, { x: 'N', y: 2.8 }, { x: 'P', y: 4.5 }, { x: 'I', y: 5 }, { x: 'O', y: 3.5 }]
//   },
//   {
//     label: 'self',
//     values: [{ x: 'C', y: 4 }, { x: 'N', y: 3 }, { x: 'P', y: 4 }, { x: 'I', y: 4 }, { x: 'O', y: 2 }]
//   }
// ]

// var strengthComments = [
//   {
//     id: 1,
//     text: 'Maria really knows her stuff. She clearly read and re-read the pre-reading and took detailed notes during the lecture. She was also able to communicate her ideas clearly.',
//     author: 'Anonymous'
//   },
//   {
//     id: 2,
//     text: 'Maria\'s strong grasp of CSS really helped us get through the ShoeString workshop.',
//     author: 'Colleen'
//   },
//   {
//     id: 3,
//     text: 'She is so focused and made me focused too. I don\'t think we took a break once in 6 hours! Also, her notes are out of this world.',
//     author: 'Fish'
//   },
// ]

// var improvementComments = [
//   {
//     id: 4,
//     text: 'I don\'t think we took a break once in 6 hours ....',
//     author: 'Fish'
//   },
//   {
//     id: 5,
//     text: 'For lack of a better way to say it, Maria can be difficult to work with. She insisted on driving AND navigating the entire time. I wish she had been open to some of my ideas',
//     author: 'Kate'
//   },
//   {
//     id: 6,
//     text: 'Nothing! Maria is perfect in each and every way.',
//     author: 'Jodie'
//   },
// ]

// console.log('DATA', data)
/* -----------------    COMPONENT     ------------------ */

export default (props) => {
  const weekId = props.params.weekId - 1
  const theWeek = weekId === data.length ? summary : data[weekId]
  console.log('weekId', weekId, 'theWeek', theWeek)
  return (
    <div>
      <Navbar weekId={props.params.weekId} title={theWeek.name} />
      <div id="main">
        <div className="chartWrapper">
          <div id="radar">
            <h3>Peer and Self Evaluations</h3>
            <br />
            <BarChart
              groupedBars
              data={theWeek.ratings}
              width={400}
              height={300}
              tooltipHtml={tooltipBar}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />
            <div id="legend">
              <span id="peer">■ Peer Averages</span>
              <span id="self">■ Self</span>
            </div>
          </div>

        </div>
        <div />
        <div id="allComments">
          <h3>Strengths and Contributions</h3>
          <div className="comments">
            <Comments comments={theWeek.strengthComments} />
          </div>
          <br />
          <h3>Areas for improvement</h3>
          <div className="comments">
            <Comments comments={theWeek.improvementComments} />
          </div>
        </div>
      </div>
    </div>
  )
}



