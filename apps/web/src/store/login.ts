import { create } from "zustand"

type LoginMethod = "email" | "google" | null
type EmailStep = "email" | "otp"

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
  emailStep: "email",
  email: null,
  setMethod: (method) =>
    set({
      method,
      ...(method === null || method === "google" ? { emailStep: "email", email: null } : {}),
    }),
  setEmailStep: (emailStep) => set({ emailStep }),
  setEmail: (email) => set({ email }),
  resetEmailFlow: () => set({ emailStep: "email", email: null }),
}))
