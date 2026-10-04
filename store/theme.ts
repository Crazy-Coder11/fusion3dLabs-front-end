'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light'

interface ThemeStore {
  theme: Theme
  toggle: () => void
  setTheme: (t: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggle: () => {
        // Light only — no toggling
        document.documentElement.setAttribute('data-theme', 'light')
      },
      setTheme: () => {
        set({ theme: 'light' })
        document.documentElement.setAttribute('data-theme', 'light')
      },
    }),
    { name: 'fusion3d-theme' }
  )
)
