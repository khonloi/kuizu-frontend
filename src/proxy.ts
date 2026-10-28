import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Edge Proxy for Server-Side Route Guarding
 *
 * Routes listed here enforce server-side session cookie checks.
 * Note: /profile renders a dedicated client-side guest card when unauthenticated,
 * so it is handled client-side rather than with an immediate hard redirect.
 */
const PROTECTED_ROUTES: string[] = ['/learn', '/lesson', '/arena/host'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass in offline demo mode if set via env or runtime cookies
  const isDemo =
    process.env.NEXT_PUBLIC_DEMO_MODE === 'true' ||
    request.cookies.get('kuizu_demo_mode')?.value === 'true' ||
    request.cookies.get('kuizu_session')?.value === 'demo-token';

  if (isDemo) {
    return NextResponse.next();
  }

  // 2. Check protected route patterns
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtected) {
    // Check for presence of auth session cookies
    const token =
      request.cookies.get('kuizu_session')?.value ||
      request.cookies.get('access_token')?.value ||
      request.cookies.get('token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, svgs, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
