import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import BigBanner from '@/components/home/BigBanner'
import ProductShowcase from '@/components/home/ProductShowcase'
import ProcessSteps from '@/components/home/ProcessSteps'
import FeatureGrid from '@/components/home/FeatureGrid'
import DarkCTA from '@/components/home/DarkCTA'
import FaqSection from '@/components/home/FaqSection'

export const metadata: Metadata = {
  title: { absolute: '3D Printing Services India | Fusion3DLabs' },
  description: 'Get custom 3D printing, CAD design and rapid prototyping with pan-India delivery. Send your idea, sketch or CAD file to Fusion3DLabs for a quote.',
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://fusion3dlabs.com/#organization',
  name: 'Fusion3DLabs',
  description: 'Custom 3D printing, CAD design and rapid prototyping studio serving customers across India.',
  url: 'https://fusion3dlabs.com',
  logo: 'https://fusion3dlabs.com/fusion3dlabs-logo-header.png',
  image: 'https://fusion3dlabs.com/opengraph-image',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+91-63782-06112',
    areaServed: 'IN',
    availableLanguage: 'English',
  },
  areaServed: { '@type': 'Country', name: 'India' },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        headline="Custom 3D Printing Services in India"
        subtitle="Turn an idea, sketch or CAD file into a finished part. Fusion3DLabs provides custom 3D printing, design support and rapid prototyping with delivery across India."
        ctaText="Get a 3D Printing Quote"
      />
      <BigBanner />
      <ProductShowcase />
      <ProcessSteps />
      <FeatureGrid />
      <DarkCTA />
      <FaqSection />
    </>
  )
}
