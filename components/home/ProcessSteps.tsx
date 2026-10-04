const STEPS = [
  { number: '01', title: 'Share', desc: 'Send the file, sketch, photograph or description you have, together with dimensions and intended use.' },
  { number: '02', title: 'Review', desc: 'The team reviews the reference and discusses geometry, material, quantity and finish requirements with you.' },
  { number: '03', title: 'Quote', desc: 'You receive a project-specific quotation and an estimated production schedule before work begins.' },
  { number: '04', title: 'Create', desc: 'The approved design is prepared, printed and finished according to the agreed project requirements.' },
  { number: '05', title: 'Deliver', desc: 'The completed project is packaged and prepared for delivery to the confirmed Indian destination.' },
]

export default function ProcessSteps() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f0fdf4_55%,#ecfdf5_100%)]" aria-labelledby="process-heading">
      <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-emerald-200/35 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Process</p>
        <h2 id="process-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">From reference to finished project</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12">
          {STEPS.map((step, index) => (
            <li key={step.number} className="group list-none p-6 rounded-3xl bg-white/85 border border-emerald-900/10 shadow-[0_20px_45px_-38px_rgba(6,95,70,0.55)] transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/50 hover:shadow-[0_28px_55px_-35px_rgba(5,150,105,0.5)]">
              <span className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-extrabold ${index === 2 ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'}`}>{step.number}</span>
              <h3 className="text-xl font-bold text-text-primary mt-5 mb-3">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
