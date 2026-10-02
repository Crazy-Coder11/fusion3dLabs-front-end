'use client'

import { useState, useRef, useEffect } from 'react'

const FAQS = [
  { q: 'How do I get started?', a: 'Simply reach out via WhatsApp or our Contact page with your idea, sketch, or CAD file, and let\'s build together.' },
  { q: 'Do I need a 3D CAD file to order?', a: 'Not at all. If you only have a sketch or an idea, our in-house CAD design engineers can develop a production-ready model for you.' },
  { q: 'What materials do you use for 3D printing?', a: 'We primarily use advanced FDM printing with premium PLA, PETG, and ABS, depending on your project\'s durability and flexibility needs.' },
  { q: 'Can you print flexible parts?', a: 'Yes, we offer TPU printing for parts that require flexibility and rubber-like properties.' },
  { q: 'What is your maximum print size?', a: 'We can print large objects by breaking them down into modular interlocking pieces, ensuring high strength and seamless assembly.' },
  { q: 'How fast can I get my prototype?', a: 'With our rapid prototyping service, most initial iterations can be printed and ready within 2-4 business days.' },
  { q: 'Can you handle low-volume manufacturing?', a: 'Yes. We specialize in custom, low-volume manufacturing runs ranging from a single unit up to hundreds of parts.' },
  { q: 'Do you offer post-processing and finishing?', a: 'Absolutely. We offer sanding, priming, and painting for a premium, injection-molded look.' },
  { q: 'How much does custom 3D printing cost?', a: 'Cost depends on material, print time, and complexity. Contact us for an instant, transparent quote.' },
  { q: 'Do you offer bulk discounts?', a: 'Yes, we offer scalable pricing with significant discounts for volume orders and corporate gifting.' },
  { q: 'Do you ship across India?', a: 'Yes, we safely package and ship our 3D printed products to creators and businesses all across India.' },
  { q: 'Do you sign NDAs?', a: 'Absolutely. We respect your intellectual property and are happy to sign Non-Disclosure Agreements for proprietary designs.' },
  { q: 'How does payment work?', a: 'Since we do not process payment directly on the website, our team will review your order details on WhatsApp and share a secure UPI, bank transfer, or online payment link once the details are finalized.' },
  { q: 'What is your return policy?', a: 'Since all items are custom-manufactured to your exact specifications, we do not accept standard returns, but we guarantee quality and will reprint if tolerances aren\'t met.' },
  { q: 'Why choose Fusion3DLabs?', a: 'We offer Apple-level fit and finish with Tesla-level innovation. We don\'t just print; we engineer solutions.' },
]

function AccordionItem({ faq, isOpen, onToggle }: { faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      className="border-b transition-colors duration-300"
      style={{ borderColor: isOpen ? 'var(--primary)' : 'var(--border)' }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between cursor-pointer transition-all duration-300 group"
        aria-expanded={isOpen}
      >
        <span
          className="font-semibold pr-4 transition-colors duration-300"
          style={{ color: isOpen ? 'var(--primary)' : 'var(--text-primary)' }}
        >
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            color: isOpen ? 'var(--primary)' : 'var(--text-muted)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: `${height}px`,
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 400ms cubic-bezier(0.16, 1, 0.30, 1), opacity 300ms ease',
        }}
      >
        <div ref={contentRef}>
          <p className="px-6 pb-5 text-text-secondary leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-bg overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal-on-scroll">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Frequently Asked Questions</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight mb-3">You Got Questions?</h2>
          <p className="text-text-secondary text-base">We got answers.</p>
        </div>

        <div className="reveal-on-scroll">
          {FAQS.map((faq, idx) => (
            <AccordionItem
              key={idx}
              faq={faq}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}