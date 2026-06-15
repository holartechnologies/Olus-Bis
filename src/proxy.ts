import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user as any;

  const adminRoutes = ["/admin"];
  const clientRoutes = ["/client"];
  const authRoutes = ["/auth/login", "/auth/register"];

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isClientRoute = clientRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!user) {
    if (isAdminRoute || isClientRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }

  const role = user.role;
  const isStaff = ["SUPER_ADMIN", "ATTORNEY", "CASE_MANAGER", "SUPPORT_STAFF"].includes(role);

  if (isAdminRoute && !isStaff) {
    return NextResponse.redirect(new URL("/client", req.url));
  }

  if (isClientRoute && role !== "CLIENT") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (isAuthRoute && user) {
    if (isStaff) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/client", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
