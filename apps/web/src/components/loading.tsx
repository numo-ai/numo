import { Loader } from "@numo/ui/components/loader"

export function Loading() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <Loader className="size-6 text-muted-foreground" />
    </div>
  )
}
