import "dotenv/config"
import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    PORT: z.coerce.number(),
    HOST: z.string().min(1),

    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),

    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.string().min(1),

    ALLOWED_CORS_ORIGINS: z.string().min(1),

    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  },
  runtimeEnv: Bun.env,
  skipValidation: !!Bun.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
