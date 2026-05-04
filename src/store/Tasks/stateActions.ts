import { isEmpty } from 'lodash';
import { StoreApi } from 'zustand';
import { sortObjectByKey } from '../../helpers/sortObject';
import { fillColumnsWithTasks, removeTaskFromColumn } from './helpers';
import { initialDataType } from '../../types/tasks';
import { TasksStore } from './types';

export const createStateActions = (set: StoreApi<TasksStore>['setState']) => ({
  setTasksData: (tasks: initialDataType['tasks']) => {
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

  setColumnsData: (columns: initialDataType['columns']) => {
    if (isEmpty(columns)) return;

    set((state: TasksStore) => ({
      dataForDraggable: {
        ...state.dataForDraggable,
        columns,
      },
      isLoadingColumns: false,
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

  saveDataLocally: (data: initialDataType) => {
    set({ dataForDraggable: data });
  },

  setError: (error: string | null) => {
    set({ error, isLoadingTasks: false, isLoadingColumns: false });
  },
});
