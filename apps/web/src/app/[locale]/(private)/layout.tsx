import { OnboardingGuard } from "@/components/auth/onboarding-guard"

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingGuard>{children}</OnboardingGuard>
}
