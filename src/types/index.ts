import { ThunkAction } from 'redux-thunk';
import { initialStateTypesForReducer } from '../store/Tasks/reducer';
import { Action } from 'redux';

export type ThunkResult = ThunkAction<void, initialStateTypesForReducer, undefined, Action>;