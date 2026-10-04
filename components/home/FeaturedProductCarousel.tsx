'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

export interface FeaturedProductItem {
  name: string
  slug: string
  tagline: string
  description: string
  price: number
  material: string
  dimensions: string
  imageUrl: string
  category?: string
  featured?: boolean
}

export default function FeaturedProductCarousel({ products }: { products: FeaturedProductItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const hasMultiple = products.length > 1

  const move = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.88, behavior: 'smooth' })
  }

  return (
    <div className="relative z-10 -mt-5 sm:-mt-12" aria-label="Featured products carousel">
      {hasMultiple && (
        <div className="mb-5 flex items-center justify-between gap-5 px-3 sm:px-10 lg:px-20">
          <p className="text-sm font-bold text-emerald-950">{products.length} featured products</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white/90 text-emerald-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-950 hover:text-white" aria-label="Previous featured product">←</button>
            <button type="button" onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white/90 text-emerald-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-950 hover:text-white" aria-label="Next featured product">→</button>
          </div>
        </div>
      )}

      <div
        ref={trackRef}
        className={`product-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto px-3 pb-8 sm:px-10 lg:px-20 ${hasMultiple ? '' : 'justify-center'}`}
      >
        {products.map((product, index) => (
          <article
            key={product.slug}
            className={`${hasMultiple ? 'w-[88%] shrink-0 sm:w-[72%] lg:w-[82%]' : 'w-full'} group snap-center grid items-center gap-6 rounded-3xl border border-white/80 bg-white/92 p-5 shadow-[0_30px_80px_-40px_rgba(6,78,45,0.5)] backdrop-blur-xl sm:p-7 lg:grid-cols-[280px_1fr_auto]`}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-emerald-50">
              <Image
                src={product.imageUrl}
                alt={`${product.name} featured product`}
                fill
                sizes="(max-width: 640px) 82vw, 280px"
                priority={index === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-950/20 to-transparent" aria-hidden="true" />
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">Live featured product</p>
              <h3 className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">{product.name}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-text-secondary">{product.description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-text-secondary">
                <span className="rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1.5">{product.material}</span>
                <span className="rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1.5">{product.dimensions}</span>
              </div>
            </div>
            <div className="lg:text-right">
              <p className="text-sm text-text-muted">Current listed price</p>
              <p className="mt-1 text-3xl font-extrabold text-text-primary">₹{product.price.toLocaleString('en-IN')}</p>
              <Link href={`/product/${product.slug}`} className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-emerald-700">View Featured Product</Link>
            </div>
          </article>
        ))}
      </div>

      {hasMultiple && (
        <div className="mt-1 text-center">
          <Link href="/shop" className="text-sm font-bold text-primary hover:text-highlight-1">Browse the complete collection →</Link>
        </div>
      )}
    </div>
  )
}
