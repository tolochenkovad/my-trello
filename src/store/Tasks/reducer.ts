import * as Constants from './constants';
import { Actions } from './actions';
import { initialDataType } from '../../types/tasks';

export const INITIAL_DATA = {
  tasks: {},
  columns: {},
  columnOrder: [],
};

export type initialStateTypesForReducer = {
  dataForDraggable: initialDataType;
  isLoading: boolean;
  error: string;
  testData: { first: boolean; second: boolean };
};

export const initialState: initialStateTypesForReducer = {
  dataForDraggable: INITIAL_DATA,
  isLoading: false as boolean,
  error: '',
  testData: { first: true, second: false },
};

const tasksReducer = (state = initialState, action: Actions): initialStateTypesForReducer => {
  switch (action.type) {
    case Constants.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.SET_TASKS:
      return {
        ...state,
        dataForDraggable: action.payload.data,
        isLoading: false,
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
