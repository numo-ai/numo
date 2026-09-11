import { env } from "@numo/env/client"
import {
  emailOTPClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  basePath: "/api/auth",
  baseURL: env.NEXT_PUBLIC_SERVER_URL,
  plugins: [
    organizationClient(),
    emailOTPClient(),
    inferAdditionalFields({
      user: {
        onboardingCompleted: {
          type: "boolean",
        },
      },
    }),
  ],
})
