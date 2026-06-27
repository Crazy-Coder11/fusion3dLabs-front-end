import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About the Studio',
  description: 'Fusion3D Labs is a 3D-printed art studio. We design, print, and finish every object in-house — no outsourcing, no compromises.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24">
      {/* Hero */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-6">Our Story</p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight leading-tight mb-10">
            Manufacturing,
            <br />
            <span className="text-accent-gradient">Redefined as Art.</span>
          </h1>
          <div className="space-y-6 text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            <p>
              Fusion3DLabs is not just another 3D printing company. For us, 3D printing is an art form.
            </p>
            <p>
              Every product starts as someone's imagination—a sketch on paper, a professional CAD design, a sudden spark of genius. Our mission is to transform that imagination into physical reality, because we believe creativity should never be limited by manufacturing constraints.
            </p>
          </div>
        </div>
      </section>

      {/* The Founder Story */}
      <section className="py-20 px-6 lg:px-8 bg-[var(--bg-2)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-square max-w-sm mx-auto lg:max-w-none rounded-3xl bg-gradient-to-br from-[var(--surface)] to-[var(--bg-3)] border border-[var(--border)] flex items-center justify-center p-10 text-center">
            <div>
              <div className="w-16 h-16 rounded-full border border-[var(--accent)]/40 mx-auto mb-6 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[var(--accent)]" />
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)] mb-2">"Every great invention begins as an idea."</p>
              <p className="text-sm text-[var(--accent)] uppercase tracking-widest font-medium">Founder, Fusion3DLabs</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-6">
              Why We Exist
            </h2>
            <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                After years of professional experience in the industrial 3D printing sector, working with multiple clients, our founder realized something was missing from the industry: soul. 
              </p>
              <p>
                We created Fusion3DLabs to build a company focused on innovation, creativity, precision, and the ultimate customer experience, rather than simply selling prints.
              </p>
              <p>
                Whether someone has an idea sketched on a napkin or a complex engineering CAD file, we help turn it into a physical product with exceptional quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-6">Our Vision</h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                To inspire creators, innovators, engineers, designers, artists, architects, startups, students, and businesses to build the impossible.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-semibold text-[var(--text-primary)]">
                We want to become India's most trusted creative manufacturing partner.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-6">Our Mission</h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Transforming imagination into reality with exceptional quality, precision, and speed. We don't simply print objects. We create possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 bg-[var(--bg-3)] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-4">Let's Build Together</h2>
          <p className="text-[var(--text-secondary)] mb-8 text-lg">We are ready to bring your vision to life. Experience Apple-level storytelling and Tesla-level innovation in manufacturing.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/bulk-order" className="px-8 py-3.5 bg-[var(--accent)] text-white rounded-full font-medium hover:bg-[var(--accent-2)] transition-colors">
              Start Your Project
            </Link>
            <Link href="/contact" className="px-8 py-3.5 border border-[var(--border)] text-[var(--text-secondary)] rounded-full font-medium hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
              Get Instant Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
