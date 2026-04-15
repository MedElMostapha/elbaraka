import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
// Next.js 15+ deprecates 'middleware.ts' in favor of 'proxy.ts' 
// if it is acting as a request proxy.
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
