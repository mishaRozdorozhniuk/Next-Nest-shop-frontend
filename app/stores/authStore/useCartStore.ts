import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  name?: string;
  roles: string[];
  permissions: string[];
}

interface AuthStoreState {
  user: User | null;
  tokenRefreshed: boolean;
  setTokenRefreshed: (value: boolean) => void;
  logout: () => void;
  setUserData: (user: User | null) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    set => ({
      user: null,
      tokenRefreshed: false,
      setTokenRefreshed: value => set({ tokenRefreshed: value }),
      logout: () => set({ user: null, tokenRefreshed: false }),
      setUserData: (user: User | null) =>
        set({
          user: user
            ? {
                ...user,
                name: user.name || '',
                roles: user.roles || [],
                permissions: user.permissions || [],
              }
            : null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: state => ({ user: state.user }),
    },
  ),
);
