'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitReveal from '@/components/gsap/SplitReveal'
import ScrollReveal from '@/components/ScrollReveal'

const STEPS = [
  {
    number: '01',
    title: 'Design',
    desc: 'Every object begins as a parametric script or 3D model. We iterate in digital space until the geometry feels inevitable.',
  },
  {
    number: '02',
    title: 'Optimize',
    desc: 'Topology optimization and structural analysis before a single gram of material is consumed. Less waste, stronger forms.',
  },
  {
    number: '03',
    title: 'Print',
    desc: 'Layer by layer, our studio printers build each object. Tolerances as tight as 0.1mm. Layer times measured in hours.',
  },
  {
    number: '04',
    title: 'Finish',
    desc: 'Manual sanding, priming, and finish application. The machine starts it; human hands complete it.',
  },
]

export default function ScrollShowcase() {
  return (
    <>
      <PinnedProcess />
      <CalloutSection />
      <TestimonialsSection />
    </>
  )
}

/* ─────────────────────────────────────────────
   PROCESS — scrubbed word-reveal per step,
   same style as the Callout section
───────────────────────────────────────────── */
function PinnedProcess() {
  return (
    <section className="bg-[var(--bg)] py-32 lg:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section label */}
        <ScrollReveal direction="fade" delay={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-20 lg:mb-28">
            The Process
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="space-y-28 lg:space-y-40">
          {STEPS.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={wrapRef} className="relative">
      {/* Ghost step number */}
      <div
        className="absolute -top-6 left-0 font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(100px,16vw,200px)',
          color: 'var(--accent)',
          opacity: 0.06,
        }}
      >
        {step.number}
      </div>

      {/* Step label */}
      <ScrollReveal direction="fade" delay={0}>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[var(--accent)] text-xs uppercase tracking-widest font-medium">
            Step {step.number}
          </span>
          <div className="h-px w-12 bg-[var(--accent)]/40" />
          <span className="text-[var(--text-muted)] text-xs">
            {index + 1} / {STEPS.length}
          </span>
        </div>
      </ScrollReveal>

      {/* Big scrubbed title — same SplitReveal as "Browse. Select." */}
      <SplitReveal
        text={step.title}
        tag="h3"
        className="text-[clamp(56px,11vw,140px)] font-black text-[var(--text-primary)] tracking-tight leading-[0.95] mb-8"
        scrub={1.5}
        start="top 88%"
        end="center 38%"
      />

      {/* Description fades in */}
      <ScrollReveal direction="up" delay={60}>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
          {step.desc}
        </p>
      </ScrollReveal>

      {/* Divider between steps */}
      {index < STEPS.length - 1 && (
        <div className="mt-20 lg:mt-28 h-px bg-[var(--border)]" />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   CALLOUT — scrubbed word-by-word reveal
───────────────────────────────────────────── */
function CalloutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1.4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center 30%',
            scrub: 1.5,
          },
        }
      )
    }, sectionRef)

    return () => {
      try { ctx.kill() } catch (_) {}
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 bg-[var(--bg-3)] overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(232,99,10,0.18) 0%, transparent 70%)',
          willChange: 'transform, opacity',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal direction="fade" delay={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-8">No payment online</p>
        </ScrollReveal>

        <div className="space-y-2 mb-10">
          <SplitReveal
            text="Browse."
            tag="div"
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-[var(--text-primary)] tracking-tight leading-tight"
            scrub={1.5}
            start="top 80%"
            end="center 40%"
          />
          <SplitReveal
            text="Select."
            tag="div"
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-[var(--text-primary)] tracking-tight leading-tight"
            scrub={1.5}
            start="top 70%"
            end="center 35%"
          />
          <div className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-tight text-accent-gradient">
            <SplitReveal
              text="WhatsApp us."
              tag="span"
              className="text-accent-gradient"
              scrub={1.5}
              start="top 60%"
              end="center 30%"
            />
          </div>
        </div>

        <ScrollReveal direction="up" delay={0}>
          <p className="text-base lg:text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
            No checkout. No payment gateway. You browse, pick what you love, and a real person from our studio contacts you to confirm details, discuss customization, and arrange delivery.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-[var(--accent)] text-white rounded-full font-medium hover:bg-[var(--accent-2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,99,10,0.4)]"
            >
              Browse the Collection
            </Link>
            <Link
              href="/bulk-order"
              className="px-8 py-4 border border-[var(--border)] text-[var(--text-secondary)] rounded-full font-medium hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)] transition-all duration-300"
            >
              Bulk / Custom Orders
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   TESTIMONIALS — staggered card entrance
───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "The Fractal Vase is the first object I've owned that makes visitors stop mid-sentence to ask about it. Worth every rupee.",
    name: 'Arjun Mehta',
    role: 'Architect, Mumbai',
  },
  {
    quote: "Ordered the Geo Planter for my desk. The quality is incredible — you can see every layer was intentional. It doesn't look printed, it looks designed.",
    name: 'Priya Nair',
    role: 'Product Designer, Bangalore',
  },
  {
    quote: "The WhatsApp ordering process was smooth and actually personal. They asked about my space and suggested the right finish. That doesn't happen with other shops.",
    name: 'Rohit Sharma',
    role: 'Photographer, Delhi',
  },
]

function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const cards = cardsRef.current.filter(Boolean) as HTMLElement[]
    if (!cards.length) return

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -60 : 60
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX, y: 40, scale: 0.94 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => {
      try { ctx.kill() } catch (_) {}
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SplitReveal
          text="In their words"
          tag="p"
          className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4 text-center"
          start="top 90%"
        />
        <SplitReveal
          text="People who own our work."
          tag="h2"
          className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] tracking-tight text-center mb-16"
          stagger={0.04}
          start="top 85%"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              ref={el => { cardsRef.current[i] = el }}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-4"
              style={{ opacity: 0 }}
            >
              <svg width="24" height="16" viewBox="0 0 24 16" fill="var(--accent)" opacity="0.5">
                <path d="M0 16V9.6C0 4.267 3.2 1.067 9.6 0l1.2 2.4C7.467 3.2 5.6 5.333 5.6 8H9.6V16H0zm14.4 0V9.6c0-5.333 3.2-8.533 9.6-9.6l1.2 2.4c-3.333.8-5.2 2.933-5.2 5.6H24V16h-9.6z"/>
              </svg>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">{t.quote}</p>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
