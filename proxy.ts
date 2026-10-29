import { NextRequest, NextResponse } from "next/server";
import { parseCookie, parseSetCookie, stringifyCookie } from "cookie";

import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/new-story"];
const publicRoutes = ["/login", "/register"];
const authCookieNames = ["sessionId", "accessToken", "refreshToken"] as const;

function getSetCookieList(header: string | string[] | undefined): string[] {
  if (!header) {
    return [];
  }

  return Array.isArray(header) ? header : [header];
}

function applyAuthCookies(response: NextResponse, setCookie: string[]) {
  for (const cookieStr of setCookie) {
    const parsed = parseSetCookie(cookieStr);

    if (!parsed.value) {
      continue;
    }

    const { name, value, ...options } = parsed;
    response.cookies.set(name, value, options);
  }
}

function clearAuthCookies(response: NextResponse) {
  for (const name of authCookieNames) {
    response.cookies.delete(name);
  }
}

function withRefreshedCookies(
  request: NextRequest,
  setCookie: string[]
): Headers {
  const cookies = parseCookie(request.headers.get("cookie") ?? "");

  for (const cookieStr of setCookie) {
    const parsed = parseSetCookie(cookieStr);

    if (parsed.value) {
      cookies[parsed.name] = parsed.value;
    }
  }

  const headers = new Headers(request.headers);
  headers.set("cookie", stringifyCookie(cookies));

  return headers;
}

function hasAllAuthCookies(setCookie: string[]): boolean {
  const receivedNames = new Set(
    setCookie
      .map(cookieStr => parseSetCookie(cookieStr))
      .filter(parsed => Boolean(parsed.value))
      .map(parsed => parsed.name)
  );

  return authCookieNames.every(name => receivedNames.has(name));
}

function redirectToLogin(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL("/login", request.url));
  clearAuthCookies(response);

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const sessionId = request.cookies.get("sessionId")?.value;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!refreshToken || !sessionId) {
    if (isPrivateRoute) {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  }

  const result = await checkSession(
    request.headers.get("cookie") ?? ""
  );

  if (!result.ok) {
    console.error("[proxy] session refresh failed:", result.error);

    if (isPrivateRoute) {
      return redirectToLogin(request);
    }

    const response = NextResponse.next();
    clearAuthCookies(response);

    return response;
  }

  const setCookieList = getSetCookieList(
    result.response.headers["set-cookie"]
  );

  if (!hasAllAuthCookies(setCookieList)) {
    console.error(
      "[proxy] session refresh returned incomplete cookies:",
      setCookieList
    );

    if (isPrivateRoute) {
      return redirectToLogin(request);
    }

    const response = NextResponse.next();
    clearAuthCookies(response);

    return response;
  }

  const response = isPublicRoute
    ? NextResponse.redirect(new URL("/", request.url))
    : NextResponse.next({
        request: {
          headers: withRefreshedCookies(request, setCookieList),
        },
      });

  applyAuthCookies(response, setCookieList);

  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/new-story/:path*", "/login", "/register"],
};
