import { auth } from "@numo/auth/server"

export async function completeOnboarding(userId: string) {
  const ctx = await auth.$context
  return ctx.internalAdapter.updateUser(userId, {
    onboardingCompleted: true,
  })
}
