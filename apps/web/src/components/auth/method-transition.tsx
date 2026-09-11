"use client"

import { AnimatePresence, motion } from "motion/react"

import { useLoginStore } from "@/store/login"

import { LoginWithEmail } from "./login-with-email"
import { LoginWithGoogle } from "./login-with-google"
import { SelectAuthMethod } from "./select-auth-method"

export function MethodTransition() {
  const { method } = useLoginStore()

  return (
    <AnimatePresence mode="popLayout">
      {method === "email" ? (
        <motion.div
          key="email"
          initial={{ opacity: 0, y: -100, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 100, filter: "blur(20px)" }}
          transition={{
            duration: 0.3,
            filter: { duration: 0.5 },
          }}
          className="w-full"
        >
          <LoginWithEmail />
        </motion.div>
      ) : method === "google" ? (
        <motion.div
          key="google"
          initial={{ opacity: 0, y: -100, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 100, filter: "blur(20px)" }}
          transition={{
            duration: 0.3,
            filter: { duration: 0.5 },
          }}
          className="w-full h-full"
        >
          <LoginWithGoogle />
        </motion.div>
      ) : (
        <motion.div
          key="select"
          initial={{ opacity: 0, y: -100, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 100, filter: "blur(20px)" }}
          transition={{
            duration: 0.3,
            filter: { duration: 0.5 },
          }}
          className="w-full"
        >
          <SelectAuthMethod />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
