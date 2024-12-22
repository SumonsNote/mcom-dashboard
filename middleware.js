import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
// import { protectedApiRoutesList } from "./lib/routesList";

// Define route configurations
const protectedRoutes = ["/dashboard", "/dashboard/user"];
// const protectedApiRoutes = protectedApiRoutesList; // Add your protected API routes here
const publicRoutes = ["/admin-login"];
const apiRoutes = ["/api"];
export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const headers = req.headers;
  // //console.log("from middleware-current request", req.nextUrl.pathname);
  // // Verify custom header to check origin
  const isFromWebsite = headers.get("x-website-origin") === "true";
  // //console.log(isFromWebsite);
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  // const isProtectedApi = protectedApiRoutes.some((route) =>
  //   path.startsWith(route)
  // );
  console.log("middleware called");
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));
  const isApiRoute = apiRoutes.some((route) => path.startsWith(route));
  // // Get and decrypt session
  const cookie = (await cookies()).get("ecosoft_auth")?.value;
  const session = await decrypt(cookie);

  // // Reject direct API hits if not coming from the website
  // if (isApiRoute && !isFromWebsite) {
  //   return NextResponse.json(
  //     { message: "Unauthorized access - invalid origin" },
  //     { status: 403 }
  //   );
  // }

  // // Handle protected API routes
  // if (isProtectedApi && !session?.user) {
  //   return NextResponse.json(
  //     { message: "Unauthorized access" },
  //     { status: 401 }
  //   );
  // }

  // Handle protected routes
  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL("/admin-login", req.nextUrl));
  }

  // Handle authenticated users on public routes
  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
    "/api/:path*",
  ],
};
