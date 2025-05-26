import { NextRequest } from 'next/server';
import authenticated from './app/auth/actions/authenticated';
// import { onAuthenticated } from './app/common/constants/routes';

export async function middleware(req: NextRequest) {
  const isAuth = await authenticated();
  console.log(isAuth);
  // && !onAuthenticated.some(route => req.nextUrl.pathname.startsWith(route.path)
  if (!isAuth) {
    return Response.redirect(new URL('/auth/login', req.url));
  }
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
