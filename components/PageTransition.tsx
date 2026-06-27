'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'covering' | 'revealing'>('idle')
  const prevPath = useRef(pathname)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pathname === prevPath.current) return
    prevPath.current = pathname
    setPhase('covering')
  }, [pathname])

  useEffect(() => {
    if (phase === 'covering') {
      const t = setTimeout(() => setPhase('revealing'), 420)
      return () => clearTimeout(t)
    }
    if (phase === 'revealing') {
      const t = setTimeout(() => setPhase('idle'), 700)
      return () => clearTimeout(t)
    }
  }, [phase])

  if (phase === 'idle') return null

  return (
    <div
      ref={overlayRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Three horizontal bars that cascade in/out */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: i === 1 ? 'var(--accent)' : 'var(--bg)',
            transform: phase === 'covering'
              ? 'scaleX(1)'
              : 'scaleX(0)',
            transformOrigin: phase === 'covering' ? 'left' : 'right',
            transition: `transform 0.38s cubic-bezier(.77,0,.18,1) ${i * 55}ms`,
          }}
        />
      ))}
    </div>
  )
}
