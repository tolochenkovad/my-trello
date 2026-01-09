import { all, call, put, takeLatest } from 'typed-redux-saga';
import { getAuth, signOut } from 'firebase/auth';
import { toastr } from 'react-redux-toastr';
import { logoutAction } from './actions';

function* logout(): Generator {
  try {
    yield* call(signOut, getAuth());
    toastr.success('You are logout', '');
    yield put(logoutAction.fulfilled({}));
  } catch (error) {
    logoutAction.rejected({}, { arg: { error } });
  }
}

export default function* authSaga() {
  yield all([takeLatest(logoutAction.pending, logout)]);
}
