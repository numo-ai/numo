"use client"

import { Button } from "@numo/ui/components/button"
import { Input } from "@numo/ui/components/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useZodForm } from "@/hooks/use-zod-form"
import { authClient } from "@/lib/auth-client"
import { useLoginStore } from "@/store/login"

export function LoginWithEmail() {
  const router = useRouter()
  const { setMethod, emailStep, setEmailStep, email, setEmail, resetEmailFlow } = useLoginStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const emailForm = useZodForm(
    z.object({
      email: z.email(),
    }),
    {
      defaultValues: {
        email: email ?? "",
      },
    }
  )

  const otpForm = useZodForm(
    z.object({
      otp: z.string().length(6, "Enter the 6-digit code"),
    })
  )

  const onSendOtp = emailForm.handleSubmit(async ({ email: submittedEmail }) => {
    setIsSubmitting(true)

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: submittedEmail,
      type: "sign-in",
    })

    setIsSubmitting(false)

    if (error) {
      toast.error(error.message ?? "Failed to send verification code")
      return
    }

    setEmail(submittedEmail)
    setEmailStep("otp")
    toast.success("Check your email for the verification code")
  })

  const onVerifyOtp = otpForm.handleSubmit(async ({ otp }) => {
    if (!email) return

    setIsSubmitting(true)

    const { data, error } = await authClient.signIn.emailOtp({
      email,
      otp,
    })

    setIsSubmitting(false)

    if (error) {
      toast.error(error.message ?? "Invalid verification code")
      return
    }

    const completed = data?.user?.onboardingCompleted === true
    router.push(completed ? "/" : "/onboarding")
  })

  if (emailStep === "otp" && email) {
    return (
      <div className="flex flex-col w-full items-center justify-center gap-6">
        <div className="text-center">
          <h3 className="select-none text-xl font-medium font-heading">Enter your code</h3>
          <p className="text-sm font-normal text-muted-foreground select-none">
            We sent a 6-digit code to {email}
          </p>
        </div>
        <div className="flex flex-col w-full max-w-[340px] gap-4">
          <form className="flex flex-col w-full gap-4" onSubmit={onVerifyOtp}>
            <Controller
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  maxLength={6}
                  value={field.value ?? ""}
                  className="w-full text-sm tracking-[0.3em] text-center"
                  size="lg"
                />
              )}
            />

            <Button
              type="submit"
              className="rounded-full text-[15px]"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Continue"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              className="text-sm font-normal text-muted-foreground hover:text-primary transition ease-in-out cursor-pointer"
              onClick={() => {
                resetEmailFlow()
                otpForm.reset()
              }}
            >
              Use a different email
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full items-center justify-center gap-6">
      <div className="text-center">
        <h3 className="select-none text-xl font-medium font-heading">
          What&apos;s your email address?
        </h3>
      </div>
      <div className="flex flex-col w-full max-w-[340px] gap-4">
        <form className="flex flex-col w-full gap-4" onSubmit={onSendOtp}>
          <Controller
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="johndoe@email.com"
                value={field.value ?? ""}
                autoComplete="email"
                className="w-full text-sm"
                size="lg"
              />
            )}
          />

          <Button
            type="submit"
            className="rounded-full text-[15px]"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Continue with email"}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-sm font-normal text-muted-foreground hover:text-primary transition ease-in-out cursor-pointer"
            onClick={() => setMethod(null)}
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  )
}
