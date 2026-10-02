import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import ProcessSteps from '@/components/home/ProcessSteps'
import PromptDemo from '@/components/home/PromptDemo'
import LogoRail from '@/components/home/LogoRail'
import FeatureShowcase from '@/components/home/FeatureShowcase'
import FeatureGrid from '@/components/home/FeatureGrid'
import DarkCTA from '@/components/home/DarkCTA'
import Metrics from '@/components/home/Metrics'
import Comparison from '@/components/home/Comparison'
import FaqSection from '@/components/home/FaqSection'
import FinalCTA from '@/components/home/FinalCTA'

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
      <ProcessSteps />
      <PromptDemo />
      <LogoRail />
      <FeatureShowcase />
      <FeatureGrid />
      <DarkCTA />
      <Metrics />
      <Comparison />
      <FaqSection />
      <FinalCTA />
    </>
  )
}