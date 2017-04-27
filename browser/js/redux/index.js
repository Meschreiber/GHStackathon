import { combineReducers } from 'redux';
import feedback from './feedback';
// eventually will want to add multiple users and combine reducers, although there is only one here now

export default combineReducers({ feedback });