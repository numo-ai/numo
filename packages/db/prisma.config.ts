import path from "node:path"

import dotenv from "dotenv"
import { defineConfig, env } from "prisma/config"

dotenv.config({
  path: "../../apps/api/.env",
})

export default defineConfig({
  schema: path.join("src", "prisma", "schema.prisma"),
  migrations: {
    path: path.join("src", "prisma", "migrations"),
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
})
