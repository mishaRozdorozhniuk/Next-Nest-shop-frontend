import { NextRequest, NextResponse } from 'next/server';
import { AUTHENTICATION_COOKIE } from './app/auth/auth-cookie';
import { onAuthenticated } from './app/common/constants/routes';

export function middleware(req: NextRequest) {
  const isAuth = Boolean(req.cookies.get(AUTHENTICATION_COOKIE)?.value);

  console.log('Middleware: isAuth', isAuth);

  if (!isAuth && !onAuthenticated.some(route => req.nextUrl.pathname.startsWith(route.path))) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/auth/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/products/:path*',
  ],
};
