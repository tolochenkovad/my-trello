import { all, call, takeLatest, put, select } from 'typed-redux-saga';
import {
  addTaskAction,
  editTaskAction,
  getTasksAction,
  removeTaskAction,
  saveDataToServerAction,
} from './actions';
import { toastr } from 'react-redux-toastr';
import { addDoc, getCollectionsFromFirebase, removeData, updateData } from '../../api/firebase/api';
import { COLLECTIONS } from '../../constants';
import { getAuth } from '../Authorization/selectors';
import { getDataForDraggable } from './selectors';
import { getIndexForNewTask } from './helpers';
import moment from 'moment';
import { size } from 'lodash';

function* getTasks() {
  try {
    const auth: ReturnType<typeof getAuth> = yield select(getAuth);
    const tasks = yield* call (getCollectionsFromFirebase, COLLECTIONS.tasks, auth.uid);
    yield put(getTasksAction.fulfilled({ tasks }));
  } catch (error) {
    toastr.error(error, '');
  }
}

function* addTask (
  {
    payload,
  }: ReturnType<typeof addTaskAction.pending>,
) {
  try {
    const { color, dateOfTheEnd, value } = payload;
    const auth: ReturnType<typeof getAuth> = yield select(getAuth);
    const authId = auth.uid;
    const dataForDraggable: ReturnType<typeof getDataForDraggable> = yield select(getDataForDraggable);
    const { tasks } = dataForDraggable;
    const index = getIndexForNewTask(tasks);
    const newTask = {
      [`task-${index}`]: { id: `task-${index}`, content: value, columnId: 'column-1', date: moment().format(), color, dateOfTheEnd },
    };
    if (size(tasks) === 0) {
      yield* call(addDoc, COLLECTIONS.tasks, newTask, authId);
    } else {
      yield* call(updateData, COLLECTIONS.tasks, newTask, authId);
    }
    yield* call(getTasks);
  } catch (error) {
    toastr.error(error, '');
  }
}

function* editTask (
  {
    payload
  }: ReturnType<typeof editTaskAction.pending>
) {
  try {
    const { color, dateOfTheEnd, value, taskId } = payload;
    const auth: ReturnType<typeof getAuth> = yield select(getAuth);
    const authId = auth.uid;
    const dataForDraggable: ReturnType<typeof getDataForDraggable> = yield select(getDataForDraggable);
    const { tasks } = dataForDraggable;
    const taskData = { [taskId]: tasks[taskId] };
    const updatedTask = {
      ...taskData,
      [taskId]: {
        ...taskData[taskId],
        content: value,
        date: moment().format(),
        color,
        dateOfTheEnd,
      }
    };

    yield* call(updateData, COLLECTIONS.tasks, updatedTask, authId);
    yield* call(getTasks);
  } catch (error) {
    toastr.error(error, '');
  }
}

function* saveDataToServer(
  {
    payload,
  }: ReturnType<typeof saveDataToServerAction.pending>
) {
  try {
    yield put(saveDataToServerAction.fulfilled({ data: payload }));
    const auth: ReturnType<typeof getAuth> = yield select(getAuth);
    const authId = auth.uid;
    yield* call(updateData, COLLECTIONS.tasks, payload.tasks, authId);
    yield* call(getTasks);
  } catch (error) {
    toastr.error(error, '');
  }
}

function* removeTask(
  {
    payload,
  }: ReturnType<typeof removeTaskAction.pending>
) {
  try {
    const auth: ReturnType<typeof getAuth> = yield select(getAuth);
    const authId = auth.uid;
    yield put(removeTaskAction.fulfilled({ taskId: payload.taskId }));
    yield* call(removeData, COLLECTIONS.tasks, payload.taskId, authId);
    yield* call(getTasks);
  } catch (error) {
    toastr.error(error, '');
  }
}


export default function* tasksSaga() {
  yield all([
    takeLatest(getTasksAction.pending, getTasks),
    takeLatest(addTaskAction.pending, addTask),
    takeLatest(editTaskAction.pending, editTask),
    takeLatest(saveDataToServerAction.pending, saveDataToServer),
    takeLatest(removeTaskAction.pending, removeTask),
  ]);
}