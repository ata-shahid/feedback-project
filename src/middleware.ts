import { NextResponse, NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Paths that should be accessible without authentication
    const publicPaths = ['/sign-in', '/sign-up', '/verify'];

    // Check if the current path is a public path
    const isPublicPath = publicPaths.some(path => url.pathname.startsWith(path));

    // If the user is authenticated and tries to access a public path, redirect to dashboard
    if (token && isPublicPath) {
        console.log('Redirecting to /dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If the user is not authenticated and tries to access a protected path, redirect to sign-in
    if (!token && !isPublicPath) {
        console.log('Redirecting to /sign-in');
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*',
    ],
};
