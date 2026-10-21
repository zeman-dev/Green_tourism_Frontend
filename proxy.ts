import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";


const privateRoutes = ["/notes", "/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function applySessionCookies(response: NextResponse, setCookie: string[]) {
  for (const cookieString of setCookie) {
    const parsedCookie = parseSetCookie(cookieString);

    if (parsedCookie.value) {
      response.cookies.set(
        parsedCookie.name,
        parsedCookie.value,
        parsedCookie,
      );
    }
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivateRoute = matchesRoute(pathname, privateRoutes);
  const isPublicRoute = matchesRoute(pathname, publicRoutes);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  let isAuthenticated = Boolean(accessToken);
  let refreshedCookies: string[] = [];

 

  if (isPrivateRoute && !isAuthenticated) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    return applySessionCookies(response, refreshedCookies);
  }

  if (isPublicRoute && isAuthenticated) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return applySessionCookies(response, refreshedCookies);
  }

  return applySessionCookies(NextResponse.next(), refreshedCookies);
}

export const config = {
  matcher: [
    "/notes/:path*",
    "/profile/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
