/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as Constants from './constants';
import { ThunkAction } from 'redux-thunk';
import { initialState } from './reducer';
import { Action } from 'redux';

type ThunkResult = ThunkAction<void, typeof initialState, undefined, Action>;

const getAsync = () => new Promise((resolve) => console.log(resolve));

export const getRequest = (name2: string): ThunkResult => async (dispatch) => {
  await getAsync();
  dispatch(getCategories(name2));
};

export const getNotes = () => ({
  type: Constants.GET_NOTES,
  payload: { test: false },
});

export const getCategories = (name5: string) => {
  const value = 60;
  return {
    type: Constants.GET_CATEGORIES,
    payload: { isReady: true, name5, value },
  };
};

export type Actions = ReturnType<typeof getNotes> | ReturnType<typeof getCategories>;
