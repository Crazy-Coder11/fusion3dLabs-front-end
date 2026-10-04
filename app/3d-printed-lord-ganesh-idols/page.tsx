import type { Metadata } from 'next'
import Link from 'next/link'
import { whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: '3D Printed Lord Ganesh Idols India',
  description: 'Discuss a custom 3D printed Lord Ganesh idol, Ganpati model or decorative Ganesha figurine made from your reference and delivered across India.',
  alternates: { canonical: '/3d-printed-lord-ganesh-idols' },
  openGraph: {
    title: '3D Printed Lord Ganesh Idols India | Fusion3DLabs',
    description: 'Reference-based decorative Lord Ganesh, Ganesha and Ganpati 3D printing enquiries across India.',
    url: '/3d-printed-lord-ganesh-idols',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Custom 3D printed Lord Ganesh idol enquiries at Fusion3DLabs' }],
  },
}

const possibilities = [
  ['Reference-based Ganesh models', 'Share a clear image, sketch or 3D file for a decorative model feasibility review.'],
  ['Personalized Ganesha figurines', 'Discuss a preferred pose, base, inscription, size direction or display requirement.'],
  ['Ganpati gifts and desk displays', 'Create a compact decorative piece for gifting, a desk, shelf or personal display.'],
  ['Finishing and presentation', 'Review colour and surface-finish options after the model geometry and intended use are understood.'],
]

const faqs = [
  ['Can you make a 3D printed Lord Ganesh idol from a photo?', 'A clear reference photo can be reviewed, although multiple angles or an existing 3D file will usually provide better design information. The team will confirm what is feasible before quoting.'],
  ['Can the pose or base be customized?', 'Pose, base, text and size requests can be discussed. The amount of design work depends on the references supplied and the required level of detail.'],
  ['Are these Ganesh idols suitable for immersion?', 'The page covers permanent decorative and display pieces. Do not assume suitability for immersion or ceremonial use; discuss the intended use and material requirements with the team before ordering.'],
  ['How much does a custom 3D printed Ganesha cost?', 'Cost depends on model preparation, size, detail, material selection, print time and finishing. A reference and approximate dimensions are needed for a quotation.'],
  ['Do you deliver 3D printed Ganpati models across India?', 'Pan-India delivery can be discussed as part of the quotation. Packaging and shipping requirements depend on the model size and geometry.'],
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://fusion3dlabs.com/3d-printed-lord-ganesh-idols#service',
    name: 'Custom 3D Printed Lord Ganesh Idols in India',
    serviceType: 'Reference-based decorative Ganesha and Ganpati model printing',
    provider: { '@id': 'https://fusion3dlabs.com/#organization' },
    areaServed: { '@type': 'Country', name: 'India' },
    url: 'https://fusion3dlabs.com/3d-printed-lord-ganesh-idols',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fusion3dlabs.com/' },
      { '@type': 'ListItem', position: 2, name: '3D Printed Lord Ganesh Idols', item: 'https://fusion3dlabs.com/3d-printed-lord-ganesh-idols' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  },
]

export default function GaneshIdolsPage() {
  return (
    <div className="min-h-screen bg-bg pt-24 sm:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-border/50 px-6 py-14 lg:px-8 sm:py-20"><div className="mx-auto max-w-7xl"><nav aria-label="Breadcrumb" className="mb-7 text-sm text-text-muted"><Link href="/" className="hover:text-primary">Home</Link><span className="mx-2">/</span><span>3D Printed Lord Ganesh Idols</span></nav><div className="max-w-4xl"><p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Ganesh · Ganesha · Ganpati</p><h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-7xl">Custom 3D Printed Lord Ganesh Idols in India</h1><p className="mt-7 max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">Discuss a decorative Lord Ganesh idol, Ganesha figurine or Ganpati display model made around your reference, preferred dimensions and finishing direction, with delivery available across India.</p><div className="mt-9 flex flex-wrap gap-4"><a href={whatsappUrl('Hi Fusion3D Labs! I would like to discuss a custom 3D printed Lord Ganesh model.')} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition hover:bg-highlight-1">Share a Ganesh Reference</a><Link href="/contact" className="rounded-full border border-border px-7 py-3.5 font-semibold text-text-primary transition hover:border-primary">Contact the Team</Link></div></div></div></section>

      <section className="px-6 py-16 lg:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">Ganesha model requests we can review</h2><p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">Every reference has different geometry and detail. The design is reviewed before production so expectations about appearance, stability, finish and intended display can be discussed clearly.</p><div className="mt-10 grid gap-5 sm:grid-cols-2">{possibilities.map(([title, text]) => <article key={title} className="rounded-3xl border border-border bg-surface p-7"><h3 className="text-xl font-bold text-text-primary">{title}</h3><p className="mt-3 leading-relaxed text-text-secondary">{text}</p></article>)}</div></div></section>

      <section className="border-y border-border/50 bg-bg-2 px-6 py-16 lg:px-8 sm:py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Start with a reference</p><h2 className="text-3xl font-extrabold tracking-tight text-text-primary">What to include in your enquiry</h2><ul className="mt-6 space-y-3 text-text-secondary">{['Clear photos, a sketch or an existing 3D file', 'Preferred pose and approximate dimensions', 'Base, inscription or personalization request', 'Colour and finish direction', 'Intended display use and delivery city'].map(item => <li key={item} className="rounded-2xl border border-border bg-surface p-4">{item}</li>)}</ul></div><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Respectful, project-specific review</p><h2 className="text-3xl font-extrabold tracking-tight text-text-primary">Designed around the intended display</h2><p className="mt-5 leading-relaxed text-text-secondary">A 3D printed Ganesh model may be requested for a shelf, desk, gift or decorative setting. Share the intended use so the team can discuss appropriate geometry, scale and finishing. Suitability for immersion, outdoor exposure or ceremonial requirements is not assumed and must be reviewed separately.</p><Link href="/3d-printing-services" className="mt-7 inline-flex text-sm font-bold text-primary hover:underline">See how custom 3D printing works →</Link></div></div></section>

      <section className="px-6 py-20 lg:px-8"><div className="mx-auto max-w-4xl"><h2 className="mb-8 text-3xl font-extrabold tracking-tight text-text-primary">3D printed Ganesh idol questions</h2><div className="divide-y divide-border border-y border-border">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-text-primary">{question}<span className="text-2xl text-primary transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">{answer}</p></details>)}</div></div></section>
    </div>
  )
}
