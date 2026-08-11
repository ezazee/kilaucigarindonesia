import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './lib/navigation';
import {decrypt, SESSION_COOKIE_NAME} from './lib/session';

const intlMiddleware = createMiddleware(routing);

const ADMIN_PATH = process.env.ADMIN_PATH;

export default async function proxy(req: NextRequest) {
  const {pathname} = req.nextUrl;
  const adminBase = `/${ADMIN_PATH}`;

  if (pathname.startsWith(adminBase)) {
    const isLoginRoute = pathname === `${adminBase}/login`;
    const cookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      if (isLoginRoute) {
        return NextResponse.next();
      }
      // Unauthenticated visitor: pretend the route doesn't exist by
      // routing to a path with no matching page, triggering the
      // default App Router not-found rendering.
      return NextResponse.rewrite(new URL('/__not_found__', req.url));
    }

    if (isLoginRoute) {
      return NextResponse.redirect(new URL(adminBase, req.url));
    }

    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  // Match internationalized pathnames and the hidden admin path.
  // NOTE: keep this literal in sync with ADMIN_PATH in .env — the
  // matcher must be a static string for Next.js to analyze at build time.
  matcher: ['/', '/(id|en)/:path*', '/portal-mtn7x/:path*']
};
