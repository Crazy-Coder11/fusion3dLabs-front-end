'use client'

import { useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
})

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)

  /* ── Entrance animation (GSAP — cleans up correctly in StrictMode) ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const els = [labelRef.current, headingRef.current, subRef.current, ctaRef.current, statsRef.current].filter(Boolean)
    if (els.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.1,
          onComplete: () => ScrollTrigger.refresh(),
        }
      )
    })

    return () => { try { ctx.kill(true) } catch (_) {} }
  }, [])

  /* ── GSAP scroll-out parallax ── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const contentEls = [headingRef.current, subRef.current, ctaRef.current, statsRef.current, labelRef.current].filter(Boolean)

      // Hero content shoots upward as page scrolls down
      gsap.fromTo(contentEls,
        { y: 0, opacity: 1 },
        {
          y: -120,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      )

      // Hero section itself fades/scales out slightly
      gsap.to(section, {
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom 80%',
          scrub: 1,
        },
      })
    })

    return () => {
      try { ctx.kill() } catch (_) {}
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Three.js background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/60 via-transparent to-[var(--bg)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/80 via-[var(--bg)]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl">
          <p
            ref={labelRef}
            className="text-xs uppercase tracking-widest text-[var(--accent)] mb-6 font-medium"
          >
            Premium 3D Printing India
          </p>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.05]"
          >
            Turn Your
            <br />
            <span className="text-accent-gradient">Imagination</span>
            <br />
            Into Reality.
          </h1>

          <p
            ref={subRef}
            className="mt-8 text-lg text-[var(--text-secondary)] leading-relaxed max-w-md"
          >
            Every masterpiece begins with an idea. We provide the precision, technology, and craftsmanship to bring it to life.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/bulk-order"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent-2)] transition-all duration-300 hover:gap-3 hover:shadow-[0_0_30px_rgba(232,99,10,0.4)]"
            >
              Bring Your Idea to Life
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium rounded-full hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300"
            >
              Explore The Studio
            </Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="mt-16 flex gap-10">
            {[
              { value: '100%', label: 'Precision' },
              { value: 'Infinite', label: 'Possibilities' },
              { value: '1', label: 'Vision' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--text-muted)] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
