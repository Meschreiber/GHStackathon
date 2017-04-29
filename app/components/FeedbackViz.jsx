import React from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'
import RadarChart from './Radar'
import Comments from './Comments'


const strengthComments = [
  {
    id: 1,
    text: 'Maria really knows her stuff. She clearly read and re-read the pre-reading and took detailed notes during the lecture. She was also able to communicate her ideas clearly.',
    author: 'Anonymous'
  },
  {
    id: 2,
    text: 'Maria might be the most naturally gifted programmer in the cohort.',
    author: 'Jodie'
  },
  {
    id: 3,
    text: 'She is so focused and made me focused too. I don\'t think we took a break once in 6 hours! Also, her notes are out of this world.',
    author: 'Fish'
  },
]

const improvementComments = [
  {
    id: 4,
    text: 'I don\'t think we took a break once in 6 hours ....',
    author: 'Fish'
  },
  {
    id: 5,
    text: 'For lack of a better way to say it, Maria can be difficult to work with. She insisted on driving AND navigating the entire time. I wish she had been open to some of my ideas',
    author: 'Anonymous'
  },
  {
    id: 6,
    text: 'Nothing! Maria is perfect in each and every way.',
    author: 'Jodie'
  },
]

const weekRatings = [
  {
    num: 1,
    ratings: [
      {
        className: 'self',
        axes: [
          { axis: 'communication', value: 5 },
          { axis: 'plays well with others', value: 5 },
          { axis: 'open to new ideas', value: 5 },
          { axis: 'organization and preparation', value: 5 },
          { axis: 'driven and independent', value: 5 }
        ]
      },
      {
        className: 'peer',
        axes: [
          { axis: 'communication', value: 2.5 },
          { axis: 'plays well with others', value: 3 },
          { axis: 'open to new ideas', value: 2.7 },
          { axis: 'organization and preparation', value: 3.5 },
          { axis: 'driven and independent', value: 4.7 }
        ]
      }
    ]
  },
  {
    num: 2,
    ratings: [
      {
        className: 'self',
        axes: [
          { axis: 'communication', value: 3 },
          { axis: 'plays well with others', value: 4 },
          { axis: 'open to new ideas', value: 1 },
          { axis: 'organization and preparation', value: 5 },
          { axis: 'driven and independent', value: 5 }
        ]
      },
      {
        className: 'peer',
        axes: [
          { axis: 'communication', value: 3.5 },
          { axis: 'plays well with others', value: 2 },
          { axis: 'open to new ideas', value: 2.7 },
          { axis: 'organization and preparation', value: 4.5 },
          { axis: 'driven and independent', value: 4.7 }
        ]
      }
    ]
  },
]

const styles = {
  width: 500,
  height: 300,
  padding: 30,
}

// The number of data points for the chart.
const numDataPoints = 50

// A function that returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 1000)

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, { length: numDataPoints }).map(() => [randomNum(), randomNum()]);
}


/* -----------------    COMPONENT     ------------------ */

class FeedbackViz extends React.Component {
  constructor(props) {
    super(props)
    // props should include week.num to say week number
    // props should have week.dates to say dates of the week

    this.state = { data: randomDataSet() }
  }

  randomizeData() {
    this.setState({ data: randomDataSet() })
  }


  render() {
    return (
      <div>
        <Navbar week={this.props.currWeek} />
        <div id="main">
          <div id="radar">
            <RadarChart {...this.state} {...styles} week={this.props.currWeek} weekRatings={weekRatings} />
          </div>
          <div />
          <div id="allComments">
            <h1>Strengths and Contributions</h1>
            <div className="comments" id="strengths">
              <Comments comments={strengthComments} />
            </div>
            <br />
            <h1>Areas for improvement</h1>
            <div className="comments" id="strengths">
              <Comments comments={improvementComments} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedbackViz
