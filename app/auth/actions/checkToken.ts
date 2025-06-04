'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  exp: number;
  iat: number;
  [key: string]: any;
}

export async function checkTokenExpiry(): Promise<{
  expired: boolean;
  decoded: TokenPayload | null;
  expiresIn?: number;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value || cookieStore.get('token')?.value;

    if (!token) {
      return { expired: true, decoded: null };
    }

    const decoded = jwt.decode(token) as TokenPayload;

    if (!decoded || !decoded.exp) {
      return { expired: true, decoded: null };
    }

    const now = Math.floor(Date.now() / 1000);

    const BUFFER_TIME = 60;
    const expiredWithBuffer = decoded.exp <= now + BUFFER_TIME;

    const expiresIn = decoded.exp - now;

    return {
      expired: expiredWithBuffer,
      decoded,
      expiresIn: expiresIn > 0 ? expiresIn : 0,
    };
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return { expired: true, decoded: null };
  }
}
