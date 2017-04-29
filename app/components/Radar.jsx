// props.weekRatings --> all week ratings
// props.currWeek -> int of week we are looking at, if 0 --> look at all
// alternatively, only pass weekRatings for current week from the get go, if it's a summary, pass all week ratings
import React from 'react'
import * as d3 from 'd3'
import RadarChart from './radarChart'

var data = [
  {
    className: 'germany', // optional can be used for styling
    axes: [
      { axis: 'strength', value: 13 },
      { axis: 'intelligence', value: 6 },
      { axis: 'charisma', value: 5 },
      { axis: 'dexterity', value: 9 },
      { axis: 'luck', value: 2 }
    ]
  },
  {
    className: 'argentina',
    axes: [
      { axis: 'strength', value: 6 },
      { axis: 'intelligence', value: 7 },
      { axis: 'charisma', value: 10 },
      { axis: 'dexterity', value: 13 },
      { axis: 'luck', value: 9 }
    ]
  }
]
RadarChart.draw('.chart-container', data)


export default (props) => {
  return <div className='chart-container'>
    <h1> Radar Chart coming right up </h1>
  </div>
}




