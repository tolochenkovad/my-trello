import { all, fork } from 'redux-saga/effects';
import authSaga from './Authorization/saga';
import tasksSaga from './Tasks/saga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(tasksSaga),
  ]);
}

export default rootSaga;