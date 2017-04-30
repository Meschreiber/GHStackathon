import ReactD3 from 'react-d3-components'
var BarChart = ReactD3.BarChart


data = [
  {
    label: 'communcation',
    values: [{ x: 'self', y: 3.5 }, { x: 'peer', y: 5 }]
  },
  {
    label: 'plays nice with others',
    values: [{ x: 'self', y: 4 }, { x: 'peer', y: 2.5 }]
  },
  {
    label: 'open to new ideas',
    values: [{ x: 'self', y: 4 }, { x: 'peer', y: 3 }]
  },
  {
    label: 'independent',
    values: [{ x: 'self', y: 4 }, { x: 'peer', y: 5 }]
  },
  {
    label: 'organized and prepared',
    values: [{ x: 'self', y: 5 }, { x: 'peer', y: 5 }]
  }

];

return <BarChart
  groupedBars
  data={data}
  width={400}
  height={400}
  margin={{ top: 10, bottom: 50, left: 50, right: 10 }} />