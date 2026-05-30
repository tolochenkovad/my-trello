import { isEmpty } from 'lodash';
import { StoreApi } from 'zustand';
import { sortObjectByKey } from '@/shared/utils';
import { InitialDataType } from '@/store/tasks/types';
import { fillColumnsWithTasks, removeTaskFromColumn } from './utils';
import { TasksStore } from './types';

export const createStateActions = (set: StoreApi<TasksStore>['setState'], get: StoreApi<TasksStore>['getState']) => ({
  setTasksData: (tasks: InitialDataType['tasks']) => {
    if (isEmpty(tasks)) return;

    set((state: TasksStore) => {
      const updatedColumns = fillColumnsWithTasks(state.dataForDraggable.columns, tasks);

      return {
        dataForDraggable: {
          ...state.dataForDraggable,
          tasks,
          columns: updatedColumns,
        },
        isLoadingTasks: false,
      };
    });
  },

  setColumnsData: (columns: InitialDataType['columns']) => {
    if (isEmpty(columns)) return;

    set((state: TasksStore) => ({
      dataForDraggable: {
        ...state.dataForDraggable,
        columns,
      },
      isLoadingColumns: false,
    }));
  },

  setTagsData: (tags: InitialDataType['tags']) => {
    set((state: TasksStore) => ({
      dataForDraggable: {
        ...state.dataForDraggable,
        tags,
      },
      isLoadingTags: false,
    }));
  },

  removeTaskData: (taskId: string) => {
    set({ isLoadingTasks: true });
    set((state: TasksStore) => {
      const { tasks } = state.dataForDraggable;
      const newTasks = sortObjectByKey(tasks, taskId);
      const updatedColumns = removeTaskFromColumn(state.dataForDraggable.columns, state.dataForDraggable.tasks, taskId);

      return {
        dataForDraggable: {
          ...state.dataForDraggable,
          tasks: newTasks,
          columns: updatedColumns,
          isLoadingTasks: false,
        },
      };
    });
  },

  saveDataLocally: (data: InitialDataType) => {
    set({ dataForDraggable: data });
  },

  addActiveTag: (tagId: string) => {
    const state = get();
    const { activeTagIds } = state;

    if (!activeTagIds.includes(tagId)) {
      set({ activeTagIds: [...activeTagIds, tagId] });
    }
  },

  removeActiveTag: (tagId: string) => {
    const state = get();
    const { activeTagIds } = state;

    if (activeTagIds.includes(tagId)) {
      set({ activeTagIds: activeTagIds.filter((id) => id !== tagId) });
    }
  },

  clearAllFilters: () => {
    set({ activeTagIds: [] });
  },
});
