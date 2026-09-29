import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Routes that can be viewed without being logged in
const PUBLIC_PATHS = ["/", "/auth"];

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;
    const isPublic = PUBLIC_PATHS.includes(pathname);

    // 1. No session, trying to access something private → to login
    if (!isLoggedIn && !isPublic) {
        return NextResponse.redirect(new URL("/auth?mode=login", req.nextUrl));
    }

    // 2. Has session, on the landing page or login → to home
    if (isLoggedIn && isPublic) {
        return NextResponse.redirect(new URL("/home", req.nextUrl));
    }

    // 3. Everything in order → let it through
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};