import { IconLoader2 } from "@tabler/icons-react"
import { cn } from "tailwind-variants"

function Loader({ className }: { className?: string }) {
  return <IconLoader2 className={cn(className, "animate-spin")} />
}

export { Loader }
