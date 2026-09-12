import { Metadata } from "next"
import { redirect } from "next/navigation"

import { getSession } from "@/lib/get-session"

export const metadata: Metadata = {
  title: "Onboarding",
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (session?.user.onboardingCompleted === true) {
    redirect("/")
  }

  return children
}
