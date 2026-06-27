import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin/login', '/api/'],
      },
    ],
    sitemap: 'https://fusion3dlabs.com/sitemap.xml',
  }
}
