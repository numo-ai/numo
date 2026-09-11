"use client"

import { env } from "@numo/env/client"
import { Button } from "@numo/ui/components/button"
import { Input } from "@numo/ui/components/input"
import { Loader } from "@numo/ui/components/loader"
import { Logo } from "@numo/ui/components/logo"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useZodForm } from "@/hooks/use-zod-form"
import { authClient } from "@/lib/auth-client"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function refreshCompletedSession() {
  const { data } = await authClient.getSession({
    query: { disableCookieCache: true },
  })
  return data?.user.onboardingCompleted === true
}

async function finishOnboarding() {
  const completeResponse = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/onboarding/complete`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!completeResponse.ok) {
    const body = (await completeResponse.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? "Failed to complete onboarding")
  }

  return refreshCompletedSession()
}

export default function OnboardingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const slugTouched = useRef(false)

  const { handleSubmit, control, setValue } = useZodForm(
    z.object({
      name: z.string().min(2, "Organization name is required"),
      slug: z
        .string()
        .min(2, "Slug is required")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
    }),
    {
      defaultValues: {
        name: "",
        slug: "",
      },
    }
  )

  useEffect(() => {
    let cancelled = false

    async function recoverExistingOrganization() {
      const { data: organizations } = await authClient.organization.list()

      if (cancelled) return

      if (organizations && organizations.length > 0) {
        try {
          const completed = await finishOnboarding()
          if (cancelled) return

          if (completed) {
            router.replace("/")
            return
          }
        } catch {
          // Stay on the form so the user can retry.
        }
      }

      if (!cancelled) setIsChecking(false)
    }

    void recoverExistingOrganization()

    return () => {
      cancelled = true
    }
  }, [router])

  const onSubmit = handleSubmit(async ({ name, slug }) => {
    setIsSubmitting(true)

    const { error: createError } = await authClient.organization.create({
      name,
      slug,
    })

    if (createError) {
      // User may already have an org from a previous stuck attempt.
      const { data: organizations } = await authClient.organization.list()
      if (organizations && organizations.length > 0) {
        try {
          const completed = await finishOnboarding()
          if (completed) {
            router.replace("/")
            return
          }
        } catch (error) {
          setIsSubmitting(false)
          toast.error(error instanceof Error ? error.message : "Failed to complete onboarding")
          return
        }
      }

      setIsSubmitting(false)
      toast.error(createError.message ?? "Failed to create organization")
      return
    }

    const completed = await refreshCompletedSession()

    if (!completed) {
      try {
        const finished = await finishOnboarding()
        if (!finished) {
          setIsSubmitting(false)
          toast.error("Organization created, but onboarding did not finish")
          return
        }
      } catch (error) {
        setIsSubmitting(false)
        toast.error(
          error instanceof Error
            ? error.message
            : "Organization created, but onboarding did not finish"
        )
        return
      }
    }

    setIsSubmitting(false)
    router.replace("/")
  })

  if (isChecking) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Loader className="size-6 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="relative flex flex-col w-full min-h-svh items-center justify-center gap-6 px-4">
      <div className="flex items-center justify-center size-16 rounded-xl bg-primary -mt-8">
        <Logo className="size-12" />
      </div>

      <div className="text-center">
        <h1 className="select-none text-xl font-medium font-heading">Create your organization</h1>
        <p className="text-sm font-normal text-muted-foreground select-none">
          This is required before you can use Numo
        </p>
      </div>

      <form className="flex flex-col w-full max-w-[380px] gap-4" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Organization name"
              value={field.value ?? ""}
              className="w-full text-sm"
              size="lg"
              onChange={(event) => {
                field.onChange(event)
                if (!slugTouched.current) {
                  setValue("slug", slugify(event.target.value))
                }
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="slug"
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="organization-slug"
              value={field.value ?? ""}
              className="w-full text-sm"
              size="lg"
              onChange={(event) => {
                slugTouched.current = true
                field.onChange(event)
              }}
            />
          )}
        />

        <Button
          type="submit"
          className="rounded-full text-[15px]"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Continue"}
        </Button>
      </form>
    </div>
  )
}
