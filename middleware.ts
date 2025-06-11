import { NextRequest, NextResponse } from 'next/server';
import { onAuthenticated } from './app/common/constants/routes';

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get('Authentication')?.value;
  const refreshCookie = req.cookies.get('Refresh')?.value;

  const isEffectivelyAuthenticated = !!authCookie || !!refreshCookie;

  if (
    !isEffectivelyAuthenticated &&
    !onAuthenticated.some(route => req.nextUrl.pathname.startsWith(route.path))
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
