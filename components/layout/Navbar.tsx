'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cart'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/3d-printing-services', label: '3D Printing' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const openCart = useCartStore(state => state.openCart)
  const totalCount = useCartStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0))

  return (
    <header className="w-full transition-all duration-300">
      <div className="w-full bg-white/92 backdrop-blur-xl border-b border-emerald-900/10 transition-all duration-200 shadow-[0_8px_28px_-24px_rgba(6,78,59,0.45)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group py-2">
            <Image
              src="/fusion3dlabs-logo-header.png"
              alt="Fusion3DLabs 3D printing services"
              width={170}
              height={50}
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide rounded-full px-3 py-2 transition-colors duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-text-secondary hover:bg-emerald-50/70 hover:text-emerald-800'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Icon Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full text-text-primary hover:bg-bg-2 border border-border transition-all duration-200"
              aria-label={`Shopping cart with ${totalCount} items`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </button>

            {/* Primary CTA */}
            <Link
              href="/bulk-order"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-highlight-1 transition-all duration-200 text-sm shadow-sm"
            >
              Start Creating
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-text-primary hover:bg-bg-2 border border-border transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="18" x2="20" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-[110px] bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 z-50 md:hidden bg-white dark:bg-zinc-900 border-b border-border shadow-2xl p-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium py-2 px-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-text-primary hover:bg-bg-2'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Link
                href="/bulk-order"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center bg-primary text-white rounded-full font-medium text-sm shadow-sm"
              >
                Start Creating
              </Link>
            </div>
          </div>
        </>
      )}
      </div>
    </header>
  )
}
