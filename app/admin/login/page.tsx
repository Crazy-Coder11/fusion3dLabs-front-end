'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore, apiFetch } from '@/store/admin'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAdminStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      login(data.token, data.admin.email)
      router.replace('/admin')
    } catch (err: any) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Image
            src="/logo.png"
            alt="Fusion3D Labs"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>

        <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-6">Admin Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email"
                className="w-full px-4 py-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {error && <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--accent)] text-white rounded-xl font-medium text-sm hover:bg-[var(--accent-2)] transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
