import type { Metadata } from "next"

import "@numo/ui/globals.css"
import { Mona_Sans } from "next/font/google"

import { RootProvider } from "./provider"

const fontSans = Mona_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Numo",
    default: "Numo",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params

  return (
    <html
      lang={locale ?? "en"}
      className={`${fontSans.variable} font-sans antialiased`}
      suppressHydrationWarning
    >
      <body>
        <RootProvider locale={locale}>{children}</RootProvider>
      </body>
    </html>
  )
}
