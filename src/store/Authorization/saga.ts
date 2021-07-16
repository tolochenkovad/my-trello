import { all, call, put, takeLatest } from 'typed-redux-saga';
import { logoutAction } from './actions';
import { getFirebase } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

function* logout(): Generator {
  try {
    yield* call(getFirebase().logout);
    toastr.success('You are logout', '');
    yield put(logoutAction.fulfilled({}));
  } catch (error) {
    logoutAction.rejected({}, { arg: { error } });
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(logoutAction.pending, logout),
  ]);
}