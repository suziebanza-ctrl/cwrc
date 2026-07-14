import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {defaultLocale, isLocale} from "./app/i18n/config";

export function proxy(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/")[1];
  if (!isLocale(firstSegment)) {
    const destination = request.nextUrl.clone();
    destination.pathname = `/${defaultLocale}${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
    return NextResponse.redirect(destination);
  }

  const locale = firstSegment;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-cwrc-locale", locale);

  return NextResponse.next({request: {headers: requestHeaders}});
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
