'use client'

import { useEffect } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force light theme always
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  return <>{children}</>
}
