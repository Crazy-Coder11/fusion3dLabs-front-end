'use client'

import { useEffect, useRef, useState } from 'react'

const STEPS = [
  { number: '01', title: 'Design', desc: 'Every object begins as a parametric script or 3D model. We iterate in digital space until the geometry feels inevitable.' },
  { number: '02', title: 'Optimize', desc: 'Topology optimization and structural analysis before a single gram of material is consumed. Less waste, stronger forms.' },
  { number: '03', title: 'Print', desc: 'Layer by layer, our studio printers build each object. Tolerances as tight as 0.1mm. Layer times measured in hours.' },
  { number: '04', title: 'Finish', desc: 'Manual sanding, priming, and finish application. The machine starts it; human hands complete it.' },
  { number: '05', title: 'Deliver', desc: 'Secure packaging and white-glove delivery to your door. Global shipping available.' },
]

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  /* ── Scroll-driven active step ─────────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) setActiveStep(idx)
          }
        })
      },
      { threshold: 0.6 }
    )

    stepRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-12 block reveal-on-scroll">
          The Process
        </p>

        {/* Horizontal step indicator (desktop) */}
        <div className="hidden lg:flex items-center gap-0 mb-20 reveal-on-scroll">
          {STEPS.map((step, i) => (
            <button
              key={step.number}
              onClick={() => {
                setActiveStep(i)
                stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
              className="flex-1 group relative"
            >
              {/* Progress bar */}
              <div className="h-[2px] w-full mb-4" style={{ background: 'var(--border)' }}>
                <div
                  className="h-full bg-primary"
                  style={{
                    width: i <= activeStep ? '100%' : '0%',
                    transition: 'width 700ms cubic-bezier(0.16, 1, 0.30, 1)',
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-medium transition-colors duration-300"
                  style={{ color: i <= activeStep ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                  {step.number}
                </span>
                <span
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: i <= activeStep ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {step.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Steps content */}
        <div className="space-y-24 lg:space-y-32 reveal-group">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={el => { stepRefs.current[i] = el }}
              className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-16"
              style={{
                opacity: 1,
                transition: 'opacity 500ms ease',
              }}
            >
              {/* Large step number */}
              <div
                className="font-black leading-none select-none pointer-events-none shrink-0 transition-colors duration-500"
                style={{
                  fontSize: 'clamp(56px, 8vw, 96px)',
                  color: i === activeStep ? 'var(--primary)' : 'var(--border)',
                }}
              >
                {step.number}
              </div>

              {/* Step content */}
              <div className="pt-2">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
                  Step {step.number}
                </p>
                <h3
                  className="font-bold tracking-tight mb-3 transition-colors duration-500"
                  style={{
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    color: i === activeStep ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed max-w-xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}