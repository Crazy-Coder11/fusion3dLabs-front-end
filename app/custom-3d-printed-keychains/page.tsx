import type { Metadata } from 'next'
import Link from 'next/link'
import { whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Custom 3D Printed Keychains India',
  description: 'Request custom 3D printed name, logo, car and personalized keychains for individual or bulk requirements, with delivery across India.',
  alternates: { canonical: '/custom-3d-printed-keychains' },
  openGraph: {
    title: 'Custom 3D Printed Keychains India | Fusion3DLabs',
    description: 'Custom name, logo, vehicle and personalized 3D printed keychains made around your reference.',
    url: '/custom-3d-printed-keychains',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Custom 3D printed keychains by Fusion3DLabs' }],
  },
}

const options = [
  ['Personalized name keychains', 'Turn a name, word or short message into a made-to-order keychain design.'],
  ['Custom logo keychains', 'Share a business, club or event logo for review as a branded keychain or key tag.'],
  ['Car and number-plate keychains', 'Create a vehicle-inspired keychain from a model reference, photo or registration text.'],
  ['Bulk and corporate keychains', 'Discuss repeat quantities for events, employee kits, promotions or customer gifts.'],
]

const faqs = [
  ['Can you make a keychain from my logo?', 'Yes. Send the clearest logo file you have and the required quantity. The team will review the shape, small details and colour separation before confirming what can be produced.'],
  ['Can I order a personalized name keychain?', 'You can share the name or text, preferred style, approximate size and colour direction. A project-specific design and quotation can then be discussed.'],
  ['Do you make car or number-plate keychains?', 'Vehicle-inspired and number-plate keychain requests can be reviewed from a photo, model reference or registration text. Final feasibility depends on the detail and requested size.'],
  ['Can I request bulk 3D printed keychains?', 'Yes. Include the design, quantity, delivery city and required date in your enquiry so production and shipping requirements can be assessed.'],
  ['How much does a custom 3D printed keychain cost?', 'Pricing depends on design work, dimensions, detail, colours, finish and quantity. Send your reference for an accurate quotation.'],
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://fusion3dlabs.com/custom-3d-printed-keychains#service',
    name: 'Custom 3D Printed Keychains in India',
    serviceType: 'Custom 3D printed name, logo and personalized keychains',
    provider: { '@id': 'https://fusion3dlabs.com/#organization' },
    areaServed: { '@type': 'Country', name: 'India' },
    url: 'https://fusion3dlabs.com/custom-3d-printed-keychains',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fusion3dlabs.com/' },
      { '@type': 'ListItem', position: 2, name: 'Custom 3D Printed Keychains', item: 'https://fusion3dlabs.com/custom-3d-printed-keychains' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  },
]

export default function CustomKeychainsPage() {
  return (
    <div className="min-h-screen bg-bg pt-24 sm:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-border/50 px-6 py-14 lg:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-text-muted"><Link href="/" className="hover:text-primary">Home</Link><span className="mx-2">/</span><span>Custom 3D Printed Keychains</span></nav>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Name · Logo · Car · Bulk</p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-7xl">Custom 3D Printed Keychains in India</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">Create a personalized keychain around a name, logo, vehicle reference or original idea. Fusion3DLabs reviews the design, size, finish, quantity and delivery requirements before confirming each project.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={whatsappUrl('Hi Fusion3D Labs! I would like a quote for custom 3D printed keychains.')} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition hover:bg-highlight-1">Send Your Design on WhatsApp</a>
              <Link href="/bulk-order" className="rounded-full border border-border px-7 py-3.5 font-semibold text-text-primary transition hover:border-primary">Request a Bulk Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">Keychain ideas we can review</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">Start with the reference you already have. Fine details may need to be adjusted so the design remains clear and practical at keychain size.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {options.map(([title, text]) => <article key={title} className="rounded-3xl border border-border bg-surface p-7"><h3 className="text-xl font-bold text-text-primary">{title}</h3><p className="mt-3 leading-relaxed text-text-secondary">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-bg-2 px-6 py-16 lg:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">What to send</p><h2 className="text-3xl font-extrabold tracking-tight text-text-primary">Get a clearer quotation</h2><ul className="mt-6 space-y-3 text-text-secondary">{['Name, logo, photo, sketch or reference file', 'Approximate size and required quantity', 'Preferred colours and finish direction', 'Delivery city and required date', 'How the keychain will be used'].map(item => <li key={item} className="rounded-2xl border border-border bg-surface p-4">{item}</li>)}</ul></div>
          <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Pricing factors</p><h2 className="text-3xl font-extrabold tracking-tight text-text-primary">Quoted around the design</h2><p className="mt-5 leading-relaxed text-text-secondary">Custom keychain pricing depends on design preparation, dimensions, small-feature complexity, colour changes, finishing work and quantity. Bulk requirements may need a sample or design review before production is confirmed.</p><Link href="/3d-printing-services" className="mt-7 inline-flex text-sm font-bold text-primary hover:underline">Explore the complete 3D printing process →</Link></div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8"><div className="mx-auto max-w-4xl"><h2 className="mb-8 text-3xl font-extrabold tracking-tight text-text-primary">Custom keychain questions</h2><div className="divide-y divide-border border-y border-border">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-text-primary">{question}<span className="text-2xl text-primary transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">{answer}</p></details>)}</div></div></section>
    </div>
  )
}
