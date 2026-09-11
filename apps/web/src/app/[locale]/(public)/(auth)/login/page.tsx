"use client"

import { Logo } from "@numo/ui/components/logo"
import { AnimatePresence, motion } from "motion/react"

import { MethodTransition } from "@/components/auth/method-transition"

export default function Page() {
  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center gap-6">
      <AnimatePresence mode="popLayout">
        <motion.div
          key="email"
          initial={{ opacity: 0, y: -100, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 100, filter: "blur(20px)" }}
          transition={{
            duration: 0.3,
            filter: { duration: 0.5 },
          }}
          className="flex items-center justify-center w-full"
        >
          <div className="flex items-center justify-center size-16 rounded-xl bg-primary -mt-8">
            <Logo className="size-12" />
          </div>
        </motion.div>

        <div className="flex flex-col w-full h-[200px]">
          <MethodTransition />
        </div>
      </AnimatePresence>
    </div>
  )
}
