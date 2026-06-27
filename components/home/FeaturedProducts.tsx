'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getFeaturedProducts, fetchProductsFromAPI, formatPrice } from '@/lib/products'
import type { Product } from '@/lib/products'
import ScrollReveal from '@/components/ScrollReveal'
import SplitReveal from '@/components/gsap/SplitReveal'

const ProductCardScene = dynamic(() => import('@/components/three/ProductCardScene'), {
  ssr: false,
  loading: () => null,
})

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(getFeaturedProducts())

  useEffect(() => {
    fetchProductsFromAPI().then(all => {
      const featured = all.filter(p => p.featured)
      if (featured.length > 0) setProducts(featured)
    })
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <SplitReveal
              text="Current Drop"
              tag="p"
              className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-3"
              start="top 90%"
            />
            <SplitReveal
              text="Featured Objects"
              tag="h2"
              className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight"
              stagger={0.07}
              start="top 88%"
            />
          </div>
          <ScrollReveal direction="right" delay={100}>
            <Link
              href="/shop"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2 self-start lg:self-auto"
            >
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {products[0] && (
            <ScrollReveal direction="scale" delay={0} className="lg:col-span-7">
              <FeaturedHero product={products[0]} />
            </ScrollReveal>
          )}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {products.slice(1, 3).map((p, i) => (
              <ScrollReveal key={p.id} direction="left" delay={100 + i * 80}>
                <SmallCard product={p} />
              </ScrollReveal>
            ))}
          </div>
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.slice(3, 6).map((p, i) => (
              <ScrollReveal key={p.id} direction="up" delay={i * 90}>
                <MiniCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedHero({ product }: { product: ReturnType<typeof getFeaturedProducts>[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative block rounded-2xl overflow-hidden bg-[var(--surface)] aspect-[4/3] lg:aspect-auto lg:min-h-[480px] card-glow gradient-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background: real image if available, otherwise Three.js scene */}
      <div className="absolute inset-0 z-0">
        {product.images && product.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Suspense fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-3)] via-[var(--surface)] to-[var(--bg-2)]" />
          }>
            <ProductCardScene hovered={hovered} color="#e8630a" />
          </Suspense>
        )}
      </div>

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent z-10 transition-opacity duration-500 ${hovered ? 'opacity-80' : 'opacity-100'}`} />

      {/* Content overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
        <div className="flex items-start justify-between">
          {product.limited && (
            <span className="text-[10px] uppercase tracking-widest bg-[var(--accent)] text-white px-3 py-1 rounded-full">
              {product.edition} Limited
            </span>
          )}
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest ml-auto">
            {product.category}
          </span>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] mb-2">Featured</p>
          <h3 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-1">{product.name}</h3>
          <p className="text-sm text-[var(--text-muted)]">{product.material} / {product.dimensions}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-semibold text-[var(--text-primary)]">
              From {formatPrice(product.price)}
            </span>
            <span
              className={`inline-flex items-center gap-2 text-sm text-[var(--accent)] transition-all duration-300 ${hovered ? 'gap-3' : ''}`}
            >
              View in 3D
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function SmallCard({ product }: { product: ReturnType<typeof getFeaturedProducts>[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative block rounded-2xl overflow-hidden bg-[var(--surface)] p-6 hover:bg-[var(--surface-2)] transition-all duration-400 card-glow gradient-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-square mb-4 rounded-xl bg-[var(--bg-3)] flex items-center justify-center relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <>
            <div className={`absolute w-20 h-20 rounded-full border border-[var(--accent)]/20 transition-all duration-700 ${hovered ? 'scale-150 border-[var(--accent)]/60 rotate-45' : ''}`} style={{ transition: 'transform 0.7s cubic-bezier(.16,1,.3,1), border-color 0.4s' }} />
            <div className={`absolute w-12 h-12 rounded-full border border-[var(--accent)]/30 transition-all duration-500 ${hovered ? 'scale-125 border-[var(--accent)]/80 -rotate-12' : ''}`} style={{ transition: 'transform 0.5s cubic-bezier(.16,1,.3,1), border-color 0.4s' }} />
            <div className={`w-4 h-4 rounded-full bg-[var(--accent)] transition-all duration-300 ${hovered ? 'scale-150 shadow-[0_0_20px_var(--accent-glow)]' : ''}`} />
            <div className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-all duration-700 ${hovered ? 'top-0 opacity-100' : 'top-1/2 opacity-0'}`} style={{ transitionProperty: 'top, opacity', transition: hovered ? 'top 1.2s ease-out, opacity 0.3s' : 'opacity 0.3s' }} />
          </>
        )}
      </div>
      <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">{product.category}</p>
      <h3 className="font-semibold text-[var(--text-primary)] tracking-tight mb-0.5 group-hover:text-[var(--accent)] transition-colors">{product.name}</h3>
      <p className="text-sm text-[var(--text-secondary)]">From {formatPrice(product.price)}</p>
    </Link>
  )
}

function MiniCard({ product }: { product: ReturnType<typeof getFeaturedProducts>[0] }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-all duration-300 border border-[var(--border)] hover:border-[var(--accent)]/30"
    >
      <div className="w-14 h-14 rounded-lg bg-[var(--bg-3)] flex-shrink-0 flex items-center justify-center group-hover:bg-[var(--accent)]/10 transition-all duration-400 relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="w-5 h-5 rounded-full bg-[var(--accent)]/40 group-hover:bg-[var(--accent)] transition-all duration-300 group-hover:scale-125" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{product.category}</p>
        <h3 className="font-medium text-[var(--text-primary)] text-sm truncate group-hover:text-[var(--accent)] transition-colors">{product.name}</h3>
        <p className="text-xs text-[var(--text-secondary)]">From {formatPrice(product.price)}</p>
      </div>
      <svg
        className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-all duration-300 group-hover:translate-x-1 flex-shrink-0"
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    </Link>
  )
}
