'use client'

import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
})

export default function HeroBackdrop() {
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrowScreen = window.matchMedia('(max-width: 767px)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reducedMotion || narrowScreen || saveData) return

    const reveal = () => setShowScene(true)
    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof browserWindow.requestIdleCallback === 'function') {
      const idleId = browserWindow.requestIdleCallback(reveal, { timeout: 1800 })
      return () => browserWindow.cancelIdleCallback?.(idleId)
    }
    const timer = globalThis.setTimeout(reveal, 1200)
    return () => globalThis.clearTimeout(timer)
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="hero-depth-glow" />
      <div className={`hero-css-object ${showScene ? 'hero-css-object--faded' : ''}`}>
        <div className="hero-orbit hero-orbit--one" />
        <div className="hero-orbit hero-orbit--two" />
        <div className="hero-gem">
          <span className="hero-gem__face hero-gem__face--one" />
          <span className="hero-gem__face hero-gem__face--two" />
          <span className="hero-gem__face hero-gem__face--three" />
        </div>
      </div>
      {showScene && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}
    </div>
  )
}
