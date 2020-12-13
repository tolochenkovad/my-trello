import * as Constants from './constants';
import { initialDataType } from '../../types/tasks';
import { toastr } from 'react-redux-toastr';
import { ThunkResult } from '../../types';
import { addDoc, getCollectionsFromFirebase, removeData, updateData } from '../../api/firebase/api';
import { COLLECTIONS } from '../../constants';
import { getIndexForNewTask } from './helpers';
import { size } from 'lodash';

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

export const addTask = (value: string): ThunkResult => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const authId = getState().firebase.auth.uid;
    const { tasks } = getState().tasks.dataForDraggable;
    const index = getIndexForNewTask(tasks);
    const newTask = { [`task-${index}`]: { id: `task-${index}`, content: value, columnId: 'column-1' } };
    if (size(tasks) === 0) {
      await addDoc(COLLECTIONS.tasks, newTask, authId);
    } else {
      await updateData(COLLECTIONS.tasks, newTask, authId);
    }
    dispatch(getTasks());
  } catch (error) {
    toastr.error(error, '');
    dispatch(setError(error));
  }
};

export const editTask = (value: string, taskId: string): ThunkResult => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const authId = getState().firebase.auth.uid;
    const { tasks } = getState().tasks.dataForDraggable;
    const updatedTask = { [taskId]: tasks[taskId] };
    updatedTask[taskId].content = value;
    await updateData(COLLECTIONS.tasks, updatedTask, authId);
    dispatch(getTasks());
  } catch (error) {
    toastr.error(error, '');
    dispatch(setError(error));
  }
};

export const saveDataToServer = (data: initialDataType): ThunkResult => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    dispatch(saveData(data));
    const authId = getState().firebase.auth.uid;
    await updateData(COLLECTIONS.tasks, data.tasks, authId);
    dispatch(getTasks());
  } catch (error) {
    toastr.error(error, '');
    dispatch(setError(error));
  }
};

export const removeTask = (taskId: string): ThunkResult => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const authId = getState().firebase.auth.uid;
    dispatch(deleteTask(taskId));
    await removeData(COLLECTIONS.tasks, taskId, authId);
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

export const deleteTask = (taskId: string) => ({
  type: Constants.REMOVE_TASK,
  payload: { taskId },
});

const setError = (error: Error) => ({
  type: Constants.SET_ERROR,
  payload: { error },
});

const saveData = (data: initialDataType) => ({
  type: Constants.SAVE_DATA,
  payload: { data },
});

export const setLoading = () => ({
  type: Constants.SET_LOADING,
});

export type Actions =
  | ReturnType<typeof setTasks>
  | ReturnType<typeof deleteTask>
  | ReturnType<typeof saveData>
  | ReturnType<typeof setError>
  | ReturnType<typeof setLoading>;
