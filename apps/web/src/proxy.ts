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
    // oxlint-disable-next-line no-constant-binary-expression
    return `/${segments.slice(2).join("/")}` || "/"
  }
  return pathname
}

function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/")
  if (segments[1] && locales.includes(segments[1] as (typeof locales)[number])) {
    return segments[1]
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const path = getPathWithoutLocale(pathname)
  const locale = getLocaleFromPath(pathname)

  const publicRoute = publicRoutes.find((route) => route.path === path)
  const authToken = request.cookies.get("numo.session_token")

  if (!authToken && publicRoute) {
    return I18nMiddleware(request)
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = `/${locale}${REDIRECT_WHEN_NOT_AUTHENTICATED}`

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = `/${locale}`

    return NextResponse.redirect(redirectUrl)
  }

  return I18nMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
}
