"use client"

import { Button } from "@numo/ui/components/button"
import { IconMailFilled } from "@tabler/icons-react"
import Image from "next/image"

import { useLoginStore } from "@/store/login"

export function SelectAuthMethod() {
  const { setMethod } = useLoginStore()

  return (
    <div className="flex flex-col w-full items-center justify-center gap-6">
      <div className="text-center">
        <h3 className="select-none text-xl font-medium font-heading">Welcome to Numo</h3>
        <p className="text-sm font-normal text-muted-foreground select-none">
          Sign in or create an account
        </p>
      </div>
      <div className="flex flex-col w-full max-w-[380px] gap-4">
        <Button
          type="button"
          className="rounded-full text-[15px] gap-2"
          size="lg"
          variant="secondary"
          onClick={() => setMethod("google")}
        >
          <Image
            src="/brands/google-logo.svg"
            alt="google"
            width={1024}
            height={1024}
            className="size-4.5"
          />
          Sign in with Google
        </Button>

        <Button
          type="button"
          className="rounded-full text-[15px]"
          size="lg"
          onClick={() => setMethod("email")}
        >
          <IconMailFilled />
          Sign in with email
        </Button>
      </div>
    </div>
  )
}
