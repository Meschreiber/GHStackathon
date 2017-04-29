
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
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>

          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/week/num-1">previous week</Link>
              </li>
              <li> This week: Insert Week Dates </li>
              <li>
                <Link to="/week/num+1">next week</Link>
              </li>
              <li>
                <Link to="/summary">Summary</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
