'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import type { FeaturedProductItem } from './FeaturedProductCarousel'

export default function ShopProductCarousel({ products }: { products: FeaturedProductItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const move = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.8, 760), behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <section className="mt-20 lg:mt-24" aria-labelledby="shop-carousel-heading">
      <div className="mb-7 flex items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">The collection</p>
          <h3 id="shop-carousel-heading" className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">Shop 3D printed products</h3>
        </div>
        <div className="flex items-center gap-2">
          {products.length > 1 && (
            <>
              <button type="button" onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-sm transition hover:bg-emerald-950 hover:text-white" aria-label="Previous shop products">←</button>
              <button type="button" onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-sm transition hover:bg-emerald-950 hover:text-white" aria-label="Next shop products">→</button>
            </>
          )}
          <Link href="/shop" className="hidden rounded-full bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-200 sm:inline-flex">View shop</Link>
        </div>
      </div>

      <div ref={trackRef} className="product-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto pb-7">
        {products.map(product => (
          <article key={product.slug} className="group w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl border border-emerald-900/10 bg-white p-3 shadow-[0_24px_50px_-40px_rgba(6,95,70,0.6)] sm:w-[45%] lg:w-[30%] xl:w-[24%]">
            <Link href={`/product/${product.slug}`} className="block">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-emerald-50">
                <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                {product.featured && <span className="absolute left-3 top-3 rounded-full bg-emerald-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Featured</span>}
              </div>
              <div className="p-3 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{product.category || '3D Printed'}</p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h4 className="text-lg font-extrabold tracking-tight text-text-primary group-hover:text-emerald-700">{product.name}</h4>
                  <p className="shrink-0 font-extrabold text-text-primary">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{product.tagline}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <Link href="/shop" className="inline-flex rounded-full bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-900 sm:hidden">View all products →</Link>
    </section>
  )
}
