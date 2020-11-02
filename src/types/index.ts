import { ThunkAction } from 'redux-thunk';
import { initialStateTypesForReducer } from '../store/Tasks/reducer';
import { Action } from 'redux';
import reducers from "../store/reducers";

export type ThunkResult = ThunkAction<void, initialStateTypesForReducer, undefined, Action>;

export type AppStore = ReturnType<typeof reducers>;