import Elysia from "elysia"

import { db } from "@/lib/db"
import { authMacro } from "@/plugins/auth"
import { completeOnboarding } from "@/utils/onboarding"

export const onboardingModule = new Elysia({
  name: "onboarding-module",
  prefix: "/onboarding",
})
  .use(authMacro)
  .post(
    "/complete",
    async ({ user, status }) => {
      const membership = await db.member.findFirst({
        where: { userId: user.id },
        select: { id: true },
      })

      if (!membership) {
        return status(400, {
          error: "Create an organization before completing onboarding",
        })
      }

      if (user.onboardingCompleted) {
        return { success: true }
      }

      await completeOnboarding(user.id)

      return { success: true }
    },
    {
      auth: true,
    }
  )
