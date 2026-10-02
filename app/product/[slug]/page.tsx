import type { Metadata } from 'next'
import { getProductBySlug, fetchProductBySlugFromAPI } from '@/lib/products'
import ProductLoader from './ProductLoader'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug) ?? (await fetchProductBySlugFromAPI(slug))
  if (!product) return { title: 'Product Not Found' }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Fusion3DLabs',
    },
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      url: `https://fusion3dlabs.com/product/${product.slug}`,
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    images: product.images.map((img: string) => ({
      '@type': 'ImageObject',
      url: img,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating ?? 4.5,
      reviewCount: product.reviewCount ?? 0,
    },
  }

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.tagline,
      type: 'website',
      images: product.images.map((img: string) => ({
        url: img,
        width: 1200,
        height: 630,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.tagline,
      images: product.images[0],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  // ProductLoader handles static → localStorage → API lookup on the client,
  // so local-mode admin products (not in MongoDB) are always reachable
  return <ProductLoader slug={slug} />
}
