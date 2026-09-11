import type { Metadata } from "next"

import "@numo/ui/globals.css"
import { Inter_Tight, Hubot_Sans, Fraunces } from "next/font/google"

import { RootProvider } from "./provider"

const fontSans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
})

const fontHeading = Hubot_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
})

const fontSerif = Fraunces({
  variable: "--font-serif",
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
      className={`${fontSans.variable} ${fontHeading.variable} ${fontSerif.variable} font-sans subpixel-antialiased`}
      suppressHydrationWarning
    >
      <body>
        <RootProvider locale={locale}>{children}</RootProvider>
      </body>
    </html>
  )
}
