import { cookies } from 'next/headers';
import { API_URL } from '@/app/common/constants/api';

const getHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const GET = async (url: string, tags?: string[]): Promise<unknown> => {
  const res = await fetch(`${API_URL}/${url}`, {
    method: 'GET',
    credentials: 'include',
    headers: await getHeaders(),
    next: { tags },
  });

  return res.json();
};

export const POST = async (url: string, body: FormData | object) => {
  const bodyData = body instanceof FormData ? Object.fromEntries(body.entries()) : body;

  const res = await fetch(`${API_URL}/${url}`, {
    method: 'POST',
    credentials: 'include',
    headers: await getHeaders(),
    body: JSON.stringify(bodyData),
  });

  const data = res.headers.get('Content-Length') === '0' ? {} : await res.json();

  return {
    error: '',
    data,
  };
};

export const DELETE = async (url: string) => {
  const res = await fetch(`${API_URL}/${url}`, {
    method: 'DELETE',
    headers: await getHeaders(),
  });

  const data = res.headers.get('Content-Length') === '0' ? {} : await res.json();

  return {
    error: '',
    data,
  };
};
