"use client"

import { Button } from "@numo/ui/components/button"
import { Input } from "@numo/ui/components/input"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useZodForm } from "@/hooks/use-zod-form"
import { authClient } from "@/lib/auth-client"
import { useLoginStore } from "@/store/login"

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setEmail, setEmailStep } = useLoginStore()

  const { control, handleSubmit } = useZodForm(
    z.object({
      email: z.email(),
    })
  )

  const onSubmit = handleSubmit(async ({ email: submittedEmail }) => {
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

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={onSubmit}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            {...field}
            type="email"
            placeholder="Enter email address"
            disabled={isSubmitting}
            value={field.value ?? ""}
            className="h-10 text-sm w-full"
          />
        )}
      />

      <Button
        type="submit"
        size="lg"
        className="rounded-full text-sm font-medium"
        disabled={isSubmitting}
      >
        Continue with email
      </Button>
    </form>
  )
}
