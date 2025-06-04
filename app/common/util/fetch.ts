import { cookies } from 'next/headers';
import { API_URL } from '@/app/common/constants/api';

export const getHeaders = async (): Promise<Record<string, string>> => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const GET = async <T>(path: string, tags?: string[], params?: URLSearchParams) => {
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
  const res = await fetch(url, {
    headers: await getHeaders(),
    cache: 'no-store',
    next: { revalidate: 0 },
  });

  return res.json() as T;
};

export const POST = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;

  const res = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(await getHeaders()) },
    body: JSON.stringify(body),
  });

  const parsedRes = await res.json();

  if (!res.ok) {
    return { error: 'getErrorMessage(parsedRes)' };
  }
  return { error: '', data: parsedRes };
};

export const DELETE = async (url: string) => {
  console.log(url);
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
