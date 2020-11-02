import { toastr } from 'react-redux-toastr';
import { ThunkResult } from '../../types';
import { setLoading } from '../Tasks/actions';
import { getFirebase } from 'react-redux-firebase';

export const logout = (): ThunkResult => async (dispatch) => {
  dispatch(setLoading());
  try {
    await getFirebase().logout();
    toastr.success('You are logout', '');
  } catch (error) {
    toastr.error(error, '');
  }
};
