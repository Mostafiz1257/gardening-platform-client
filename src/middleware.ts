import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = ['/login', '/register'];

// Middleware to check for authentication token
export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

 
  if (!token && !publicPaths.includes(pathname)) {
    const loginUrl = new URL('/login', req.url); // Redirect to login
    return NextResponse.redirect(loginUrl);
  }

  // If there's a token or trying to access public pages, continue the request
  return NextResponse.next();
}

// Specify the routes to protect (you can include other paths too)
export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*', '/admin/:path*'], // Protected routes and the home page
};
