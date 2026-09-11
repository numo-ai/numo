import Elysia from "elysia"

import { authModule } from "@/modules/auth"
import { onboardingModule } from "@/modules/onboarding"
import { corsPlugin } from "@/plugins/cors"

export const app = new Elysia()
  .onError(({ code, error, status }) => {
    if (code === "NOT_FOUND") return status(404, { error: "Not Found" })
    if (code === "VALIDATION") return status(422, { error: "Validation Error" })

    console.error(error)

    return status(500, { error: "Internal Server Error" })
  })
  .use(corsPlugin)
  .use(authModule)
  .use(onboardingModule)

export type App = typeof app
