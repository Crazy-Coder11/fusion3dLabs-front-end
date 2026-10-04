import type { Metadata } from 'next'
import Link from 'next/link'
import { whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Online 3D Printing Services India',
  description:
    'Custom 3D printing, design support and rapid prototyping for made-to-order projects delivered across India. Send a reference for a quote.',
  alternates: { canonical: '/3d-printing-services' },
  openGraph: {
    title: 'Online 3D Printing Services India | Fusion3DLabs',
    description: 'From an idea, sketch or CAD file to a finished 3D printed part, delivered across India.',
    url: '/3d-printing-services',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Fusion3DLabs online 3D printing services across India' }],
  },
}

const services = [
  {
    title: 'Custom 3D Printing',
    text: 'Made-to-order parts, models, gifts and one-off objects produced from your supplied file or a design developed with our team.',
  },
  {
    title: 'Rapid Prototyping',
    text: 'Physical prototypes for testing form, fit and function before you commit to a larger production run.',
  },
  {
    title: 'CAD Design Support',
    text: 'No printable file yet? Start with an idea or sketch and discuss a production-ready 3D model with our design team.',
  },
  {
    title: 'Low-Volume Production',
    text: 'Repeatable short runs for custom components, corporate requirements and products that do not need mass-production tooling.',
  },
]

const faqs = [
  {
    question: 'What files can I send for a 3D printing quote?',
    answer: 'You can start with a 3D CAD file, a sketch or an idea. Send the available reference and your requirements so the team can review the project.',
  },
  {
    question: 'Which 3D printing materials are available?',
    answer: 'Material availability and suitability are confirmed during the quotation. Selection depends on intended use, geometry, finish and handling requirements.',
  },
  {
    question: 'How much does custom 3D printing cost in India?',
    answer: 'Pricing depends on the part size, material, print time, geometry, quantity and finishing work. Share your file or reference for a project-specific quotation.',
  },
  {
    question: 'Do you deliver 3D printed parts across India?',
    answer: 'Yes. Completed 3D printed products and prototypes can be packaged and shipped across India.',
  },
  {
    question: 'Can you finish or paint a 3D printed model?',
    answer: 'Post-processing options include sanding, priming and painting. The suitable finish depends on the material, geometry and intended use.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://fusion3dlabs.com/3d-printing-services#service',
    name: 'Custom 3D Printing Services in India',
    serviceType: '3D printing and rapid prototyping',
    provider: {
      '@type': 'Organization',
      '@id': 'https://fusion3dlabs.com/#organization',
      name: 'Fusion3DLabs',
      url: 'https://fusion3dlabs.com',
    },
    areaServed: { '@type': 'Country', name: 'India' },
    url: 'https://fusion3dlabs.com/3d-printing-services',
    description: 'Custom 3D printing, design support, rapid prototyping and made-to-order project delivery across India.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fusion3dlabs.com/' },
      { '@type': 'ListItem', position: 2, name: '3D Printing Services', item: 'https://fusion3dlabs.com/3d-printing-services' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  },
]

export default function ThreeDPrintingServicesPage() {
  return (
    <div className="min-h-screen bg-bg pt-24 sm:pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="px-6 lg:px-8 py-14 sm:py-20 border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-text-muted mb-7">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>3D Printing Services</span>
          </nav>
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.28em] text-primary font-semibold mb-5">Design · Print · Finish · Deliver</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.05]">
              Online Custom 3D Printing Services Across India
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
              Turn a CAD file, sketch or idea into a physical part. Fusion3DLabs supports custom FDM printing, design development, rapid prototypes, finishing and delivery across India.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link href="/bulk-order" className="px-7 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-highlight-1 transition-colors">
                Request a Custom Quote
              </Link>
              <a href={whatsappUrl('Hi Fusion3D Labs! I would like a quote for a 3D printing project.')} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-full border border-border text-text-primary font-semibold hover:border-primary transition-colors">
                Send Your File on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">One studio, from concept to finished print</h2>
            <p className="mt-4 text-text-secondary leading-relaxed">Choose the support your project needs, whether you already have a print-ready file or are beginning with a rough concept.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <article key={service.title} className="p-7 sm:p-8 rounded-3xl bg-surface border border-border shadow-sm">
                <span className="text-xs font-bold text-primary">0{index + 1}</span>
                <h3 className="text-xl font-bold text-text-primary mt-4 mb-3">{service.title}</h3>
                <p className="text-text-secondary leading-relaxed">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16 sm:py-24 bg-bg-2 border-y border-border/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">Materials & applications</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">Select the material around the job</h2>
            <p className="mt-5 text-text-secondary leading-relaxed">Material choice affects strength, flexibility, heat response, surface appearance and price. Current material availability is confirmed after the geometry and intended use are reviewed.</p>
            <Link href="/contact" className="inline-flex mt-7 text-sm font-bold text-primary hover:underline">Ask about material options →</Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Common project types</h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3 text-text-secondary">
              {['Functional prototypes', 'Replacement parts', 'Architectural models', 'Custom figurines', 'Personalized gifts', 'Industrial components', 'Educational models', 'Low-volume batches'].map(item => (
                <li key={item} className="p-4 rounded-2xl bg-surface border border-border">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">How to order a custom 3D print</h2>
          <ol className="mt-9 grid md:grid-cols-4 gap-5">
            {[
              ['1', 'Share', 'Send your file, sketch, photo or project idea.'],
              ['2', 'Review', 'Confirm size, material, quantity, finish and intended use.'],
              ['3', 'Quote', 'Receive a project-specific price and production estimate.'],
              ['4', 'Make', 'The approved model is printed, finished and prepared for delivery.'],
            ].map(([number, title, text]) => (
              <li key={number} className="list-none p-6 rounded-3xl border border-border bg-surface">
                <span className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">{number}</span>
                <h3 className="font-bold text-text-primary mt-5 mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-8">3D printing questions</h2>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map(faq => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-5 font-bold text-text-primary">
                  {faq.question}<span aria-hidden="true" className="text-primary group-open:rotate-45 transition-transform text-2xl">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-text-secondary leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-secondary/70 border border-primary/20 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Ready to discuss your 3D print?</h2>
            <p className="mt-3 text-text-secondary">Send the reference you have. The team will help identify the next step.</p>
            <Link href="/contact" className="inline-flex mt-7 px-7 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-highlight-1 transition-colors">Contact Fusion3DLabs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
