'use client'

import { useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import gsap from 'gsap'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
})

interface HeroProps {
  eyeword?: string
  headline?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export default function HeroSection({
  eyeword = 'Premium 3D Printing India',
  headline = 'Turn Your Imagination Into Reality',
  subtitle = 'Every masterpiece begins with an idea. We provide the precision, technology, and craftsmanship to bring it to life.',
  ctaText = 'Start Creating',
  ctaLink = '/bulk-order',
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  /* ── Entrance animation with GSAP ───────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = [eyebrowRef.current, headingRef.current, subRef.current, ctaRef.current].filter(Boolean)
    if (els.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          delay: 0.15,
          stagger: 0.12,
        }
      )
    }, sectionRef)

    return () => {
      try { ctx.revert() } catch (_) {}
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] min-h-[90svh] flex items-center overflow-hidden bg-white"
      style={{ willChange: 'transform' }}
    >
      {/* Three.js background scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className="text-xs uppercase tracking-[0.3em] text-primary mb-8 block"
          >
            {eyeword}
          </p>

          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1] mb-6"
          >
            {headline}
          </h1>

          <p
            ref={subRef}
            className="mt-8 text-lg text-text-secondary leading-relaxed max-w-xl mb-10"
          >
            {subtitle}
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-highlight-1 transition-all duration-300 hover:gap-3"
            >
              {ctaText}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-text-primary text-sm font-medium rounded-full hover:border-text-muted hover:text-text-primary transition-all duration-300"
            >
              Explore The Studio
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}