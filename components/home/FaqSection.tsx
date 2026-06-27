'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import SplitReveal from '@/components/gsap/SplitReveal'

const FAQS = [
  { q: "What materials do you use for 3D printing?", a: "We primarily use advanced FDM printing with premium PLA, PETG, and ABS, depending on your project's durability and flexibility needs." },
  { q: "How fast can I get my prototype?", a: "With our rapid prototyping service, most initial iterations can be printed and ready within 2-4 business days." },
  { q: "Do I need a 3D CAD file to order?", a: "Not at all. If you only have a sketch or an idea, our in-house CAD design engineers can develop a production-ready model for you." },
  { q: "Can you handle low-volume manufacturing?", a: "Yes. We specialize in custom, low-volume manufacturing runs ranging from a single unit up to hundreds of parts." },
  { q: "What is your maximum print size?", a: "We can print large objects by breaking them down into modular interlocking pieces, ensuring high strength and seamless assembly." },
  { q: "Do you offer post-processing and finishing?", a: "Absolutely. We offer sanding, priming, and painting for a premium, injection-molded look." },
  { q: "Can I use 3D printed parts for mechanical use?", a: "Yes, by utilizing materials like ABS or PETG and optimizing the infill density, we create highly durable, functional parts." },
  { q: "How do you ensure precision?", a: "We maintain industrial-grade tolerances down to 0.1mm, continually calibrating our machines for exact dimensional accuracy." },
  { q: "Are your materials eco-friendly?", a: "Our standard PLA is a biodegradable thermoplastic derived from renewable resources like corn starch." },
  { q: "Do you ship across India?", a: "Yes, we safely package and ship our 3D printed products to creators and businesses all across India." },
  { q: "What industries do you serve?", a: "We serve automotive, medical, architecture, education, product design, and independent artists." },
  { q: "How much does custom 3D printing cost?", a: "Cost depends on material, print time, and complexity. Contact us for an instant, transparent quote." },
  { q: "Can you print architectural models?", a: "Yes, we specialize in high-detail architectural scale models that help you win pitches and communicate space." },
  { q: "Do you offer bulk discounts?", a: "Yes, we offer scalable pricing with significant discounts for volume orders and corporate gifting." },
  { q: "What if my design fails to print?", a: "We run structural analysis and topology optimization before printing to ensure the geometry is viable." },
  { q: "Can I order replacement parts?", a: "Yes, we frequently reverse-engineer and print discontinued or broken replacement parts for machinery and appliances." },
  { q: "Do you sign NDAs?", a: "Absolutely. We respect your intellectual property and are happy to sign Non-Disclosure Agreements for proprietary designs." },
  { q: "How do I pay?", a: "We accept all major online payment methods, bank transfers, and UPI. Payment is processed once your project details are finalized." },
  { q: "Can I choose the color of my print?", a: "Yes, we have a wide range of filament colors available, or we can custom paint the final object to match your brand." },
  { q: "What is your return policy?", a: "Since all items are custom-manufactured to your exact specifications, we do not accept standard returns, but we guarantee quality and will reprint if tolerances aren't met." },
  { q: "Can you print flexible parts?", a: "Yes, we offer TPU printing for parts that require flexibility and rubber-like properties." },
  { q: "Do you do educational models for schools?", a: "Yes, we create tactile learning aids, anatomical models, and engineering prototypes for educational institutions." },
  { q: "How do I get started?", a: "Simply reach out via WhatsApp or our Contact page with your idea, sketch, or CAD file, and let's build together." },
  { q: "Why choose Fusion3DLabs?", a: "We offer Apple-level fit and finish with Tesla-level innovation. We don't just print; we engineer solutions." },
  { q: "Where are you located?", a: "We are proudly based in India, providing premium manufacturing services locally and nationally." }
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SplitReveal
            text="Frequently Asked Questions"
            tag="h2"
            className="text-3xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4"
            stagger={0.05}
            start="top 85%"
          />
          <ScrollReveal direction="up" delay={100}>
            <p className="text-[var(--text-secondary)] text-lg">
              Everything you need to know about our creative manufacturing process.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <ScrollReveal key={idx} direction="up" delay={Math.min(idx * 50, 500)}>
              <div 
                className={`border rounded-2xl transition-colors duration-300 ${
                  openIdx === idx ? 'bg-[var(--surface)] border-[var(--accent)]/50' : 'bg-transparent border-[var(--border)] hover:border-[var(--accent)]/30'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between"
                >
                  <span className="font-semibold text-[var(--text-primary)] pr-4">{faq.q}</span>
                  <span className={`text-[var(--accent)] transform transition-transform duration-300 ${openIdx === idx ? 'rotate-45' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIdx === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-[var(--text-secondary)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
