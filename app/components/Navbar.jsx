
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
    console.log('THE WEEK', this.props.weekId, 'disabled? ', +this.props.weekId >= 6)
    return (
      <nav className="navbar navbar-default">
        <div className="container">

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to={`/feedback/week/${+this.props.weekId - 1}`}>
                  <button disabled={+this.props.weekId === 1} className="week-button">
                    ❮ Previous week </button>
                </Link>
              </li>
              <li id='currentWeek'> {this.props.title} </li>
              <li>
                <Link to={`/feedback/week/${+this.props.weekId + 1}`}>
                  <button disabled={+this.props.weekId > 6} className="week-button">
                    Next week ❯
                </button>
                </Link>
              </li>
              <li>
                <Link to="/feedback/week/8">
                  <button className="week-button">Summary</button>
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