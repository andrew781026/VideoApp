import {combineReducers} from 'redux';
import ReduxUser from './user/actionReducer';

export default combineReducers({
  user: ReduxUser.Reducer,
});
