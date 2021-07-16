import { createReducer, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { toastr } from 'react-redux-toastr';

interface IBaseStatusPayload {
  message?: string;
  id?: string | number;
  statusCode?: number;
}

export interface StatusPayloadFromBackend extends IBaseStatusPayload {
  error?: any;
}

export interface StatusPayload extends IBaseStatusPayload {
  error?: any;
}

type GenericAsyncThunk = AsyncThunk<unknown, StatusPayloadFromBackend, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return !!action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return !!action.type.endsWith('/rejected');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return !!action.type.endsWith('/fulfilled');
}

type StatusTypes = 'LOADING' | 'ERROR';

interface IStatusInitialState {
  [action: string]: {
    status: StatusTypes;
  } & StatusPayload;
}

const initialState: IStatusInitialState = {};

const getActionType = (type: string) => type.split('/').slice(0, -1).join('/');

const statusReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(isPendingAction, (state, action) => {
      const actionType = getActionType(action.type);

      state[actionType] = {
        status: 'LOADING',
      };
    })
    .addMatcher(isRejectedAction, (state, action) => {
      const actionType = getActionType(action.type);

      state[actionType] = {
        status: 'ERROR',
        error: action.error,
        message: 'ERROR!',
      };

      toastr.error('', 'ERROR!');
    })
    .addMatcher(isFulfilledAction, (state, action) => {
      const actionType = getActionType(action.type);
      delete state[actionType];
    });
});

export default statusReducer;
