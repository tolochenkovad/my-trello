import { all, call, takeLatest } from 'typed-redux-saga';
import { logoutAction } from './actions';
import { getFirebase } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

function* logout(): Generator {
  try {
    yield* call(getFirebase().logout);
    toastr.success('You are logout', '');
  } catch (error) {
    toastr.error(error, '');
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(logoutAction.pending, logout),
  ]);
}