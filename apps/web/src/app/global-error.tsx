"use client"

import { Button } from "@numo/ui/components/button"

import "@numo/ui/globals.css"
import { useEffect } from "react"

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureException(error)
      })
    }
  }, [error])

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full text-center px-4">
            <h2 className="font-medium mb-4">Ocorreu um erro</h2>
            <p className="text-sm text-[#878787] mb-6">
              Fomos informados e estamos analisando o caso.
              <br />
              Se o problema persistir, entre em contato com nossa equipe de suporte.
            </p>

            {error.digest && (
              <p className="text-xs text-[#4a4a4a] mt-4">Error ID: {error.digest}</p>
            )}

            <Button onClick={() => window.location.reload()} variant="outline" className="mt-6">
              Recarregar página
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
