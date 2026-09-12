interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid w-full h-dvh bg-background">
      <div className="grid mx-auto w-full h-full">{children}</div>
    </div>
  )
}
