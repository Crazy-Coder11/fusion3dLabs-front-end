import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import ServicesSection from '@/components/home/ServicesSection'
import FaqSection from '@/components/home/FaqSection'
import ScrollShowcase from '@/components/home/ScrollShowcase'

export const metadata: Metadata = {
  title: 'Turn Your Imagination Into Reality | Fusion3DLabs',
  description: 'We don\'t simply print objects. We create possibilities. Discover premium 3D printing and rapid prototyping services in India.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fusion3DLabs',
  description: 'Premium 3D printing and rapid prototyping studio. We transform imagination into reality.',
  url: 'https://fusion3dlabs.com',
  image: 'https://fusion3dlabs.com/og-image.jpg',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, Online',
  areaServed: 'IN',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <FeaturedProducts />
      <ServicesSection />
      <ScrollShowcase />
      <FaqSection />
    </>
  )
}
