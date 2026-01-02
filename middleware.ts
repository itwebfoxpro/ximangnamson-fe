import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lấy token từ cookie
  const token = request.cookies.get("token")?.value;

  // Các route cần đăng nhập
  const protectedRoutes = ["/dashboard", "/category", "/posts"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Nếu chưa đăng nhập mà vào route protected → đá về /account
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/account", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Nếu đã đăng nhập mà vào /account → đá về dashboard
  if (pathname === "/account" && token) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

/**
 * Chỉ chạy middleware cho các route cần thiết
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/category/:path*",
    "/posts/:path*",
    "/account",
  ],
};
