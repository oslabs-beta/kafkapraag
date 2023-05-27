"use client"

import { SessionProvider } from "next-auth/react"

type RootLayoutProps = {
  children: React.ReactNode
}

export default function Provider ({children}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}