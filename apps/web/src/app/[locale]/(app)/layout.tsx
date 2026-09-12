import { redirect } from "next/navigation"

import { getSession } from "@/lib/get-session"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session?.session) {
    redirect("/login")
  }

  return children
}
