
import React from 'react'
import { Link } from 'react-router'

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    //props should include week.num to say week number 
    // props should have week.dates to say dates of the week
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to={`feedback/week/${this.props.week - 1}`}>
                  <button>❮ Previous week </button>
                </Link>
              </li>
              <li id='currentWeek'> Week {this.props.week} </li>
              <li>
                <button>
                  <Link to={`feedback/week/${this.props.week + 1}`}> Next week ❯ </Link>
                </button>
              </li>
              <li>
                <Link to="feedback/summary">
                  <button>Summary</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar

// This will become the hamburger?
          // <div className="navbar-header">
          //   <button
          //     type="button"
          //     className="navbar-toggle collapsed"
          //     data-toggle="collapse"
          //     data-target=".navbar-collapse">
          //     <span className="icon-bar" />
          //     <span className="icon-bar" />
          //     <span className="icon-bar" />
          //   </button>
          // </div>