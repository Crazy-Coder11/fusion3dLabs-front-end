const FAQS = [
  { q: 'How do I get started?', a: 'Send the reference you have—such as a file, sketch, photograph or description—together with the intended use, dimensions and quantity.' },
  { q: 'Do I need a 3D CAD file to order?', a: 'No. The team can review your available reference and confirm whether design work is required before printing.' },
  { q: 'What materials do you use for 3D printing?', a: 'Material availability and suitability are confirmed during quotation based on the intended use, geometry, finish and handling requirements.' },
  { q: 'How long will my project take?', a: 'Production time depends on design readiness, size, material, quantity, finishing and the current schedule. An estimate is provided with the quotation.' },
  { q: 'How much does custom 3D printing cost?', a: 'Pricing depends on design work, dimensions, material, print time, quantity and finishing. Share your reference for a project-specific quotation.' },
  { q: 'Do you deliver across India?', a: 'Yes. The delivery destination and packaging requirements are confirmed as part of the project quotation.' },
]

export default function FaqSection() {
  return (
    <section className="py-24 lg:py-32 bg-[linear-gradient(180deg,#ffffff_0%,#f0fdf4_100%)] overflow-hidden" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Frequently Asked Questions</p>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight mb-3">3D printing questions</h2>
          <p className="text-text-secondary">Useful information before requesting a quote.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map(faq => (
            <details key={faq.q} className="group rounded-2xl border border-emerald-900/10 bg-white/85 px-5 py-5 shadow-[0_16px_38px_-34px_rgba(6,95,70,0.55)] open:border-emerald-300 open:bg-emerald-50/70">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-5 font-semibold text-text-primary">
                {faq.q}<span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-primary group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="mt-4 pr-10 text-text-secondary leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
