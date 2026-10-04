import Link from 'next/link'
import HeroBackdrop from './HeroBackdrop'

interface HeroProps {
  eyeword?: string
  headline?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export default function HeroSection({
  eyeword = 'Custom 3D Printing India',
  headline = 'Custom 3D Printing Services in India',
  subtitle = 'Share your reference and project requirements to discuss design, printing, finishing and delivery options.',
  ctaText = 'Request a Project Quote',
  ctaLink = '/bulk-order',
}: HeroProps) {
  return (
    <section className="relative min-h-[78vh] min-h-[82svh] flex items-center overflow-hidden bg-white">
      <HeroBackdrop />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-24 sm:py-28">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-8">{eyeword}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1] mb-6">{headline}</h1>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed max-w-xl mb-10">{subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={ctaLink} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-highlight-1 transition-colors">
              {ctaText}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/3d-printing-services" className="inline-flex items-center px-8 py-4 border border-border text-text-primary text-sm font-semibold rounded-full hover:border-primary transition-colors">
              Explore 3D Printing Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
