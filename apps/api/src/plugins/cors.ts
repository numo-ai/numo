import { cors } from "@elysiajs/cors"
import { env } from "@numo/env/server"
import Elysia from "elysia"

export const corsPlugin = new Elysia().use(
  cors({
    origin: env.ALLOWED_CORS_ORIGINS.split(","),
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)
