import { createI18nMiddleware } from "next-international/middleware"
import { NextRequest, NextResponse } from "next/server"

const locales = ["en"] as const
const defaultLocale = "en"

const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale,
  urlMappingStrategy: "rewriteDefault",
})

const publicRoutes = [
  {
    path: "/login",
    whenAuthenticated: "redirect",
  },
]

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login"

function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/")
  if (segments[1] && locales.includes(segments[1] as (typeof locales)[number])) {
    const rest = segments.slice(2).join("/")
    return rest ? `/${rest}` : "/"
  }
  return pathname || "/"
}

function hasSessionCookie(request: NextRequest) {
  return Boolean(
    request.cookies.get("numo.session_token") ??
      request.cookies.get("__Secure-numo.session_token")
  )
}

export function proxy(request: NextRequest) {
  const path = getPathWithoutLocale(request.nextUrl.pathname)
  const publicRoute = publicRoutes.find((route) => route.path === path)
  const isAuthenticated = hasSessionCookie(request)

  if (!isAuthenticated && publicRoute) {
    return I18nMiddleware(request)
  }

  if (!isAuthenticated && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthenticated && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/"
    return NextResponse.redirect(redirectUrl)
  }

  return I18nMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
}
