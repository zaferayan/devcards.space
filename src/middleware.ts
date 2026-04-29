import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_HEADER = "x-locale";

function parseAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const parsed = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? parseFloat(qParam.split("=")[1]) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of parsed) {
    for (const locale of locales) {
      if (tag === locale || tag.startsWith(`${locale}-`)) return locale;
    }
  }
  return defaultLocale;
}

function pathHasLocale(pathname: string): Locale | null {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const existingLocale = pathHasLocale(pathname);
  if (existingLocale) {
    const response = NextResponse.next({
      request: {
        headers: new Headers({
          ...Object.fromEntries(request.headers),
          [LOCALE_HEADER]: existingLocale,
        }),
      },
    });
    response.headers.set(LOCALE_HEADER, existingLocale);
    if (request.cookies.get(LOCALE_COOKIE)?.value !== existingLocale) {
      response.cookies.set(LOCALE_COOKIE, existingLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return response;
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && (locales as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : parseAcceptLanguage(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  const targetPath = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  url.pathname = targetPath;
  url.search = search;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.svg|sitemap.xml|robots.txt|site.webmanifest|infographics|svgl|og-default.svg).*)",
  ],
};
