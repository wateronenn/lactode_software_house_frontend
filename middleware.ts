import { NextRequest, NextResponse } from 'next/server';
import { AUTH_ROLE_COOKIE, AUTH_TOKEN_COOKIE } from '@/src/lib/authSession';
import { getRoleLandingPath, normalizeRoleForPath } from '@/src/lib/rolePath';

const ADMIN_PREFIX = '/admin';
const OWNER_PREFIX = '/owner';

function redirectTo(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = normalizeRoleForPath(request.cookies.get(AUTH_ROLE_COOKIE)?.value);
  const hasSession = request.cookies.get(AUTH_TOKEN_COOKIE)?.value === '1';

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!hasSession) {
      return redirectTo(request, '/signin');
    }

    if (role !== 'admin') {
      return redirectTo(request, getRoleLandingPath(role));
    }
  }

  if (pathname.startsWith(OWNER_PREFIX)) {
    if (!hasSession) {
      return redirectTo(request, '/signin');
    }

    if (role !== 'hotelOwner') {
      return redirectTo(request, getRoleLandingPath(role));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/owner/:path*'],
};
