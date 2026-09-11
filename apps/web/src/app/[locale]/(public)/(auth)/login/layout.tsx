import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>
}
