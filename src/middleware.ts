import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = ['/login', '/register'];

export function middleware(req: NextRequest) {
  // Extract the token from cookies (or you could use localStorage, but it's better to use cookies for security)
  const token = req.cookies.get('accessToken')?.value;

  // Get the current pathname (e.g., /dashboard, /profile)
  const { pathname } = req.nextUrl;

  // Check if the user is trying to access a public page (like login or register)
  const isPublicPath = publicPaths.includes(pathname);

  // If there's no token and the user is trying to access a protected route, redirect to login page
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If token is present or accessing public paths, allow the request to continue
  return NextResponse.next();
}

// Specify which paths should trigger the middleware
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'], // Protected routes
};
