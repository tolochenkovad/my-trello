/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as Constants from './constants';
import * as api from '../../api/tasks';
import { initialDataType } from '../../types/tasks';
import { toastr } from 'react-redux-toastr';
import { ThunkResult } from '../../types';

export const getTasks = (): ThunkResult => async (dispatch) => {
  dispatch(setLoading());
  try {
    const data = await api.getTasks();
    dispatch(setTasks(data));
  } catch (error) {
    toastr.error(error, '');
    dispatch(setError(error));
  }
};

export const setTasks = (data: initialDataType) => ({
  type: Constants.SET_TASKS,
  payload: { data },
});

const setError = (error: Error) => ({
  type: Constants.SET_ERROR,
  payload: { error },
});

const setLoading = () => ({
  type: Constants.SET_LOADING,
});

export type Actions = ReturnType<typeof setTasks> | ReturnType<typeof setError> | ReturnType<typeof setLoading>;
