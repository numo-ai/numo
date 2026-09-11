"use client"

import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"

import { I18nProviderClient } from "@/locales/client"

interface ProvidersProps extends React.PropsWithChildren {
  locale: string
}

export function RootProvider({ children, locale }: ProvidersProps) {
  return (
    <I18nProviderClient locale={locale}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        {children}
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </I18nProviderClient>
  )
}
