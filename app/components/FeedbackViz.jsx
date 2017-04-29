import React from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'
import RadarChart from './Radar'
import Comments from './Comments'
import { VictoryBar, VictoryGroup, VictoryStack } from 'victory'

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
        <Navbar week={4} />
        <div id='main'>
          <div id='radar'>
            <VictoryGroup
              horizontal={true}
              events={[{
                childName: ['bar-1', 'bar-2'],
                target: 'data',
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        childName: ['bar-3', 'bar-4'],
                        target: 'data',
                        mutation: (props) => {
                          const fill = props.style.fill
                          return fill === 'gold' ? null : { style: { fill: 'gold' } }
                        },
                        callback: () => {
                          console.log('I happen after setState')
                        }
                      }
                    ]
                  }
                }
              }]}
            >
              <VictoryStack>
                <VictoryBar name='bar-1'
                  data={[{ x: 'a', y: 2 }, { x: 'b', y: 3 }, { x: 'c', y: 5 }]}
                />
                <VictoryBar name='bar-2'
                  data={[{ x: 'a', y: 1 }, { x: 'b', y: 4 }, { x: 'c', y: 5 }]}
                />
              </VictoryStack>

            </VictoryGroup>
          </div>
          <div />
          <div id='allComments'>
            <h1>Strengths and Contributions</h1>
            <div className='comments' id='strengths'>
              <Comments comments={strengthComments} />
            </div>
            <br />
            <h1>Areas for improvement</h1>
            <div className='comments' id='strengths'>
              <Comments comments={improvementComments} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedbackViz
