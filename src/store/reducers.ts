import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';
import tasksReducer from './Tasks/reducer';
import { firebaseReducer } from 'react-redux-firebase';
import { AppAuth } from '../types/firebase';
import statusReducer from './Status/reducer';

const reducers = combineReducers({
  tasks: tasksReducer,
  statuses: statusReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer as Reducer<AppAuth>,
});

export default reducers;
