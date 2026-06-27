'use client'

import React from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import SplitReveal from '@/components/gsap/SplitReveal'
import Link from 'next/link'

const SERVICES = [
  {
    title: 'Rapid Prototyping',
    desc: 'Fail fast, iterate faster. Validate your product designs with functional, high-strength prototypes in days, not months.',
    icon: '⚡'
  },
  {
    title: 'Custom 3D Printing',
    desc: 'From unique gifts and intricate miniatures to low-volume custom manufacturing tailored to your precise needs.',
    icon: '🎨'
  },
  {
    title: 'CAD Design & Product Development',
    desc: 'Have an idea but no 3D file? Our design engineers will translate your vision into a production-ready CAD model.',
    icon: '📐'
  },
  {
    title: 'Architectural & Educational Models',
    desc: 'Bring blueprints to life with highly detailed, scaled physical models that win pitches and educate minds.',
    icon: '🏛️'
  },
  {
    title: 'Industrial & Replacement Parts',
    desc: 'Manufacturing solutions for automotive, medical, and industrial sectors using advanced FDM, PLA, PETG, and ABS printing.',
    icon: '⚙️'
  }
]

export default function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <SplitReveal
            text="Engineering Tomorrow, Today"
            tag="h2"
            className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4"
            stagger={0.05}
            start="top 85%"
          />
          <ScrollReveal direction="up" delay={100}>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              We provide end-to-end creative manufacturing solutions for industries, startups, and independent creators.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ScrollReveal key={service.title} direction="up" delay={index * 100}>
              <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors h-full flex flex-col">
                <div className="text-3xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{service.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-1">{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
          
          <ScrollReveal direction="up" delay={500}>
            <div className="p-8 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/20 h-full flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Have a unique project?</h3>
              <Link href="/bulk-order" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent-2)] transition-all">
                Start Your Project
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
