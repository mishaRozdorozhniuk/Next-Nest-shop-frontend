'use server';

// import { cookies } from 'next/headers';
// import { API_URL } from './constants/api';
import { GET } from './common/util/fetch';

export default async function getMe() {
  // Also one of the options:

  // const cookieStore = await cookies();
  // const me = await fetch(`${API_URL}/users/me`, {
  //   headers: {
  //     Cookie: cookieStore.toString(),
  //   },
  // });

  // return me.json();

  return GET('users/me');
}
