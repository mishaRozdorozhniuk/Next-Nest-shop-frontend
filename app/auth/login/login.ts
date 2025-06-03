'use server';

import { API_URL } from '@/app/common/constants/api';
import { getErrorMessage } from '@/app/common/util/errors';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function login(
  prevState: { error: string } | { success: boolean },
  formData: FormData,
) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const parsedRes = await res.json();

  if (!res.ok) {
    return {
      error: getErrorMessage(parsedRes),
    };
  }

  await setAuthCookie(res);

  redirect('/');
}

const setAuthCookie = async (response: Response) => {
  const setCookieHeader = response.headers.get('Set-Cookie');

  if (!setCookieHeader) return;

  const cookieStore = await cookies();

  const cookiesArray = setCookieHeader.split(/,(?=\s*\w+=)/);

  for (const cookieString of cookiesArray) {
    const [cookieNameValue] = cookieString.trim().split(';');
    const [name, value] = cookieNameValue.split('=');

    if (name === 'Authentication') {
      const decoded = jwtDecode(value);
      cookieStore.set({
        name: 'Authentication',
        value,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        expires: new Date(decoded.exp! * 1000),
      });
    }

    if (name === 'Refresh') {
      const decoded = jwtDecode(value);
      cookieStore.set({
        name: 'Refresh',
        value,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        expires: new Date(decoded.exp! * 1000),
      });
    }
  }
};
