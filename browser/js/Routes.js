import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Root from './components/Root';
import Form from './components/Form';
import FeedbackViz from './components/FeedbackViz';
import { fetchFeedbackFromWeek } from './redux/feedback';

/* -----------------    COMPONENT     ------------------ */

const Routes = ({ fetchInitialData }) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRoute component={Form} />
      <Route path="form" component={Form} />
      <Route path="feedback" component={FeedbackViz} />
      <Route path="*" component={Form} />
    </Route>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    let weekNum = 4; //hard-coded for now
    dispatch(fetchFeedbackFromWeek(weekNum));
  }
});

export default connect(mapProps, mapDispatch)(Routes);
