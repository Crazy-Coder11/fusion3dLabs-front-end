import type { Metadata } from 'next'
import { getProductBySlug, fetchProductBySlugFromAPI } from '@/lib/products'
import ProductLoader from './ProductLoader'
import ProductClientPage from './ProductClientPage'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug) ?? (await fetchProductBySlugFromAPI(slug))
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description.slice(0, 160),
    alternates: { canonical: `/product/${product.slug}` },
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
  const product = getProductBySlug(slug) ?? (await fetchProductBySlugFromAPI(slug))

  // Keep the localStorage fallback for local-only admin products. Products from
  // the public catalogue are rendered on the server so crawlers receive the
  // product copy and Product structured data in the initial HTML response.
  if (!product) return <ProductLoader slug={slug} />

  const productUrl = `https://fusion3dlabs.com/product/${product.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.name,
    description: product.description,
    image: product.images,
    url: productUrl,
    sku: product.sku || product.slug,
    mpn: product.sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: 'Fusion3DLabs',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Fusion3DLabs',
      },
    },
    ...(product.rating && product.reviewCount && product.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClientPage product={product} related={[]} />
    </>
  )
}
