import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const GET_WEEK_DATA = 'GET_WEEK_DATA';


/* ------------   ACTION CREATORS     ------------------ */

const getWeekFeedback   = weekData => ({ type: GET_WEEK_DATA, weekData });

/* ------------       REDUCERS     ------------------ */

export default function reducer (weekData = [], action) {
  switch (action.type) {

    case GET_WEEK_DATA:
      return action.weekData;

    default:
      return weekData;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchFeedbackFromWeek = (weekNum) => dispatch => {
  axios.get(`/api/week/${weekNum}`)
        //getWeekFeedback
       .then(res => dispatch(getWeekFeedback(res.data)))
       .catch(err => console.error('Fetching feedback unsuccessful', err));
};

