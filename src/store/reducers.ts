import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import tasksReducer from "./Tasks/reducer";

const reducers = combineReducers({
  tasks: tasksReducer,
  toastr: toastrReducer,
});

export default reducers;
