'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { PRODUCTS, CATEGORIES, formatPrice, fetchProductsFromAPI } from '@/lib/products'
import type { Product } from '@/lib/products'
import ScrollReveal from '@/components/ScrollReveal'

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS)
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default')
  const [search, setSearch] = useState('')

  useEffect(() => {
    // Immediately show any admin-saved local products on top of mock data
    try {
      const local = JSON.parse(localStorage.getItem('fusion3d-admin-products') || '[]')
      if (local.length > 0) {
        const mapped = local.map((p: any) => ({
          id: p._id, slug: p.slug, name: p.name, tagline: p.tagline ?? '',
          description: p.description ?? '', price: p.price, category: p.category,
          material: p.material ?? '', dimensions: p.dimensions ?? '',
          finish: p.finish ?? [], images: p.images ?? [], featured: p.featured ?? false,
          limited: p.limited ?? false, tags: p.tags ?? [], inStock: p.inStock ?? true,
          relatedSlugs: [],
        }))
        setAllProducts(prev => {
          const existingSlugs = new Set(mapped.map((p: any) => p.slug))
          return [...mapped, ...prev.filter((p: any) => !existingSlugs.has(p.slug))]
        })
      }
    } catch {}

    fetchProductsFromAPI().then(apiProducts => {
      if (apiProducts.length > 0) setAllProducts(apiProducts)
    })
  }, [])

  const filtered = useMemo(() => {
    let items = allProducts
    if (activeCategory !== 'All') items = items.filter(p => p.category === activeCategory)
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    )
    if (sortBy === 'price-asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    return items
  }, [allProducts, activeCategory, sortBy, search])

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 px-6 lg:px-8 bg-[var(--bg)] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="fade" delay={0}>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-3">All Objects</p>
          </ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <ScrollReveal direction="up" delay={80}>
              <h1 className="text-5xl lg:text-6xl font-bold text-[var(--text-primary)] tracking-tight">
                The Collection
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={160}>
              <div className="flex items-center gap-3">
                <input
                  type="search"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-48 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="py-12 px-6 lg:px-8 bg-[var(--bg)] min-h-screen">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[var(--text-muted)] text-lg mb-4">No objects found</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All') }} className="text-[var(--accent)] text-sm hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <ScrollReveal direction="fade" delay={0}>
                <p className="text-xs text-[var(--text-muted)] mb-8">{filtered.length} objects</p>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product, i) => (
                  <ScrollReveal key={product.id} direction="up" delay={Math.min(i % 4, 3) * 70}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
    setTilt({ x: (y - cy) / cy * 6, y: -(x - cx) / cx * 6 })
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <Link href={`/product/${product.slug}`} style={{ display: 'block', perspective: '800px' }}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        className="group relative rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] card-glow gradient-border"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transition: hovered ? 'transform 0.1s ease-out, box-shadow 0.3s' : 'transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.3s',
          boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(232,99,10,0.15)` : undefined,
          willChange: 'transform',
        }}
      >
        {/* Image area */}
        <div className="aspect-square bg-gradient-to-br from-[var(--bg-3)] to-[var(--surface)] relative overflow-hidden">
          {/* Real product image */}
          {product.images && product.images.length > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 1 }}
            />
          )}

          {/* Animated glow follow on hover */}
          {hovered && (
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle 80px at ${glowPos.x}% ${glowPos.y}%, rgba(232,99,10,0.25) 0%, transparent 70%)`,
                transition: 'background 0.08s',
              }}
            />
          )}

          {/* Placeholder visual — animated rings (shown when no image) */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: product.images && product.images.length > 0 ? 0 : 1 }}>
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full border border-[var(--accent)]/20 transition-all duration-700"
                style={{
                  transform: hovered ? 'scale(1.4) rotate(45deg)' : 'scale(1)',
                  borderColor: hovered ? 'rgba(232,99,10,0.6)' : undefined,
                  boxShadow: hovered ? '0 0 30px rgba(232,99,10,0.3)' : undefined,
                  transition: 'transform 0.7s cubic-bezier(.16,1,.3,1), border-color 0.4s, box-shadow 0.4s',
                }}
              />
              <div
                className="absolute inset-3 rounded-full border border-[var(--accent)]/15"
                style={{
                  transform: hovered ? 'scale(1.3) rotate(-30deg)' : 'scale(1)',
                  borderColor: hovered ? 'rgba(232,99,10,0.5)' : undefined,
                  transition: 'transform 0.6s cubic-bezier(.16,1,.3,1) 0.05s, border-color 0.4s',
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="w-5 h-5 rounded-full bg-[var(--accent)]"
                  style={{
                    transform: hovered ? 'scale(1.6)' : 'scale(1)',
                    boxShadow: hovered ? '0 0 20px rgba(232,99,10,0.8), 0 0 40px rgba(232,99,10,0.4)' : undefined,
                    transition: 'transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s',
                  }}
                />
              </div>
              {/* Orbiting dot */}
              <div
                className="absolute inset-0"
                style={{
                  animation: hovered ? 'spin 1.2s linear infinite' : undefined,
                }}
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[var(--accent)]/60 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0 }} />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {product.limited && (
              <span className="text-[9px] uppercase tracking-wider bg-[var(--accent)] text-white px-2 py-0.5 rounded-full">
                Limited {product.edition}
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[9px] uppercase tracking-wider bg-[var(--bg-3)]/80 backdrop-blur text-[var(--text-muted)] px-2 py-0.5 rounded-full">
              {product.material}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">{product.category}</p>
          <h3 className="font-semibold text-[var(--text-primary)] tracking-tight text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">{product.name}</h3>
          <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-1">{product.tagline}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              From {formatPrice(product.price)}
            </span>
            <span
              className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-all duration-300 flex items-center gap-1"
              style={{ transform: hovered ? 'translateX(3px)' : undefined, transition: 'transform 0.3s, color 0.3s' }}
            >
              View
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </div>

          <div className="flex gap-1.5 mt-3">
            {product.finish.slice(0, 3).map(f => (
              <span key={f} className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--bg-3)] text-[var(--text-muted)]">
                {f}
              </span>
            ))}
            {product.finish.length > 3 && (
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--bg-3)] text-[var(--text-muted)]">
                +{product.finish.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
