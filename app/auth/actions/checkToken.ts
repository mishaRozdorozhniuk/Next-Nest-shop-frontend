'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  exp: number;
  iat: number;
  [key: string]: unknown;
}

export async function checkTokenExpiry(): Promise<{
  expired: boolean;
  decoded: TokenPayload | null;
  expiresIn?: number;
}> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get('Authenticated')?.value;

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

export async function getRefreshToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('Refresh')?.value || null;
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
}

export async function checkBothTokens(): Promise<{
  accessToken: {
    exists: boolean;
    expired: boolean;
    decoded: TokenPayload | null;
    expiresIn?: number;
  };
  refreshToken: {
    exists: boolean;
    expired: boolean;
    decoded: TokenPayload | null;
    expiresIn?: number;
  };
}> {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('Authenticated')?.value;
    const refreshToken = cookieStore.get('Refresh')?.value;

    const checkToken = (token: string | undefined) => {
      if (!token) {
        return { exists: false, expired: true, decoded: null };
      }

      const decoded = jwt.decode(token) as TokenPayload;

      if (!decoded || !decoded.exp) {
        return { exists: true, expired: true, decoded: null };
      }

      const now = Math.floor(Date.now() / 1000);
      const BUFFER_TIME = 60;
      const expiredWithBuffer = decoded.exp <= now + BUFFER_TIME;
      const expiresIn = decoded.exp - now;

      return {
        exists: true,
        expired: expiredWithBuffer,
        decoded,
        expiresIn: expiresIn > 0 ? expiresIn : 0,
      };
    };

    return {
      accessToken: checkToken(accessToken),
      refreshToken: checkToken(refreshToken),
    };
  } catch (error) {
    console.error('Error checking both tokens:', error);
    return {
      accessToken: { exists: false, expired: true, decoded: null },
      refreshToken: { exists: false, expired: true, decoded: null },
    };
  }
}
