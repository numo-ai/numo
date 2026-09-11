import { env } from "@numo/env/server"

import { app } from "@/app"

app.listen({ port: env.PORT, hostname: env.HOST }, (server) => {
  console.log(`API is running at ${server.url}`)
})
