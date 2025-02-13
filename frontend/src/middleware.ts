import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();  
  const token = cookieStore.get("token");

  console.log("Token: ", token);

  const protectedRoutes = ["/todos", "/"];


  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
    console.log("Redirecting to login, no token found.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/todos/:path*", "/"],
};
