import * as Constants from './constants';
import { initialDataType } from '../../types/tasks';
import { toastr } from 'react-redux-toastr';
import { ThunkResult } from '../../types';
import { addDoc, getCollectionsFromFirebase } from '../../api/firebase/api';
import { COLLECTIONS } from '../../constants';

// thunks
export const getTasks = (): ThunkResult => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const authId = getState().firebase.auth.uid;
    const data = await getCollectionsFromFirebase(COLLECTIONS.tasks, authId);
    dispatch(setTasks(data));
  } catch (error) {
    toastr.error(error, '');
    dispatch(setError(error));
  }
};

export const addTask = (): ThunkResult => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const authId = getState().firebase.auth.uid;
    const { tasks } = getState().tasks.dataForDraggable;
    const newData = { ...tasks, 'task-3': { id: 'task-3', content: 'Test task', columnId: 'column-1' } };
    await addDoc(COLLECTIONS.tasks, newData, authId);
    dispatch(getTasks());
  } catch (error) {
    toastr.error(error, '');
    dispatch(setError(error));
  }
};

// actions
export const setTasks = (tasks: initialDataType['tasks']) => ({
  type: Constants.SET_TASKS,
  payload: { tasks },
});

const setError = (error: Error) => ({
  type: Constants.SET_ERROR,
  payload: { error },
});

export const setLoading = () => ({
  type: Constants.SET_LOADING,
});

export type Actions = ReturnType<typeof setTasks> | ReturnType<typeof setError> | ReturnType<typeof setLoading>;
