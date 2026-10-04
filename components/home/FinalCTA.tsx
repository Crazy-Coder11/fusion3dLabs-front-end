'use client'

import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section
      className="py-48 bg-bg overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p
            className="text-xs uppercase tracking-[0.3em] text-highlight-2 mb-16 block reveal-on-scroll"
          >
            The Creative Director
          </p>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight mb-6 leading-[1.1] reveal-on-scroll"
          >
            You're the creative director.
          </h2>

          <p
            className="text-text-secondary text-lg max-w-2xl mx-auto mb-16 leading-relaxed reveal-on-scroll"
          >
            We're everything else.
          </p>

          {/* CTA */}
          <div className="reveal-on-scroll">
            <Link
              href="/bulk-order"
              className="px-12 py-5 bg-primary text-white rounded-full font-semibold text-lg hover:bg-highlight-1 transition-all duration-300 inline-flex items-center gap-3 arrow-cta hover:shadow-[0_0_40px_rgba(74,222,128,0.35)]"
            >
              Start Creating
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}