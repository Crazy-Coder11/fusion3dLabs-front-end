'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useCartStore } from '@/store/cart'

interface Props {
  product: Product
  related: Product[]
}

export default function ProductClientPage({ product, related }: Props) {
  const [selectedFinish, setSelectedFinish] = useState(product.finish[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [imgError, setImgError] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const images = product.images?.length ? product.images : []
  const activeImage = images[activeImageIndex] ?? null

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      finish: selectedFinish,
      quantity: qty,
      image: product.images?.[0],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--text-primary)] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[var(--text-primary)]">{product.name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Image section */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--surface)] to-[var(--bg-3)] relative overflow-hidden border border-[var(--border)]">
              {activeImage && !imgError ? (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Fallback 3D placeholder */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 rounded-full border border-[var(--accent)]/20 animate-spin" style={{ animationDuration: '20s' }} />
                    <div className="absolute inset-4 rounded-full border border-[var(--accent)]/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                    <div className="absolute inset-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[var(--accent)]/20" />
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
                    {activeImage ? 'Image unavailable' : '3D preview coming soon'}
                  </p>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {product.limited && (
                  <span className="text-[10px] uppercase tracking-wider bg-[var(--accent)] text-white px-3 py-1 rounded-full">
                    Limited — {product.edition}
                  </span>
                )}
              </div>

              {/* Gallery arrows if multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => { setActiveImageIndex(i => Math.max(0, i - 1)); setImgError(false) }}
                    disabled={activeImageIndex === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[var(--bg)]/80 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-all"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => { setActiveImageIndex(i => Math.min(images.length - 1, i + 1)); setImgError(false) }}
                    disabled={activeImageIndex === images.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[var(--bg)]/80 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-all"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-2">
              {images.length > 0
                ? images.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImageIndex(i); setImgError(false) }}
                    className={`aspect-square rounded-xl overflow-hidden border transition-all ${
                      i === activeImageIndex ? 'border-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <div className="relative w-full h-full bg-[var(--surface)]">
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>
                  </button>
                ))
                : [0, 1, 2, 3].map(i => (
                  <div key={i} className={`aspect-square rounded-xl bg-[var(--surface)] border ${i === 0 ? 'border-[var(--accent)]' : 'border-[var(--border)]'}`} />
                ))
              }
            </div>
          </div>

          {/* Info */}
          <div className="py-4">
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] mb-2">{product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
              {product.name}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-6 italic">{product.tagline}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-[var(--text-primary)]">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-[var(--text-muted)]">starting price</span>
            </div>

            {/* Description */}
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              {[
                { label: 'Material', value: product.material },
                { label: 'Dimensions', value: product.dimensions },
                { label: 'Category', value: product.category },
                { label: 'Stock', value: product.inStock ? 'Available' : 'Out of Stock' },
              ].map(spec => (
                <div key={spec.label}>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-0.5">{spec.label}</p>
                  <p className="text-sm text-[var(--text-primary)] font-medium">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Finish selector */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
                Finish — <span className="text-[var(--text-primary)] normal-case tracking-normal">{selectedFinish}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.finish.map(f => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      selectedFinish === f
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-8">
              <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mr-1">Qty</p>
              <div className="flex items-center border border-[var(--border)] rounded-full overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >−</button>
                <span className="w-10 text-center text-sm font-medium text-[var(--text-primary)]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 py-4 rounded-full font-medium text-sm transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : product.inStock
                    ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-2)]'
                    : 'bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed'
                }`}
              >
                {added ? '✓ Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <Link
                href="/cart"
                className="flex-1 py-4 rounded-full border border-[var(--border)] text-[var(--text-secondary)] font-medium text-sm text-center hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
              >
                View Cart
              </Link>
            </div>

            {/* Contact inquiry */}
            <div className="pt-8 border-t border-[var(--border)]">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                  ?
                </span>
                Have questions? Start Your Project →
              </Link>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-8">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all">
                  <div className="aspect-square rounded-xl bg-[var(--bg-3)] mb-4 overflow-hidden relative">
                    {p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="300px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-[var(--accent)]/20 group-hover:border-[var(--accent)]/50 transition-colors" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{p.category}</p>
                  <h3 className="font-semibold text-[var(--text-primary)] mt-1">{p.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-0.5">From {formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
