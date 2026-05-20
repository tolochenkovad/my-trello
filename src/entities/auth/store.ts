import { create } from 'zustand';
import { getAuth, signOut } from 'firebase/auth';
import { showToast } from '@/shared/utils';

type AuthState = {
  isLoading: boolean;
  error: unknown;
};

type AuthActions = {
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState & { actions: AuthActions }>((set) => ({
  isLoading: false,
  error: null,

  actions: {
    logout: async () => {
      set({ isLoading: true, error: null });

      try {
        await signOut(getAuth());
        showToast('You are logout', 'success');

        set({ isLoading: false });
      } catch (error) {
        set({ isLoading: false, error });
        showToast('Logout error', 'error');
      }
    },
  },
}));
