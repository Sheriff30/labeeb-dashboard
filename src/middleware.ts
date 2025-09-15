import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  // If user is logged in, prevent visiting login or signup
  if (token && (pathname === "/login" || pathname === "/signup")) {
    if (role === "super_admin")
      return NextResponse.redirect(new URL("/admin", req.url));
    if (role === "school")
      return NextResponse.redirect(new URL("/school", req.url));
  }

  // Protect /admin route
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (role === "school")
      return NextResponse.redirect(new URL("/school", req.url));
    return NextResponse.next();
  }

  // Protect /school route
  if (pathname.startsWith("/school")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (role === "super_admin")
      return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.next();
  }

  // Everything else is public
  return NextResponse.next();
}

// Apply this middleware to these paths
export const config = {
  matcher: ["/admin/:path*", "/school/:path*", "/login", "/signup"],
};
