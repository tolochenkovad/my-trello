import * as Constants from './constants';
import { Actions } from './actions';

export const initialState = {
  note: 'test' as string,
  isReady: false,
  data: { isTest: false },
};

const notesReducer = (state = initialState, action: Actions): typeof initialState => {
  switch (action.type) {
    case Constants.GET_NOTES:
      return {
        ...state,
        isReady: action.payload.test,
      };
    case Constants.GET_CATEGORIES:
      return {
        ...state,
        isReady: action.payload.isReady,
      };
    default:
      return state;
  }
};

export default notesReducer;