interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-2 w-full h-dvh bg-sidebar">
      <div className="grid mx-auto w-full h-full">{children}</div>

      <div className="grid mx-auto w-full h-full p-6 pl-0">
        <div className="w-full h-full bg-primary to-primary overflow-hidden rounded-4xl"></div>
      </div>
    </div>
  )
}
