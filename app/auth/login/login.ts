'use server';

import { API_URL } from '@/app/common/constants/api';
import { getErrorMessage } from '@/app/common/util/errors';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE } from '../auth-cookie';

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

  return { success: true };
}

const setAuthCookie = async (response: Response) => {
  const responseCookies = response.headers.get('Set-Cookie');

  if (responseCookies) {
    const token = responseCookies.split(';')[0].split('=')[1];
    const cookieStore = await cookies();
    cookieStore.set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
