import { combineReducers } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';
import tasksReducer from './Tasks/reducer';
import statusReducer from './Status/reducer';

const reducers = combineReducers({
  tasks: tasksReducer,
  statuses: statusReducer,
  toastr: toastrReducer,
});

export default reducers;
