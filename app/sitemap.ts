import { MetadataRoute } from 'next'
import { PRODUCTS, fetchProductsFromAPI } from '@/lib/products'

const BASE_URL = 'https://fusion3dlabs.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiProducts = await fetchProductsFromAPI()
  const products = apiProducts.length > 0 ? apiProducts : PRODUCTS
  const productUrls = products.map(p => ({
    url: `${BASE_URL}/product/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/3d-printing-services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/shop`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/bulk-order`, changeFrequency: 'monthly', priority: 0.8 },
    ...productUrls,
  ]
}
