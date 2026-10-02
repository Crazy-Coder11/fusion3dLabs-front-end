'use client'

import Link from 'next/link'

const FEATURES = [
  {
    id: 1,
    label: 'Rapid Prototyping',
    title: 'Fail fast, iterate faster',
    desc: 'Validate product designs with functional prototypes in days, not months.',
    cta: 'Learn More',
    ctaLink: '/about',
    icon: '⚡',
    bgColor: 'var(--primary)',
  },
  {
    id: 2,
    label: 'Custom 3D Printing',
    title: 'From idea to object',
    desc: 'Unique gifts, intricate miniatures, and low-volume custom manufacturing.',
    cta: 'Explore',
    ctaLink: '/shop',
    icon: '🎨',
    bgColor: 'var(--secondary)',
  },
  {
    id: 3,
    label: 'CAD Design',
    title: 'Design to production',
    desc: 'Engineers translate your vision into production-ready CAD models.',
    cta: 'Get Started',
    ctaLink: '/bulk-order',
    icon: '📐',
    bgColor: 'var(--highlight-2)',
  },
  {
    id: 4,
    label: 'Architectural Models',
    title: 'Bring blueprints to life',
    desc: 'Highly detailed scaled physical models that win pitches and educate.',
    cta: 'View Projects',
    ctaLink: '/about',
    icon: '🏛️',
    bgColor: 'var(--highlight-3)',
  },
]

export default function FeatureGrid() {
  return (
    <section className="py-32 lg:py-48 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal-on-scroll">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Capabilities</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">What We Do</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 reveal-group">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="rounded-[var(--radius)] overflow-hidden group transition-all duration-500 hover:shadow-lg"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Visual badge */}
              <div className="p-8 pb-0">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ background: feat.bgColor, opacity: 0.15 }}
                >
                  <span className="text-2xl" style={{ opacity: 1 }}>{feat.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-0">
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 block">
                  {feat.label}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-3">
                  {feat.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {feat.desc}
                </p>

                {/* CTA */}
                <Link
                  href={feat.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-highlight-1 transition-all duration-300 arrow-cta"
                >
                  {feat.cta}
                  <svg className="arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}