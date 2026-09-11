"use client"

import { Loader } from "@numo/ui/components/loader"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { useLoginStore } from "@/store/login"

export function LoginWithGoogle() {
  const { setMethod } = useLoginStore()
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    void authClient.signIn
      .social({
        provider: "google",
        callbackURL: `${window.location.origin}/`,
      })
      .then(({ error }) => {
        if (error) {
          toast.error(error.message ?? "Failed to sign in with Google")
          setMethod(null)
        }
      })
      .catch(() => {
        toast.error("Failed to sign in with Google")
        setMethod(null)
      })
  }, [setMethod])

  return (
    <div className="flex flex-col flex-1 w-full h-full items-center justify-center">
      <div className="flex items-center justify-center w-full gap-2">
        <Loader className="size-6 text-muted-foreground" />
      </div>
    </div>
  )
}
