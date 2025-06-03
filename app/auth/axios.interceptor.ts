import { API_URL } from '../common/constants/api';

const fetchWithAuth = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  let response = await fetch(`${API_URL}${input}`, {
    credentials: 'include',
    ...init,
  });

  if (response.status === 401) {
    try {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      console.log('🔁 Refresh response', refreshResponse.status);

      if (!refreshResponse.ok) {
        window.location.href = '/login';
        throw new Error('Unable to refresh token');
      }

      response = await fetch(`${API_URL}${input}`, {
        credentials: 'include',
        ...init,
      });
    } catch (error) {
      window.location.href = '/login';
      throw error;
    }
  }

  return response;
};

export default fetchWithAuth;
