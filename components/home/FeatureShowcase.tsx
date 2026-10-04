'use client'

import Link from 'next/link'

const FEATURES = [
  {
    id: 1,
    eyebrow: 'Rapid Prototyping',
    title: 'Fail Fast, Iterate Faster',
    desc: 'Validate your product designs with functional, high-strength prototypes in days, not months. Reduce development cycles by 80%.',
    cta: 'Learn More',
    ctaLink: '/about',
    visual: '⚡',
    visualBg: 'linear-gradient(135deg, var(--primary), var(--highlight-2))',
    reverse: false,
  },
  {
    id: 2,
    eyebrow: 'Custom Manufacturing',
    title: 'From Idea to Object',
    desc: 'Unique gifts, intricate miniatures, and low-volume custom manufacturing tailored to your precise needs. No minimum order.',
    cta: 'Explore Shop',
    ctaLink: '/shop',
    visual: '🎨',
    visualBg: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)',
    reverse: true,
  },
  {
    id: 3,
    eyebrow: 'CAD Design',
    title: 'Design to Production',
    desc: 'Have an idea but no 3D file? Our design engineers will translate your vision into a production-ready CAD model.',
    cta: 'Get Started',
    ctaLink: '/bulk-order',
    visual: '📐',
    visualBg: 'linear-gradient(135deg, var(--highlight-2), var(--highlight-3))',
    reverse: false,
  },
]

export default function FeatureShowcase() {
  return (
    <section className="py-32 lg:py-48 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 reveal-on-scroll">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-8 block">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            Engineering Tomorrow, Today
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-xl">
            We provide end-to-end creative manufacturing solutions for industries, startups, and independent creators.
          </p>
        </div>

        {/* Feature sections with alternating layout */}
        <div className="space-y-24 lg:space-y-32">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${feature.reverse ? '' : ''}`}
            >
              {/* Visual */}
              <div
                className={`reveal-scale ${feature.reverse ? 'lg:order-2' : ''}`}
              >
                <div
                  className="rounded-[var(--radius)] overflow-hidden flex items-center justify-center group transition-transform duration-500 hover:scale-[1.02]"
                  style={{
                    height: 'clamp(240px, 30vw, 360px)',
                    background: feature.visualBg,
                  }}
                >
                  <span className="text-6xl lg:text-7xl transition-transform duration-700 group-hover:scale-110">
                    {feature.visual}
                  </span>
                </div>
              </div>

              {/* Copy */}
              <div className={`reveal-on-scroll ${feature.reverse ? 'lg:order-1' : ''}`}>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                  {feature.eyebrow}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed max-w-xl mb-8">
                  {feature.desc}
                </p>
                <Link
                  href={feature.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-highlight-1 transition-all duration-300 arrow-cta"
                >
                  {feature.cta}
                  <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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