import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import reducers from '../store/reducers';

export type ThunkResult = ThunkAction<void, AppStore, undefined, Action>;

export type AppStore = ReturnType<typeof reducers>;
