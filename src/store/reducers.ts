import { combineReducers, Reducer } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import tasksReducer from './Tasks/reducer';
import { firebaseReducer } from 'react-redux-firebase';
import { AppAuth } from '../types/firebase';

const reducers = combineReducers({
  tasks: tasksReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer as Reducer<AppAuth>,
});

export default reducers;
