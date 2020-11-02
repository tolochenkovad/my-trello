import { AppStore } from '../../types';
import { AuthStatus } from '../../types/firebase';

export const getAuth = (state: AppStore): AuthStatus => state.firebase.auth;
