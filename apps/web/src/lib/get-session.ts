import { headers } from "next/headers"
import { cache } from "react"

import { authClient } from "@/lib/auth-client"

export const getSession = cache(async () => {
  const cookie = (await headers()).get("cookie")

  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: cookie ? { cookie } : undefined,
    },
    query: {
      disableCookieCache: true,
    },
  })

  return data
})
