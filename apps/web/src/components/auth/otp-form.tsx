"use client"

import { Button } from "@numo/ui/components/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@numo/ui/components/input-otp"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useZodForm } from "@/hooks/use-zod-form"
import { authClient } from "@/lib/auth-client"
import { useLoginStore } from "@/store/login"

export function OtpForm() {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { email } = useLoginStore()

  const { control, handleSubmit } = useZodForm(
    z.object({
      otp: z.string(),
    })
  )

  const onSubmit = handleSubmit(async ({ otp }) => {
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

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={onSubmit}>
      <Controller
        control={control}
        name="otp"
        render={({ field }) => (
          <InputOTP {...field} maxLength={6}>
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPGroup>
                <InputOTPSlot index={index} />
              </InputOTPGroup>
            ))}
          </InputOTP>
        )}
      />

      <Button
        type="submit"
        size="lg"
        className="rounded-full text-sm font-medium"
        disabled={isSubmitting}
      >
        Continue
      </Button>
    </form>
  )
}
