import ProductStage from './ProductStage'
import FeaturedProductCarousel, { type FeaturedProductItem } from './FeaturedProductCarousel'
import ShopProductCarousel from './ShopProductCarousel'

const FALLBACK_PRODUCT: FeaturedProductItem = {
  name: 'Fridge Magnet',
  slug: 'firdge-magnet',
  tagline: 'Personalized made-to-order piece',
  description: 'A customizable small-format product available through the Fusion3DLabs catalog.',
  price: 120,
  material: 'PLA+',
  dimensions: '22 × 22 × 23',
  imageUrl: '/featured-fridge-magnet.jpg',
  category: 'Personalized',
  featured: true,
}

async function getCatalogProducts(): Promise<FeaturedProductItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://fusion3dlabs.com'
  try {
    const response = await fetch(`${baseUrl}/api/products?summary=true&limit=24`, { next: { revalidate: 300 } })
    if (!response.ok) return [FALLBACK_PRODUCT]
    const products = await response.json()
    if (!Array.isArray(products) || products.length === 0) return [FALLBACK_PRODUCT]

    return products.map(product => {
      const slug = String(product.slug || FALLBACK_PRODUCT.slug)
      return {
        name: String(product.name || FALLBACK_PRODUCT.name).replace(/Firdge/gi, 'Fridge'),
        slug,
        tagline: String(product.tagline || FALLBACK_PRODUCT.tagline).replace(/Firdge/gi, 'Fridge'),
        description: String(product.description || FALLBACK_PRODUCT.description).replace(/Firdge/gi, 'Fridge'),
        price: Number(product.price || FALLBACK_PRODUCT.price),
        material: String(product.material || FALLBACK_PRODUCT.material),
        dimensions: String(product.dimensions || FALLBACK_PRODUCT.dimensions).replace(/X/g, ' × '),
        category: String(product.category || '3D Printed'),
        featured: Boolean(product.featured),
        imageUrl: slug === FALLBACK_PRODUCT.slug
          ? FALLBACK_PRODUCT.imageUrl
          : `${baseUrl}/api/products/${encodeURIComponent(slug)}/image`,
      }
    })
  } catch {
    return [FALLBACK_PRODUCT]
  }
}

export default async function ProductShowcase() {
  const catalogProducts = await getCatalogProducts()
  const selectedFeatured = catalogProducts.filter(product => product.featured)
  const featuredProducts = selectedFeatured.length > 0
    ? selectedFeatured
    : [catalogProducts[0] || FALLBACK_PRODUCT]

  return (
    <section className="relative overflow-hidden bg-[#f4f8f4] px-6 py-24 lg:px-8 lg:py-32" aria-labelledby="products-heading">
      <div className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-primary">Products & custom work</p>
          <h2 id="products-heading" className="text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">Objects with depth. Made around your idea.</h2>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">Explore the kinds of objects Fusion3DLabs can review, then browse featured and currently listed products.</p>
        </div>

        <ProductStage />
        <FeaturedProductCarousel products={featuredProducts} />
        <ShopProductCarousel products={catalogProducts} />
      </div>
    </section>
  )
}
