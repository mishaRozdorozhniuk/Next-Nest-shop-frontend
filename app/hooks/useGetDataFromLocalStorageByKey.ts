'use client';

export const useGetDataFromLocalStorageByKey = <T>(key: string): T => {
  if (typeof window === 'undefined') {
    return {} as T;
  }

  const data = localStorage.getItem(key);
  if (!data) {
    return {} as T;
  }

  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error parsing data from localStorage for key "${key}":`, error);
    return {} as T;
  }
};
