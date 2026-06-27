export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  price: number
  category: string
  material: string
  dimensions: string
  finish: string[]
  images: string[]
  featured: boolean
  limited?: boolean
  edition?: string
  tags: string[]
  inStock: boolean
  relatedSlugs: string[]
}

export const CATEGORIES = ['All', 'Sculpture', 'Decor', 'Desk Series', 'Wearable', 'Custom']

export const PRODUCTS: Product[] = []

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return PRODUCTS
  return PRODUCTS.filter(p => p.category === category)
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return PRODUCTS.filter(p => slugs.includes(p.slug))
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

const API_BASE =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080')
    : (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080')

function mapApiProduct(p: any): Product {
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
    finish: p.finish ?? [],
    images: p.images ?? [],
    featured: p.featured ?? false,
    limited: p.limited ?? false,
    edition: p.edition,
    tags: p.tags ?? [],
    inStock: p.inStock ?? true,
    relatedSlugs: p.relatedSlugs ?? [],
  }
}

export async function fetchProductsFromAPI(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products?limit=200`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data.map(mapApiProduct) : []
  } catch {
    return []
  }
}

export async function fetchProductBySlugFromAPI(slug: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_BASE}/api/products/${slug}`, { cache: 'no-store' })
    if (!res.ok) return undefined
    return mapApiProduct(await res.json())
  } catch {
    return undefined
  }
}
