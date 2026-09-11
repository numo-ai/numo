import { env } from "@numo/env/server"
import { RedisClient } from "bun"

export const redis = new RedisClient(env.REDIS_URL)
