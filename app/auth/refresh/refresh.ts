'use server';

import { API_URL } from '@/app/common/constants/api';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  exp: number;
}

export async function refreshToken() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error('Refresh token failed:', res.status, errorBody);
    throw new Error('Refresh token failed');
  }

  const setCookieHeader = res.headers.get('set-cookie');
  if (setCookieHeader) {
    const cookiesArray = setCookieHeader.split(/,(?=\s*\w+=)/);

    for (const cookieString of cookiesArray) {
      const [cookieNameValue] = cookieString.trim().split(';');
      const [name, value] = cookieNameValue.split('=');

      if (name === 'Authentication' || name === 'Refresh') {
        try {
          const decoded = jwt.decode(value) as TokenPayload;

          if (decoded && decoded.exp) {
            cookieStore.set({
              name,
              value,
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
              path: '/',
              expires: new Date(decoded.exp * 1000),
            });
          } else {
            console.warn(
              `Token ${name} decoded but no 'exp' claim found or invalid. Setting as session cookie.`,
            );
            cookieStore.set({
              name,
              value,
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
              path: '/',
            });
          }
        } catch (error) {
          console.error(`Error decoding or setting cookie ${name}:`, error);
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
  }

  return true;
}
