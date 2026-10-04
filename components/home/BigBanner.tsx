import Link from 'next/link'
import { whatsappUrl } from '@/lib/site'

const PROJECT_TYPES = [
  'Functional prototypes',
  'Custom models',
  'Replacement parts',
  'Architectural models',
  'Personalized objects',
  'Low-volume projects',
]

export default function BigBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-bg" aria-labelledby="project-banner-title">
      <div className="relative max-w-7xl mx-auto rounded-[2rem] overflow-hidden bg-[linear-gradient(125deg,#071a13_0%,#0d6b48_36%,#0b8c87_68%,#3155a4_100%)] shadow-[0_35px_90px_-48px_rgba(10,80,70,0.8)]">
        <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-lime-300/35 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[18%] -bottom-32 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.28),transparent_43%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:42px_42px]" aria-hidden="true" />

        <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 p-7 sm:p-10 lg:p-14 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.25em] !text-white font-bold mb-4">Custom 3D Printing Across India</p>
            <h2 id="project-banner-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight leading-tight">
              Start with a file, sketch, photo or idea
            </h2>
            <p className="mt-5 !text-white/80 leading-relaxed max-w-2xl">
              Share what you want to make, its intended use, dimensions and quantity. Fusion3DLabs will review the reference and discuss suitable design, printing and finishing options before providing a quotation.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link href="/bulk-order" className="inline-flex px-6 py-3.5 rounded-full bg-white text-emerald-950 font-bold hover:bg-lime-100 transition-colors shadow-lg">Request a Project Quote</Link>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-3.5 rounded-full border border-white/35 bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors backdrop-blur">Discuss on WhatsApp</a>
            </div>
          </div>
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-3">
            {PROJECT_TYPES.map((type, index) => (
              <div
                key={type}
                className="p-4 rounded-2xl border border-white/25 bg-white/12 text-sm font-semibold text-white backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="mr-2 text-lime-200" aria-hidden="true">0{index + 1}</span>{type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
