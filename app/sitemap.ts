import { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'

const BASE_URL = 'https://fusion3dlabs.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = PRODUCTS.map(p => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/bulk-order`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/track`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productUrls,
  ]
}
