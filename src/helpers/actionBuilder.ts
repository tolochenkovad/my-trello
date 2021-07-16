import { createAction } from '@reduxjs/toolkit';

interface IGeneric {
  default?: any;
  pending?: any;
  rejected?: any;
  fulfilled?: any;
  resetStatus?: any;
}

function prepareAction<T>() {
  return (payload: T, meta?: { arg: any }) => ({ payload, meta });
}

function actionBuilder<T extends IGeneric = IGeneric>(action: string) {
  return {
    default: createAction(action, prepareAction<T['default']>()),
    pending: createAction(`${action}/pending`, prepareAction<T['pending']>()),
    rejected: createAction(`${action}/rejected`, prepareAction<T['rejected']>()),
    fulfilled: createAction(`${action}/fulfilled`, prepareAction<T['fulfilled']>()),
    resetStatus: createAction(`${action}/resetStatus`, prepareAction<T['resetStatus']>()),
  };
}

export default actionBuilder;
