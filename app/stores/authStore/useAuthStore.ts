import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

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
  devtools(
    persist(
      set => ({
        user: null,
        tokenRefreshed: false,
        setTokenRefreshed: value => set({ tokenRefreshed: value }, false, 'setTokenRefreshed'),
        logout: () => set({ user: null, tokenRefreshed: false }, false, 'logout'),
        setUserData: (user: User | null) =>
          set(
            {
              user: user
                ? {
                    ...user,
                    name: user.name || '',
                    roles: user.roles || [],
                    permissions: user.permissions || [],
                  }
                : null,
            },
            false,
            'setUserData',
          ),
      }),
      {
        name: 'auth-storage',
        partialize: state => ({ user: state.user }),
      },
    ),
    { name: 'AuthStore' },
  ),
);
