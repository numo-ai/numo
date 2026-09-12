import { create } from "zustand"

type LoginMethod = "sign-up" | "google" | null
type EmailStep = "sign-up" | "otp"

interface LoginState {
  method: LoginMethod
  emailStep: EmailStep
  email: string | null
  setMethod: (method: LoginMethod) => void
  setEmailStep: (step: EmailStep) => void
  setEmail: (email: string | null) => void
  resetEmailFlow: () => void
}

export const useLoginStore = create<LoginState>((set) => ({
  method: null,
  emailStep: "sign-up",
  email: null,
  setMethod: (method) =>
    set({
      method,
      ...(method === null || method === "google" ? { emailStep: "sign-up", email: null } : {}),
    }),
  setEmailStep: (emailStep) => set({ emailStep }),
  setEmail: (email) => set({ email }),
  resetEmailFlow: () => set({ emailStep: "sign-up", email: null }),
}))
