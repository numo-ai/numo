"use client"

import { Button } from "@numo/ui/components/button"
import { Logo } from "@numo/ui/components/logo"
import { Separator } from "@numo/ui/components/separator"
import Image from "next/image"

import { LoginForm } from "@/components/auth/login-form"
import { useLoginStore } from "@/store/login"

export function StartSignUp() {
  const { setMethod } = useLoginStore()

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center size-16 bg-foreground rounded-xl">
          <Logo className="fill-background size-10" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-medium text-foreground select-none">Create your account</h3>
      </div>
      <div className="flex flex-col w-full gap-4">
        <Button
          type="button"
          size="lg"
          variant="secondary"
          className="rounded-full text-sm font-medium"
          onClick={() => setMethod("google")}
        >
          <Image
            src="/brands/google-logo.svg"
            alt="google"
            width={1024}
            height={1024}
            className="size-4"
          />
          Continue with Google
        </Button>

        <div className="flex items-center justify-center w-full relative my-2">
          <Separator />
          <span className="absolute px-2 bg-background text-[10px] font-semibold text-muted-foreground/60 uppercase select-none">
            or continue with
          </span>
        </div>

        <LoginForm />
      </div>

      <div className="text-center max-w-[320px]">
        <p className="text-xs font-normal text-muted-foreground [&_a]:underline [&_a]:hover:text-foreground *:transition *:ease-in-out">
          By continuing, you agree to our
        </p>
        <div className="text-xs font-normal text-muted-foreground [&_a]:underline [&_a]:hover:text-foreground *:transition *:ease-in-out">
          <a href="#">Terms of service</a> and <a href="#">Privacy policy</a>.
        </div>
      </div>

      <div className="text-center max-w-[320px]">
        <p className="text-xs font-normal text-muted-foreground select-none">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setMethod(null)}
            className="text-xs font-normal text-muted-foreground underline hover:text-foreground transition ease-in-out"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  )
}
