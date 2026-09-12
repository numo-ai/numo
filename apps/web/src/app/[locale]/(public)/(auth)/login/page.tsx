"use client"

import { AnimatePresence, motion } from "motion/react"

import { GoogleRedirect } from "@/components/auth/google-redirect"
import { StartChallenge } from "@/components/auth/start-challenge"
import { StartSignUp } from "@/components/auth/start-sign-up"
import { useLoginStore } from "@/store/login"

export default function Page() {
  const { method } = useLoginStore()

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-col w-full max-w-[320px]">
        <AnimatePresence mode="popLayout">
          {method === "sign-up" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{
                duration: 0.3,
                filter: { duration: 0.5 },
              }}
              className="w-full"
            >
              <StartSignUp />
            </motion.div>
          ) : method === "google" ? (
            <motion.div
              key="google"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{
                duration: 0.3,
                filter: { duration: 0.5 },
              }}
              className="w-full h-full"
            >
              <GoogleRedirect />
            </motion.div>
          ) : (
            <motion.div
              key="select"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{
                duration: 0.3,
                filter: { duration: 0.5 },
              }}
              className="w-full"
            >
              <StartChallenge />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
