import { AppStore } from '../../types';

export const getAuth = (state: AppStore) => state.firebase.auth;
