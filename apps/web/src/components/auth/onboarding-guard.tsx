"use client"

import { Loader } from "@numo/ui/components/loader"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import { authClient } from "@/lib/auth-client"

function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/")
  if (segments[1] === "en") {
    // oxlint-disable-next-line no-constant-binary-expression
    return `/${segments.slice(2).join("/")}` || "/"
  }
  return pathname
}

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const path = getPathWithoutLocale(pathname)
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    void authClient.getSession({
      query: { disableCookieCache: true },
    })
  }, [])

  useEffect(() => {
    if (isPending) return

    if (!session) {
      router.replace("/login")
      return
    }

    const completed = session.user.onboardingCompleted === true

    if (!completed && path !== "/onboarding") {
      router.replace("/onboarding")
      return
    }

    if (completed && path === "/onboarding") {
      router.replace("/")
    }
  }, [isPending, session, path, router])

  if (isPending || !session) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Loader className="size-6 text-muted-foreground" />
      </div>
    )
  }

  const completed = session.user.onboardingCompleted === true

  if (!completed && path !== "/onboarding") {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Loader className="size-6 text-muted-foreground" />
      </div>
    )
  }

  if (completed && path === "/onboarding") {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Loader className="size-6 text-muted-foreground" />
      </div>
    )
  }

  return <>{children}</>
}
