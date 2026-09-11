import { env } from "@numo/env/server"
import { sendOtpEmail } from "@numo/mailer/server"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { emailOTP, organization } from "better-auth/plugins"

import { db } from "./lib/db"
import { redis } from "./lib/redis"

export const auth = betterAuth({
  trustedOrigins: env.ALLOWED_CORS_ORIGINS.split(","),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/api/auth",

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  secondaryStorage: {
    get: async (key) => {
      return await redis.get(key)
    },
    set: async (key, value, ttl) => {
      await redis.set(key, value)
      if (ttl) await redis.expire(key, ttl)
    },
    delete: async (key) => {
      await redis.del(key)
    },
    getAndDelete: async (key) => {
      return await redis.getdel(key)
    },
    increment: async (key, ttl) => {
      return await redis.incrby(key, ttl)
    },
  },

  emailAndPassword: {
    enabled: false,
  },

  user: {
    additionalFields: {
      onboardingCompleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
    },
  },

  plugins: [
    organization({
      allowUserToCreateOrganization: async (user) => {
        const membershipCount = await db.member.count({
          where: { userId: user.id },
        })

        if (!user.onboardingCompleted) {
          return membershipCount === 0
        }

        return true
      },
      organizationHooks: {
        afterCreateOrganization: async ({ user }) => {
          if (user.onboardingCompleted) return

          const ctx = await auth.$context
          await ctx.internalAdapter.updateUser(user.id, {
            onboardingCompleted: true,
          })
        },
      },
    }),
    emailOTP({
      storeOTP: "hashed",
      async sendVerificationOTP({ email, otp, type }) {
        void sendOtpEmail({ to: email, otp, type }).catch((error) => {
          console.error("Failed to send OTP email:", error)
        })
      },
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  advanced: {
    cookiePrefix: "numo",
    database: {
      generateId: false,
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
})
