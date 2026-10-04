import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'About the 3D Printing Studio',
  description: 'Learn how Fusion3DLabs approaches custom 3D printing, design review, rapid prototyping and made-to-order projects across India.',
  alternates: { canonical: '/about' },
}

const STATS = [
  { value: 'Idea', label: 'Starting Point' },
  { value: 'CAD', label: 'Design Review' },
  { value: 'Print', label: 'Production Stage' },
  { value: 'India', label: 'Delivery Coverage' },
]

const PILLARS = [
  {
    number: '01',
    title: 'Reference-Led Design',
    desc: 'Begin with the reference you have. The team reviews the geometry and identifies any modelling work needed before printing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Project-Based Material Review',
    desc: 'Material requirements are discussed around intended use, geometry, finish and current availability before the quotation is confirmed.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Finishing Review',
    desc: 'Finishing needs are agreed for each project, including the required appearance, handling and presentation requirements.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Quantity Planning',
    desc: 'Share the number of units you need so the team can review production feasibility, repeatability and project pricing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="m10 15 5-3-5-3v6Z"/>
      </svg>
    ),
  },
]

const TIMELINE = [
  {
    step: '01',
    title: 'Concept & Consultation',
    desc: 'We analyze your 3D CAD files or transform your concept sketches into manufacturable digital geometry.',
  },
  {
    step: '02',
    title: 'Topology & Slicing',
    desc: 'Optimizing stress vectors, infill density, and thermal dissipation for peak durability and weight efficiency.',
  },
  {
    step: '03',
    title: 'Additive Synthesis',
    desc: 'The approved design is prepared and produced using the process agreed for the project.',
  },
  {
    step: '04',
    title: 'Post-Processing & Inspection',
    desc: 'The completed project is reviewed, packaged and prepared for the confirmed delivery destination.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg pt-20 sm:pt-24 pb-20">
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-6 lg:px-8 border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              Our Story & Philosophy
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1] max-w-4xl mb-8">
              Manufacturing,{' '}
              <span className="text-accent-gradient">Redefined as Art.</span>
            </h1>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-text-secondary leading-relaxed">
              <p>
                <strong className="text-text-primary font-semibold">Fusion3DLabs</strong> was created with a single uncompromising belief: 3D printing is not just an industrial manufacturing tool—it is an art form.
              </p>
              <p>
                Every physical masterpiece begins as a spark of human imagination. A quick sketch on a napkin, an intricate engineering CAD drawing, or a bold architectural idea. We bridge the gap between pure concept and physical reality, ensuring creativity is never constrained by legacy factory tooling.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-surface border border-border flex flex-col justify-center shadow-sm"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Founder Story & Why We Exist ────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 bg-bg-2">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Quote Card */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-surface text-text-primary border border-border flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <blockquote className="text-xl sm:text-2xl font-bold leading-snug tracking-tight text-text-primary mb-6">
                  "Every great breakthrough starts as an impossible idea. Our job is to make it tangible."
                </blockquote>
              </div>
              <div className="pt-6 border-t border-border">
                <p className="text-sm font-semibold text-text-primary">Founder & Chief Engineer</p>
                <p className="text-xs text-primary font-medium tracking-wide">Fusion3DLabs India</p>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-surface border border-border flex flex-col justify-center shadow-sm">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
                The Origins
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mb-6">
                Why We Built Fusion3DLabs
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed text-sm sm:text-base">
                <p>
                  After years in the rapid prototyping and industrial additive space, we noticed a critical gap: traditional print shops treated clients like ticket numbers, sacrificing precision, surface finish, and creative collaboration.
                </p>
                <p>
                  We built Fusion3DLabs around a clear project workflow: understand the reference, review the design, agree the production requirements, and keep the customer informed before manufacturing begins.
                </p>
                <p>
                  From engineering firms and roboticists to artists and interior creators, we partner with visionaries across India to turn prototypes into production-ready realities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars / Capabilities ──────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3 block">
              Core Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
              Precision Crafted Into Every Layer
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              How our design and manufacturing protocols consistently deliver studio-grade results.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <span className="text-xs font-bold text-text-muted mb-2">{pillar.number}</span>
                <h3 className="text-lg font-bold text-text-primary tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed flex-1">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-Step Standard ─────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 bg-bg-2 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3 block">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-4">
              From Idea to Finished Object
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">
              A frictionless four-stage process engineered for speed and absolute repeatability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-surface border border-border flex flex-col"
              >
                <div className="text-3xl font-black text-primary/30 mb-4">{item.step}</div>
                <h3 className="text-base font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 bg-bg">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="p-8 rounded-3xl bg-surface border border-border shadow-sm">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
              Our Vision
            </span>
            <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-4">
              Empowering India's Creative Frontier
            </h3>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
              To inspire designers, robotics teams, engineers, architects, artists, and creators to construct the seemingly impossible. We strive to be India’s premier creative manufacturing studio and trusted rapid-prototyping ally.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-surface border border-border shadow-sm">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
              Our Mission
            </span>
            <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-4">
              Uncompromising Quality & Speed
            </h3>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
              Transforming ideas and digital references into physical objects through a clear design, quotation and production process.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-secondary/70 border border-primary/25 p-8 sm:p-14 text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
              Ready to Start?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              Bring Your Next Big Idea To Life Today
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Upload your CAD file for a custom quote or contact our studio engineers to discuss custom modeling and batch production.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/bulk-order"
                className="px-8 py-3.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-highlight-1 transition-all shadow-md shadow-primary/25"
              >
                Request Custom Quote
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border border-primary/30 text-text-primary bg-surface/80 rounded-full font-semibold text-sm hover:bg-surface transition-all"
              >
                Contact Engineers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
