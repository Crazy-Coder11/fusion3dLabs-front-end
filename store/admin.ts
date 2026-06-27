'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminStore {
  token: string | null
  adminEmail: string | null
  login: (token: string, email: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      token: null,
      adminEmail: null,
      login: (token, adminEmail) => set({ token, adminEmail }),
      logout: () => set({ token: null, adminEmail: null }),
      isAuthenticated: () => !!get().token,
    }),
    { name: 'fusion3d-admin' }
  )
)

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export async function apiFetch(path: string, options: RequestInit = {}, token?: string | null) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include', // send HTTP-only cookie automatically
    headers: {
      'Content-Type': 'application/json',
      // Also send Bearer for backwards compat (local-dev-token path)
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

/** Returns true if the server session/cookie is still valid */
export async function verifyAdminSession(token: string | null): Promise<boolean> {
  try {
    await apiFetch('/api/auth/verify', {}, token)
    return true
  } catch {
    return false
  }
}
