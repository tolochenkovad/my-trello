import { all, call, takeLatest, put, select } from 'typed-redux-saga';
import moment from 'moment';
import { size, get } from 'lodash';
import { getAuth } from 'firebase/auth';
import { addDoc, getCollectionsFromFirebase, removeData, updateData } from '../../api/firebase/api';
import { COLLECTIONS } from '../../constants';
import {
  addTaskAction,
  editTaskAction,
  getColumnsAction,
  getTasksAction,
  removeTaskAction,
  saveDataToServerAction,
} from './actions';
import { getDataForDraggable } from './selectors';
import { getIndexForNewTask } from './helpers';

function* getTasks() {
  try {
    const auth: ReturnType<typeof getAuth> = yield call(getAuth);
    const authId = get(auth, 'currentUser.uid');
    if (authId) {
      const tasks = yield* call(getCollectionsFromFirebase, COLLECTIONS.tasks, authId);
      yield put(getTasksAction.fulfilled({ tasks }));
    }
  } catch (error) {
    getTasksAction.rejected({}, { arg: { error } });
  }
}

function* getColumns() {
  try {
    const auth: ReturnType<typeof getAuth> = yield call(getAuth);
    const authId = get(auth, 'currentUser.uid');
    if (authId) {
      const columns = yield* call(getCollectionsFromFirebase, COLLECTIONS.columns, authId);
      yield put(getColumnsAction.fulfilled({ columns }));
    }
  } catch (error) {
    getColumnsAction.rejected({}, { arg: { error } });
  }
}

function* addTask({ payload }: ReturnType<typeof addTaskAction.pending>) {
  try {
    const { color, dateOfTheEnd, value } = payload;
    const auth: ReturnType<typeof getAuth> = yield call(getAuth);
    const authId = get(auth, 'currentUser.uid');
    if (authId) {
      const dataForDraggable: ReturnType<typeof getDataForDraggable> = yield select(getDataForDraggable);
      const { tasks } = dataForDraggable;
      const index = getIndexForNewTask(tasks);
      const newTask = {
        [`task-${index}`]: {
          id: `task-${index}`,
          content: value,
          columnId: 'column-1',
          date: moment().format(),
          color,
          dateOfTheEnd,
        },
      };
      if (size(tasks) === 0) {
        yield* call(addDoc, COLLECTIONS.tasks, newTask, authId);
      } else {
        yield* call(updateData, COLLECTIONS.tasks, newTask, authId);
      }
      yield* call(getTasks);

      const dataForDraggableUpdated: ReturnType<typeof getDataForDraggable> = yield select(getDataForDraggable);
      if (size(tasks) === 0) {
        yield* call(addDoc, COLLECTIONS.columns, dataForDraggableUpdated.columns, authId);
      } else {
        yield* call(updateData, COLLECTIONS.columns, dataForDraggableUpdated.columns, authId);
      }
    }
  } catch (error) {
    addTaskAction.rejected({}, { arg: { error } });
  }
}

function* editTask({ payload }: ReturnType<typeof editTaskAction.pending>) {
  try {
    const { color, dateOfTheEnd, value, taskId } = payload;
    const auth: ReturnType<typeof getAuth> = yield call(getAuth);
    const authId = get(auth, 'currentUser.uid');
    if (authId) {
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
        },
      };

      yield* call(updateData, COLLECTIONS.tasks, updatedTask, authId);
      yield* call(getTasks);
    }
  } catch (error) {
    editTaskAction.rejected({}, { arg: { error } });
  }
}

function* saveDataToServer({ payload }: ReturnType<typeof saveDataToServerAction.pending>) {
  try {
    const { data, isReorder } = payload;
    yield put(saveDataToServerAction.fulfilled({ data }));
    const auth: ReturnType<typeof getAuth> = yield call(getAuth);
    const authId = get(auth, 'currentUser.uid');
    if (authId) {
      yield* call(updateData, COLLECTIONS.columns, data.columns, authId);
      yield* call(getColumns);
      if (!isReorder) {
        yield* call(updateData, COLLECTIONS.tasks, data.tasks, authId);
        yield* call(getTasks);
      }
    }
  } catch (error) {
    saveDataToServerAction.rejected({}, { arg: { error } });
  }
}

function* removeTask({ payload }: ReturnType<typeof removeTaskAction.pending>) {
  try {
    const auth: ReturnType<typeof getAuth> = yield call(getAuth);
    const authId = get(auth, 'currentUser.uid');
    if (authId) {
      yield put(removeTaskAction.fulfilled({ taskId: payload.taskId }));
      yield* call(removeData, COLLECTIONS.tasks, payload.taskId, authId);
      const dataForDraggable: ReturnType<typeof getDataForDraggable> = yield select(getDataForDraggable);
      yield* call(updateData, COLLECTIONS.columns, dataForDraggable.columns, authId);
      yield* call(getColumns);
      yield* call(getTasks);
    }
  } catch (error) {
    removeTaskAction.rejected({}, { arg: { error } });
  }
}

export default function* tasksSaga() {
  yield all([
    takeLatest(getTasksAction.pending, getTasks),
    takeLatest(getColumnsAction.pending, getColumns),
    takeLatest(addTaskAction.pending, addTask),
    takeLatest(editTaskAction.pending, editTask),
    takeLatest(saveDataToServerAction.pending, saveDataToServer),
    takeLatest(removeTaskAction.pending, removeTask),
  ]);
}
