import { create } from 'zustand';
import { getAuth, signOut } from 'firebase/auth';
import { showToast } from '@/shared/utils';

type AuthState = {
  isLoading: boolean;
};

type AuthActions = {
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState & { actions: AuthActions }>((set) => ({
  isLoading: false,

  actions: {
    logout: async () => {
      set({ isLoading: true });

      try {
        await signOut(getAuth());
        showToast('You are logout', 'success');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Logout error';
        showToast(errorMessage, 'error');
      } finally {
        set({ isLoading: false });
      }
    },
  },
}));
