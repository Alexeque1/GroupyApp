import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Rutas que se pueden ver sin estar logueado
const PUBLIC_PATHS = ["/", "/auth"];

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;
    const isPublic = PUBLIC_PATHS.includes(pathname);

    // 1. Sin sesión, intentando entrar a algo privado → al login
    if (!isLoggedIn && !isPublic) {
        return NextResponse.redirect(new URL("/auth?mode=login", req.nextUrl));
    }

    // 2. Con sesión, en la landing o el login → a la home
    if (isLoggedIn && isPublic) {
        return NextResponse.redirect(new URL("/home", req.nextUrl));
    }

    // 3. Todo en orden → que siga
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};