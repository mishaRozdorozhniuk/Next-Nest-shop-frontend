'use server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
interface DecodedTokenPayload {
  id: number;
  email: string;
  name?: string;
  roles?: string[];
  permissions?: string[];
  exp: number;
}

export default async function getUserDataFromToken() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('Authentication');

  if (!authCookie) {
    return null;
  }

  try {
    const decoded = jwt.decode(authCookie.value) as DecodedTokenPayload;

    if (!decoded) {
      console.error('Failed to decode token.');
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      roles: decoded.roles || [],
      permissions: decoded.permissions || [],
    };
  } catch (error) {
    console.error('Failed to decode or process authentication token:', error);
    return null;
  }
}
