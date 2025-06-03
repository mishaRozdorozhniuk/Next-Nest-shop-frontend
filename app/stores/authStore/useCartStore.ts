import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  name?: string;
}

interface AuthStoreState {
  user: User | null;
  tokenRefreshed: boolean;
  setUser: (user: User | null) => void;
  setTokenRefreshed: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    set => ({
      user: null,
      tokenRefreshed: false,
      setUser: user => set({ user }),
      setTokenRefreshed: value => set({ tokenRefreshed: value }),
      logout: () => set({ user: null, tokenRefreshed: false }),
    }),
    {
      name: 'auth-storage',
      partialize: state => ({ user: state.user }),
    },
  ),
);
