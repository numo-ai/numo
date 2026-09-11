import { env } from "@numo/env/server"
import { PrismaPg } from "@prisma/adapter-pg"

import { PrismaClient } from "./prisma/generated/client"

export function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
  })
  return new PrismaClient({ adapter })
}

export type Database = ReturnType<typeof createPrismaClient>
