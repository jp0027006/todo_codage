import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");

    const protectedRoutes = ["/todos", "/"];

    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/todos/:path*", "/"],
};