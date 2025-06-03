'use server';

import { API_URL } from '@/app/common/constants/api';
import { cookies } from 'next/headers';

export async function refreshToken() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Refresh token failed');
  }

  const setCookieHeader = res.headers.get('set-cookie');
  if (setCookieHeader) {
    const cookiesArray = setCookieHeader.split(/,(?=\s*\w+=)/);

    for (const cookieString of cookiesArray) {
      const [cookieNameValue] = cookieString.trim().split(';');
      const [name, value] = cookieNameValue.split('=');

      if (name === 'Authentication' || name === 'Refresh') {
        cookieStore.set({
          name,
          value,
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
        });
      }
    }
  }

  return true;
}
