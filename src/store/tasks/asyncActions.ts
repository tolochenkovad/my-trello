import { size } from 'lodash';
import { StoreApi } from 'zustand';
import moment from 'moment';
import { addDoc, getCollectionsFromFirebase, removeData, updateData } from '@/api/firebase/api';
import { showToast } from '@/shared/utils';
import { getAuthUserId, getIndexForNewTask, getTagsForServer, getTagIds } from './utils';
import { AddTaskPayload, EditTaskPayload, SaveDataToServerPayload, TasksStore, COLLECTIONS, TaskItem } from './types';

export const createAsyncActions = (set: StoreApi<TasksStore>['setState'], get: StoreApi<TasksStore>['getState']) => ({
  getTasks: async () => {
    try {
      set({ isLoadingTasks: true });
      const authId = getAuthUserId();

      if (authId) {
        const tasks = await getCollectionsFromFirebase(COLLECTIONS.tasks, authId);
        get().actions.setTasksData(tasks);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
      set({ isLoadingTasks: false });
      showToast(errorMessage, 'error');
    }
  },

  getTags: async () => {
    try {
      set({ isLoadingTags: true });
      const authId = getAuthUserId();

      if (authId) {
        const tags = await getCollectionsFromFirebase(COLLECTIONS.tags, authId);
        get().actions.setTagsData(tags?.tags || []);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tags';
      set({ isLoadingTags: false });
      showToast(errorMessage, 'error');
    }
  },

  getColumns: async () => {
    try {
      set({ isLoadingColumns: true });
      const authId = getAuthUserId();

      if (authId) {
        const columns = await getCollectionsFromFirebase(COLLECTIONS.columns, authId);
        get().actions.setColumnsData(columns);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch columns';
      set({ isLoadingColumns: false });
      showToast(errorMessage, 'error');
    }
  },

  getAllData: async () => {
    try {
      await get().actions.getTasks();
      await get().actions.getColumns();
      await get().actions.getTags();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to data';
      showToast(errorMessage, 'error');
    } finally {
      set({ isInitialLoading: false });
    }
  },

  addTask: async (payload: AddTaskPayload) => {
    try {
      set({ isLoadingTasks: true });
      const { dateOfTheEnd, value, tags: currentTags } = payload;
      const authId = getAuthUserId();

      if (authId) {
        const state = get();
        const { tasks, tags } = state.dataForDraggable;
        const index = getIndexForNewTask(tasks);
        const tagsServer = getTagsForServer(tags, currentTags);
        const currentTagIds = getTagIds(currentTags);

        const newTaskValue: TaskItem = {
          id: `task-${index}`,
          content: value,
          columnId: 'column-1',
          date: moment().format(),
          dateOfTheEnd,
          tagIds: currentTagIds,
        };

        const newTask = {
          [`task-${index}`]: newTaskValue,
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

        if (size(tags) === 0) {
          await addDoc(COLLECTIONS.tags, tagsServer, authId);
        } else {
          await updateData(COLLECTIONS.tags, tagsServer, authId);
          get().actions.setTagsData(tagsServer?.tags || []);
        }

        showToast('New task was successfully created', 'success');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
      set({ isLoadingTasks: false });
      showToast(errorMessage, 'error');
    }
  },

  editTask: async (payload: EditTaskPayload) => {
    try {
      set({ isLoadingTasks: true });
      const { dateOfTheEnd, value, taskId, tags: currentTags } = payload;
      const authId = getAuthUserId();

      if (authId) {
        const state = get();
        const { tasks, tags } = state.dataForDraggable;
        const taskData = { [taskId]: tasks[taskId] };
        const tagsServer = getTagsForServer(tags, currentTags);
        const currentTagIds = getTagIds(currentTags);

        const updatedTaskValue: TaskItem = {
          ...taskData[taskId],
          content: value,
          date: moment().format(),
          dateOfTheEnd,
          tagIds: currentTagIds,
        };

        const updatedTask = {
          ...taskData,
          [taskId]: updatedTaskValue,
        };

        await updateData(COLLECTIONS.tasks, updatedTask, authId);
        await updateData(COLLECTIONS.tags, tagsServer, authId);

        await get().actions.getTags();
        await get().actions.getTasks();

        showToast('Task was successfully updated', 'success');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to edit task';
      set({ isLoadingTasks: false });
      showToast(errorMessage, 'error');
    }
  },

  saveDataToServer: async (payload: SaveDataToServerPayload) => {
    try {
      set({ isLoadingTasks: true, isLoadingColumns: true });
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
      set({ isLoadingTasks: false, isLoadingColumns: false });
      showToast(errorMessage, 'error');
    }
  },

  removeTask: async (taskId: string) => {
    try {
      set({ isLoadingTasks: true });
      const authId = getAuthUserId();

      if (authId) {
        get().actions.removeTaskData(taskId);
        await removeData(COLLECTIONS.tasks, taskId, authId);
        const state = get();
        await updateData(COLLECTIONS.columns, state.dataForDraggable.columns, authId);
        await get().actions.getColumns();
        await get().actions.getTasks();
        showToast('Task was successfully removed', 'success');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove task';
      set({ isLoadingTasks: false });
      showToast(errorMessage, 'error');
    }
  },
});
