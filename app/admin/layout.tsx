'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAdminStore, verifyAdminSession } from '@/store/admin'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '⬡' },
  { href: '/admin/products', label: 'Products', icon: '◈' },
  { href: '/admin/orders', label: 'Orders', icon: '○' },
  { href: '/admin/bulk-inquiries', label: 'Bulk Inquiries', icon: '◐' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, adminEmail, logout, token } = useAdminStore()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    if (!isAuthenticated()) {
      if (pathname !== '/admin/login') router.replace('/admin/login')
      return
    }
    // Always verify the real server-side session
    if (token) {
      verifyAdminSession(token).then(valid => {
        if (!valid) {
          logout()
          router.replace('/admin/login')
        }
      })
    }
  }, [mounted, pathname])

  // Close mobile sidebar on route change
  useEffect(() => { setSidebarOpen(false) }, [pathname])

  if (!mounted) return null
  if (!isAuthenticated() && pathname !== '/admin/login') return null
  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = async () => {
    if (token && token !== 'local-dev-token') {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        })
      } catch (_) {}
    }
    logout()
    router.replace('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 bg-[var(--bg-2)] border-r border-[var(--border)] flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-5 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Fusion3D Labs"
              width={140}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-xs text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">Admin</span>
          </Link>
          <p className="text-[10px] text-[var(--text-muted)] mt-1 truncate">{adminEmail}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-1">
            ← View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 md:ml-56 min-h-screen flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-2)] sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[var(--text-primary)] transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block h-px bg-[var(--text-primary)] transition-all duration-300 ${sidebarOpen ? 'w-0 opacity-0' : 'w-5'}`} />
            <span className={`block w-5 h-px bg-[var(--text-primary)] transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Fusion3D Labs"
              width={120}
              height={36}
              className="h-7 w-auto object-contain"
            />
            <span className="font-semibold text-xs text-[var(--text-primary)]">Admin</span>
          </Link>
        </div>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
