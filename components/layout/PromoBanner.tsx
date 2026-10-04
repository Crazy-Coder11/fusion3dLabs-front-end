import Link from 'next/link'

export default function PromoBanner() {
  return (
    <div className="w-full bg-[linear-gradient(90deg,#052e22_0%,#047857_48%,#0f766e_100%)] text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-center">
        <span className="hidden sm:block h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(190,242,100,0.9)]" aria-hidden="true" />
        <p className="text-xs sm:text-sm font-semibold !text-white">Custom 3D printing, design support and delivery across India</p>
        <Link href="/3d-printing-services" className="hidden sm:inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold text-white transition hover:bg-white hover:text-emerald-900">
          View services <span className="ml-1" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
