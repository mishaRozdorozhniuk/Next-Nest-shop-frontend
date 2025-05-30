import { NextRequest, NextResponse } from 'next/server';
import { onAuthenticated } from './app/common/constants/routes';
import authenticated from './app/auth/actions/authenticated';

export function middleware(req: NextRequest) {
  const isAuth = authenticated()

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
