'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProductBySlug, fetchProductBySlugFromAPI } from '@/lib/products'
import type { Product } from '@/lib/products'
import ProductClientPage from './ProductClientPage'

function mapLocalProduct(p: any): Product {
  return {
    id: p._id ?? p.id ?? '',
    slug: p.slug ?? '',
    name: p.name ?? '',
    tagline: p.tagline ?? '',
    description: p.description ?? '',
    price: p.price ?? 0,
    category: p.category ?? '',
    material: p.material ?? '',
    dimensions: p.dimensions ?? '',
    finish: p.finish?.length ? p.finish : ['Standard'],
    images: p.images ?? [],
    featured: p.featured ?? false,
    limited: p.limited ?? false,
    edition: p.edition,
    tags: p.tags ?? [],
    inStock: p.inStock ?? true,
    relatedSlugs: [],
  }
}

export default function ProductLoader({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null | 'loading'>('loading')

  useEffect(() => {
    // 1. Static data (instant)
    const staticProduct = getProductBySlug(slug)
    if (staticProduct) { setProduct(staticProduct); return }

    // 2. localStorage (admin-saved local products)
    try {
      const local: any[] = JSON.parse(localStorage.getItem('fusion3d-admin-products') || '[]')
      const found = local.find(p => p.slug === slug)
      if (found) { setProduct(mapLocalProduct(found)); return }
    } catch {}

    // 3. API
    fetchProductBySlugFromAPI(slug).then(p => setProduct(p ?? null))
  }, [slug])

  if (product === 'loading') {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-4">
        <p className="text-6xl font-black text-[var(--text-primary)]">404</p>
        <p className="text-[var(--text-muted)]">Product not found.</p>
        <Link href="/shop" className="text-sm text-[var(--accent)] hover:underline">← Back to Shop</Link>
      </div>
    )
  }

  return <ProductClientPage product={product} related={[]} />
}
