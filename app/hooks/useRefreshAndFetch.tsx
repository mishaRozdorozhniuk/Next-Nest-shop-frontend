import { useState, useEffect, useRef } from 'react';
import { refreshToken } from '../auth/refresh/refresh';
import { checkTokenExpiry } from '../auth/actions/checkToken';

type FetchDataFn<T> = () => Promise<T>;

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
    const now = Date.now();

    if (now - lockTime > 30000) {
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

const TOKEN_CHECK_CACHE_TIME = 2 * 60 * 1000;

export function useRefreshAndFetch<T>(fetchData: FetchDataFn<T>) {
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDataRef = useRef(fetchData);

  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    async function smartRefreshAndLoad() {

      try {
        setLoading(true);
        setError(null);

        const now = Date.now();
        const tokenState = getTokenState();
        const timeSinceLastCheck = now - tokenState.lastCheck;

        let shouldCheckToken = true;

        if (tokenState.isValid && timeSinceLastCheck < TOKEN_CHECK_CACHE_TIME) {
          if (tokenState.expiresAt && tokenState.expiresAt > now + 60000) {
            shouldCheckToken = false;
          }
        }

        if (shouldCheckToken) {
          const { expired, expiresIn } = await checkTokenExpiry();
          const newTokenState: TokenState = {
            lastCheck: now,
            isValid: !expired,
            expiresAt: expiresIn ? now + expiresIn * 1000 : undefined,
          };

          setTokenState(newTokenState);

          if (expired) {
            if (getRefreshLock()) {
              let attempts = 0;
              while (getRefreshLock() && attempts < 20) {
                await new Promise(resolve => setTimeout(resolve, 500));
                attempts++;
              }

              const updatedState = getTokenState();
              if (updatedState.isValid) {
              } else {
                throw new Error('Token refresh timeout');
              }
            } else {
              setRefreshLock();

              try {
                await refreshToken();

                const refreshedState: TokenState = {
                  lastCheck: Date.now(),
                  isValid: true,
                  expiresAt: Date.now() + 3 * 60 * 1000,
                };

                setTokenState(refreshedState);
              } finally {
                removeRefreshLock();
              }
            }
          } else {
            console.log('Token is valid, skipping refresh');
          }
        }

        setTokenRefreshed(true);

        const result = await fetchDataRef.current();
        setData(result);
      } catch (e) {
        const errorMessage = (e as Error).message || 'Unknown error';

        if (
          errorMessage.includes('401') ||
          errorMessage.includes('Unauthorized') ||
          errorMessage.includes('token')
        ) {
          try {
            setRefreshLock();
            await refreshToken();

            const refreshedState: TokenState = {
              lastCheck: Date.now(),
              isValid: true,
              expiresAt: Date.now() + 3 * 60 * 1000,
            };

            setTokenState(refreshedState);
            removeRefreshLock();


            const result = await fetchDataRef.current();
            setData(result);
            setTokenRefreshed(true);
          } catch (retryError) {
            removeRefreshLock();
            setError((retryError as Error).message || 'Authentication failed');

            setTokenState({ lastCheck: 0, isValid: false });
          }
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    }

    smartRefreshAndLoad();
  }, []);

  return { tokenRefreshed, data, error, loading };
}
