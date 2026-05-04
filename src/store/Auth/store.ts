import { create } from 'zustand';
import { getAuth, signOut } from 'firebase/auth';

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
         // TODO: replace old toastr and use new
        // toastr.success('You are logout', '');

        set({ isLoading: false });
      } catch (error) {
        set({ isLoading: false, error });
         // TODO: replace old toastr and use new
        // toastr.error('Logout error', '');
      }
    },
  },
}));
