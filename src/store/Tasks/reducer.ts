import { forEach, isEmpty } from 'lodash';
import { initialDataType } from '../../types/tasks';
import { sortObjectByKey } from '../../helpers/sortObject';
import { createReducer } from '@reduxjs/toolkit';
import { getTasksAction, removeTaskAction, saveDataToServerAction } from './actions';

export const INITIAL_DATA = {
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
};

export type initialStateTypesForReducer = {
  dataForDraggable: initialDataType;
};

export const initialState: initialStateTypesForReducer = {
  dataForDraggable: INITIAL_DATA,
};

const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getTasksAction.fulfilled, (state, action) => {
      const { tasks } = action.payload;

      if (isEmpty(tasks)) {
        state.dataForDraggable = INITIAL_DATA;
      } else {
        forEach(state.dataForDraggable.columns, (columnItem) => {
          forEach(tasks, (taskItem) => {
            if (taskItem.columnId === columnItem.id && !columnItem.taskIds.includes(taskItem.id)) {
              columnItem.taskIds.push(taskItem.id);
            }
          });
        });

        state.dataForDraggable.tasks = tasks;
      }
    })
    .addCase(removeTaskAction.fulfilled, (state, action) => {
      const { taskId } = action.payload;

      const { tasks } = state.dataForDraggable;
      const newTasks = sortObjectByKey(tasks, taskId);
      forEach(state.dataForDraggable.columns, (columnItem) => {
        forEach(state.dataForDraggable.tasks, (taskItem) => {
          if (taskItem.columnId === columnItem.id && taskItem.id === taskId) {
            columnItem.taskIds = columnItem.taskIds.filter((item) => item !== taskId);
          }
        });
      });

      state.dataForDraggable.tasks = newTasks;
    })
    .addCase(saveDataToServerAction.fulfilled, (state, action) => {
      state.dataForDraggable = action.payload.data;
    });
});

export default tasksReducer;
