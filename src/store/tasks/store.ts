import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { InitialDataType } from '@/store/tasks/types';
import { TasksStore } from './types';
import { createStateActions } from './stateActions';
import { createAsyncActions } from './asyncActions';

export const INITIAL_DATA: InitialDataType = {
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
  tags: []
};

export const useTasksStore = create<TasksStore>()(
  devtools((set, get) => ({
    dataForDraggable: INITIAL_DATA,
    isLoadingTasks: false,
    isLoadingColumns: false,

    actions: {
      ...createStateActions(set),
      ...createAsyncActions(set, get),
    },
  })),
);
