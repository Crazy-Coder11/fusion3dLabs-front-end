import Link from 'next/link'

export default function DarkCTA() {
  return (
    <section
      className="relative py-32 lg:py-40 overflow-hidden bg-[linear-gradient(125deg,#041d14_0%,#07583d_48%,#0f766e_100%)] shadow-[0_35px_90px_-55px_rgba(4,80,55,0.8)]"
      style={{
        borderRadius: 'var(--radius-hero)',
        margin: '0 16px',
        border: '1px solid rgba(134, 239, 172, 0.2)',
      }}
    >
      <div className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-lime-300/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 -bottom-28 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-8 block reveal-on-scroll font-bold"
            style={{ color: '#BEF264' }}
          >
            End-to-End Manufacturing
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 reveal-on-scroll"
            style={{ color: '#FFFFFF' }}
          >
            Your Vision,{' '}
            <span className="text-lime-300">Reality</span>
          </h2>

          <p
            className="text-lg max-w-xl mx-auto mb-10 leading-relaxed reveal-on-scroll"
            style={{ color: 'rgba(255,255,255,0.76)' }}
          >
            Transform your concepts into tangible products with our precision 3D printing
            and rapid prototyping services.
          </p>

          {/* CTA */}
          <div className="reveal-on-scroll">
            <Link
              href="/bulk-order"
              className="px-8 py-4 bg-white text-emerald-950 rounded-full font-bold hover:bg-lime-100 transition-all duration-300 inline-flex items-center gap-2 arrow-cta hover:shadow-[0_0_35px_rgba(190,242,100,0.3)]"
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
