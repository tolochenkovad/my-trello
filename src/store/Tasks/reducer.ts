import { forEach, isEmpty } from 'lodash';
import * as Constants from './constants';
import { Actions } from './actions';
import { initialDataType } from '../../types/tasks';
import { sortObjectByKey } from '../../helpers/sortObject';

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
  isLoading: boolean;
  error: string;
};

export const initialState: initialStateTypesForReducer = {
  dataForDraggable: INITIAL_DATA,
  isLoading: false as boolean,
  error: '',
};

const tasksReducer = (state = initialState, action: Actions): initialStateTypesForReducer => {
  switch (action.type) {
    case Constants.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.SET_TASKS: {
      const { tasks } = action.payload;
      let copyDataForDraggable: initialDataType = JSON.parse(JSON.stringify(state.dataForDraggable));
      if (isEmpty(tasks)) {
        copyDataForDraggable = INITIAL_DATA;
      } else {
        forEach(copyDataForDraggable.columns, (columnItem) => {
          forEach(tasks, (taskItem) => {
            if (taskItem.columnId === columnItem.id && !columnItem.taskIds.includes(taskItem.id)) {
              columnItem.taskIds.push(taskItem.id);
            }
          });
        });

        copyDataForDraggable.tasks = tasks;
      }

      return {
        ...state,
        dataForDraggable: copyDataForDraggable,
        isLoading: false,
      };
    }

    case Constants.REMOVE_TASK: {
      const { taskId } = action.payload;
      const { tasks } = state.dataForDraggable;
      const newTasks = sortObjectByKey(tasks, taskId);
      const copyDataForDraggable: initialDataType = JSON.parse(JSON.stringify(state.dataForDraggable));
      forEach(copyDataForDraggable.columns, (columnItem) => {
        forEach(copyDataForDraggable.tasks, (taskItem) => {
          if (taskItem.columnId === columnItem.id && taskItem.id === taskId) {
            columnItem.taskIds = columnItem.taskIds.filter((item) => item !== taskId);
          }
        });
      });

      copyDataForDraggable.tasks = newTasks;

      return {
        ...state,
        dataForDraggable: copyDataForDraggable,
        isLoading: false,
      };
    }

    case Constants.SAVE_DATA:
      return {
        ...state,
        dataForDraggable: action.payload.data,
      };

    case Constants.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error.message,
      };
    default:
      return state;
  }
};

export default tasksReducer;
