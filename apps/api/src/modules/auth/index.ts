import { auth } from "@numo/auth/server"
import Elysia from "elysia"

export const authModule = new Elysia({ name: "auth-module" }).mount(auth.handler)
