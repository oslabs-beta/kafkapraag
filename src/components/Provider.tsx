'use client'
// SessionProvider component stores user authentication globally
import { SessionProvider } from 'next-auth/react'

interface RootLayoutProps {
  children: React.ReactNode
}

const Provider: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider
