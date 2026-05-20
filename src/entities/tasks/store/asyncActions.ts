import { size } from 'lodash';
import { StoreApi } from 'zustand';
import moment from 'moment';
import { addDoc, getCollectionsFromFirebase, removeData, updateData } from '@/api/firebase/api';
import { getAuthUserId, getIndexForNewTask } from './helpers';
import { AddTaskPayload, EditTaskPayload, SaveDataToServerPayload, TasksStore, COLLECTIONS } from './types';

export const createAsyncActions = (set: StoreApi<TasksStore>['setState'], get: StoreApi<TasksStore>['getState']) => ({
  getTasks: async () => {
    try {
      set({ isLoadingTasks: true, error: null });
      const authId = getAuthUserId();

      if (authId) {
        const tasks = await getCollectionsFromFirebase(COLLECTIONS.tasks, authId);
        get().actions.setTasksData(tasks);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
      set({ error: errorMessage, isLoadingTasks: false });
    }
  },

  getColumns: async () => {
    try {
      set({ isLoadingColumns: true, error: null });
      const authId = getAuthUserId();

      if (authId) {
        const columns = await getCollectionsFromFirebase(COLLECTIONS.columns, authId);
        get().actions.setColumnsData(columns);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch columns';
      set({ error: errorMessage, isLoadingColumns: false });
    }
  },

  addTask: async (payload: AddTaskPayload) => {
    try {
      set({ isLoadingTasks: true, error: null });
      const { dateOfTheEnd, value } = payload;
      const authId = getAuthUserId();

      if (authId) {
        const state = get();
        const { tasks } = state.dataForDraggable;
        const index = getIndexForNewTask(tasks);

        const newTask = {
          [`task-${index}`]: {
            id: `task-${index}`,
            content: value,
            columnId: 'column-1',
            date: moment().format(),
            dateOfTheEnd,
          },
        };

        if (size(tasks) === 0) {
          await addDoc(COLLECTIONS.tasks, newTask, authId);
        } else {
          await updateData(COLLECTIONS.tasks, newTask, authId);
        }

        await get().actions.getTasks();

        const updatedState = get();
        if (size(tasks) === 0) {
          await addDoc(COLLECTIONS.columns, updatedState.dataForDraggable.columns, authId);
        } else {
          await updateData(COLLECTIONS.columns, updatedState.dataForDraggable.columns, authId);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
      set({ error: errorMessage, isLoadingTasks: false });
    }
  },

  editTask: async (payload: EditTaskPayload) => {
    try {
      set({ isLoadingTasks: true, error: null });
      const { dateOfTheEnd, value, taskId } = payload;
      const authId = getAuthUserId();

      if (authId) {
        const state = get();
        const { tasks } = state.dataForDraggable;
        const taskData = { [taskId]: tasks[taskId] };

        const updatedTask = {
          ...taskData,
          [taskId]: {
            ...taskData[taskId],
            content: value,
            date: moment().format(),
            dateOfTheEnd,
          },
        };

        await updateData(COLLECTIONS.tasks, updatedTask, authId);
        await get().actions.getTasks();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to edit task';
      set({ error: errorMessage, isLoadingTasks: false });
    }
  },

  saveDataToServer: async (payload: SaveDataToServerPayload) => {
    try {
      set({ isLoadingTasks: true, isLoadingColumns: true, error: null });
      const { data, isReorder = false } = payload;
      get().actions.saveDataLocally(data);

      const authId = getAuthUserId();

      if (authId) {
        await updateData(COLLECTIONS.columns, data.columns, authId);
        await get().actions.getColumns();

        if (!isReorder) {
          await updateData(COLLECTIONS.tasks, data.tasks, authId);
          await get().actions.getTasks();
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save data to server';
      set({ error: errorMessage, isLoadingTasks: false, isLoadingColumns: false });
    }
  },

  removeTask: async (taskId: string) => {
    try {
      set({ isLoadingTasks: true, error: null });
      const authId = getAuthUserId();

      if (authId) {
        get().actions.removeTaskData(taskId);
        await removeData(COLLECTIONS.tasks, taskId, authId);
        const state = get();
        await updateData(COLLECTIONS.columns, state.dataForDraggable.columns, authId);
        await get().actions.getColumns();
        await get().actions.getTasks();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove task';
      set({ error: errorMessage, isLoadingTasks: false });
    }
  },
});
