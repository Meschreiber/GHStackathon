// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value)
    }
    value = +value
    exp = +exp
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN
    }
    // If the value is negative...
    if (value < 0) {
      return -decimalAdjust(type, -value, exp)
    }
    // Shift
    value = value.toString().split('e')
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
    // Shift back
    value = value.toString().split('e')
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp)
    }
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp)
    }
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp)
    }
  }
})()

function Datum(id, name, ratings) {
  return ({
    id: id,
    name: name,
    ratings: ratings,
    strengthComments: [],
    improvementComments: []
  })
}

function Comment(num, text, author) {
  return {
    id: num,
    text: text,
    author: author
  }
}

function Ratings(peerArr, selfArr) {
  return [
    {
      label: 'peer',
      values: [{ x: 'C', y: peerArr[0] }, { x: 'N', y: peerArr[1] }, { x: 'P', y: peerArr[2] }, { x: 'I', y: peerArr[3] }, { x: 'O', y: peerArr[4] }]
    },
    {
      label: 'self',
      values: [{ x: 'C', y: selfArr[0] }, { x: 'N', y: selfArr[1] }, { x: 'P', y: selfArr[2] }, { x: 'I', y: selfArr[3] }, { x: 'O', y: selfArr[4] }]
    }
  ]
}

const randomSelf = (length, max) => [...new Array(length)]
  .map(() => Math.round(Math.random() * max) + 1)

const randomPeer = (length, max) => [...new Array(length)]
  .map(() => Math.round10(Math.random() * max, -1) + 1)

const randomRatings = () => new Ratings(randomPeer(5, 4), randomSelf(5, 4))

const weekNames = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Grace Shopper']

const classMates = ['Jodie', 'Rachel', 'Fish', 'Colleen', 'Mercedes', 'Ruth', 'Stefanie', 'Stefanie', 'Fanny', 'Arin', 'Allison', 'Elsa', 'Nitika', 'Keziyah', 'Cigdam', 'Sarah', 'Tina', 'Anonymous', 'Anonymous', 'Anonymous', 'Anonymous', 'Anonymous', 'Anonymous']

const improvementComments = [
  'Nothing! Maria is perfect in each and every way.',
  'For lack of a better way to say it, Maria can be difficult to work with. She insisted on driving AND navigating the entire time. I wish she had been open to some of my ideas',
  'Sometimes Maria had trouble articulating what she was trying to do.',
  'I don\'t think we took a break once in 6 hours ....',
  'As a pair, we were somewhat rudderless.',
  'Maria asked to take breaks every 15 minutes.',
  'Maria quickly gave up when working on CSS.',
  'She was often distracted by pigeons on the window sills.',
  'Her silence was often off-putting.',
  'She seemed to have a strong preference for driving -- I wanted to drive sometimes.',
  'Not much, I really enjoyed working with her!',
  'Often wanted to call a fellow over when we could have just googled the answer.',
  'she wanted to google everything and never ask for help',
  'she tried to explain everything to me all the time as though I had no clue what was going on',
  'working with her is fine, but I am worried about the amount of cereal she is eating',
  'Her banana bread is just too buttery',
  'She just wanted to work on a codewars problem instead of the workshop.',
  'when navigating she wasn\'t very helpful',
  'As a driver, she acted like she was just a typist and did not think very much. As a navigator she acted as though I wasn\'t allowed to have ideas.',
  'sometimes her moodswings were a bit much',
  'she seemed sleep-deprived. GET SOME SLEEP GIRL'
]

const strengthComments = [
  'She is so focused and made me focused too. I don\'t think we took a break once in 6 hours! Also, her notes are out of this world.',
  'Maria\'s strong grasp of CSS really helped us get through the ShoeString workshop.',
  'She made sure that we both got to drive and navigate fairly.',
  'As a team, we went through the workshop at a steady pace --- slow enough to absorb things, but fast enough to get through most of the material!',
  'We balance each other out well.',
  'She had a great amount of independence, but also used help tickets appropriately.',
  'Maria never makes spelling mistakes.',
  'Maria has got Promises down cold.',
  'I enjoyed her sense of experimentation and wanting to just see if things work.',
  'She was great at using the workshop text and code to her advantage.',
  'She knew the Sequelize docs front and back so we could quickly find what we were looking for.',
  'She was great at being considerate and always asking my opnions on things when she was driving.',
  'Maria put in extra work after hours, but kept things on a separate branch so she could show me the next day.',
  'Maria didn\'t have a clue about SQL but she was a great student when I tried to get her up to speed.',
  'Maria is a really great navigator -- she has docs and references handy and thinks in terms of the big picture.',
  'Maria really knows her stuff. She clearly read and re-read the pre-reading and took detailed notes during the lecture. She was also able to communicate her ideas clearly',
  'Maria was super driven to finish the workshop even though we were lagging sometimes.',
  'her energy and optimism are wonderful!',
  'Maria has got a great handle on React Router',
  'I really like her VSCode color scheme',
  'She showed me how to insert emoji\'s into my command line. Thanks, Maria!'
]

let counter = 0
var data = weekNames.map((weekName, index) => {
  var datum = new Datum(index + 1, weekName, randomRatings())
  var idArr = [counter++, counter++, counter++]
  datum.strengthComments = idArr.map(id =>
    new Comment(id, strengthComments[id], classMates[Math.round(Math.random() * 20)]))
  datum.improvementComments = idArr.map(id =>
    new Comment(id, improvementComments[id], classMates[Math.round(Math.random() * 20)]))
  return datum
})


let summaryRatings = new Ratings([0, 0, 0, 0, 0], [0, 0, 0, 0, 0])

data.forEach(datum => {
  datum.ratings[0].values.forEach((characterRating, index) => {
    summaryRatings[0].values[index]['y'] += characterRating['y']
  })
  datum.ratings[1].values.forEach((characterRating, index) => {
    summaryRatings[1].values[index]['y'] += characterRating['y']
  })
})

summaryRatings[0].values.forEach(rating => {
  rating['y'] = Math.round10(rating['y'] / data.length, -1)
})

summaryRatings[1].values.forEach(rating => {
  rating['y'] = Math.round10(rating['y'] / data.length, -1)
})

const summary = new Datum(data.length, 'summary', summaryRatings)

data.forEach(datum => {
  datum.strengthComments.forEach(comment => {
    summary.strengthComments.push(comment)
  })
  datum.improvementComments.forEach(comment => {
    summary.improvementComments.push(comment)
  })
})

export {data, summary}
