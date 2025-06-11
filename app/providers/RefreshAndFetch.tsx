'use client';

import { useEffect, useRef } from 'react';
import { checkTokenExpiry } from '../auth/actions/checkToken';
import { useAuthStore } from '../stores/authStore/useAuthStore';
import getUserDataFromToken from '../auth/actions/getTokenFromServer';
import { refreshToken } from '../auth/refresh/refresh';

const TOKEN_STATE_KEY = 'tokenState';
const REFRESH_LOCK_KEY = 'refreshLock';

interface TokenState {
  lastCheck: number;
  isValid: boolean;
  expiresAt?: number;
}

const getTokenState = (): TokenState => {
  if (typeof window === 'undefined') return { lastCheck: 0, isValid: false };
  try {
    const stored = sessionStorage.getItem(TOKEN_STATE_KEY);
    return stored ? JSON.parse(stored) : { lastCheck: 0, isValid: false };
  } catch {
    return { lastCheck: 0, isValid: false };
  }
};

const setTokenState = (state: TokenState) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(TOKEN_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save token state:', e);
  }
};

const getRefreshLock = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const lock = sessionStorage.getItem(REFRESH_LOCK_KEY);
    if (!lock) return false;
    const lockTime = parseInt(lock);
    if (Date.now() - lockTime > 30000) {
      sessionStorage.removeItem(REFRESH_LOCK_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

const setRefreshLock = () => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(REFRESH_LOCK_KEY, Date.now().toString());
  } catch (e) {
    console.warn('Failed to set refresh lock:', e);
  }
};

const removeRefreshLock = () => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(REFRESH_LOCK_KEY);
  } catch (e) {
    console.warn('Failed to remove refresh lock:', e);
  }
};

const TOKEN_CHECK_CACHE_TIME = 15 * 1000;

const CHECK_INTERVAL = 10 * 1000;

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const isInitializedRef = useRef(false);
  const { setUserData, setTokenRefreshed } = useAuthStore();

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      ensureValidToken();
    }

    const intervalId = setInterval(() => {
      ensureValidToken();
    }, CHECK_INTERVAL);

    return () => clearInterval(intervalId);

    async function ensureValidToken() {
      try {
        const now = Date.now();
        const tokenState = getTokenState();

        const userDataFromHttpOnlyCookie = await getUserDataFromToken();
        if (userDataFromHttpOnlyCookie) {
          setUserData(userDataFromHttpOnlyCookie);
        } else {
          setUserData(null);
        }

        const timeSinceLastCheck = now - tokenState.lastCheck;

        let shouldCheckToken = true;

        if (tokenState.isValid && timeSinceLastCheck < TOKEN_CHECK_CACHE_TIME) {
          if (tokenState.expiresAt && tokenState.expiresAt > now + 60 * 1000) {
            shouldCheckToken = false;
          }
        }

        if (shouldCheckToken) {
          const { expired, expiresIn } = await checkTokenExpiry();
          const newTokenState: TokenState = {
            lastCheck: now,
            isValid: !expired,
            expiresAt:
              expiresIn !== undefined && expiresIn > 0 ? now + expiresIn * 1000 : undefined,
          };

          setTokenState(newTokenState);

          if (expired) {
            if (getRefreshLock()) {
              let attempts = 0;
              while (getRefreshLock() && attempts < 20) {
                await new Promise(resolve => setTimeout(resolve, 500));
                attempts++;
              }
              const updatedUserData = await getUserDataFromToken();
              if (updatedUserData) {
                setUserData(updatedUserData);
              }
            } else {
              setRefreshLock();
              try {
                const refreshed = await refreshToken();
                console.log(refreshed);
                if (refreshed) {
                  setTokenRefreshed(true);
                  const newUserData = await getUserDataFromToken();
                  if (newUserData) {
                    setUserData(newUserData);
                  }
                  setTokenState({
                    lastCheck: Date.now(),
                    isValid: true,
                    expiresAt: Date.now() + 3 * 60 * 1000,
                  });
                } else {
                  console.warn('Token refresh failed, setting user data to null.');
                  setUserData(null);
                }
              } catch (error) {
                console.error('Помилка під час спроби оновити токен:', error);
                setUserData(null);
              } finally {
                removeRefreshLock();
              }
            }
          }
        }
      } catch (error) {
        console.error('Загальна помилка під час перевірки/оновлення токена:', error);
        setUserData(null);
      }
    }

  }, [setUserData, setTokenRefreshed]);
  return <>{children}</>;
}
