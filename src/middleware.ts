import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for a protected route
  const isProtectedRoute = pathname.startsWith("/dashboard");
  
  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // If it's a protected route and no token, redirect to sign-in
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // If it's a sign-in/sign-up route and user is authenticated, redirect to dashboard
  if ((pathname.startsWith("/auth") || pathname === "/") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};