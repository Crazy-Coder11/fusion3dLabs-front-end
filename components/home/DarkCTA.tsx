'use client'

import Link from 'next/link'

export default function DarkCTA() {
  return (
    <section
      className="py-32 lg:py-48 overflow-hidden"
      style={{
        background: 'var(--bg-2)',
        borderRadius: 'var(--radius-hero)',
        margin: '0 16px',
        border: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-8 block reveal-on-scroll font-bold"
            style={{ color: '#16A34A' }}
          >
            End-to-End Manufacturing
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 reveal-on-scroll"
            style={{ color: 'var(--text-primary)' }}
          >
            Your Vision,{' '}
            <span className="text-accent-gradient">Reality</span>
          </h2>

          <p
            className="text-lg max-w-xl mx-auto mb-10 leading-relaxed reveal-on-scroll"
            style={{ color: 'var(--text-secondary)' }}
          >
            Transform your concepts into tangible products with our precision 3D printing
            and rapid prototyping services.
          </p>

          {/* CTA */}
          <div className="reveal-on-scroll">
            <Link
              href="/bulk-order"
              className="px-8 py-4 bg-primary text-[#062817] rounded-full font-semibold hover:bg-highlight-1 transition-all duration-300 inline-flex items-center gap-2 arrow-cta hover:shadow-[0_0_30px_rgba(74,222,128,0.35)]"
            >
              Start Your Project
              <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}