import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import BigBanner from '@/components/home/BigBanner'
import ProductShowcase from '@/components/home/ProductShowcase'
import ProcessSteps from '@/components/home/ProcessSteps'
import FeatureGrid from '@/components/home/FeatureGrid'
import DarkCTA from '@/components/home/DarkCTA'
import FaqSection from '@/components/home/FaqSection'

export const metadata: Metadata = {
  title: { absolute: 'Fusion3DLabs | Custom 3D Printing & Model Making India' },
  description: 'Custom 3D printing and 3D model making across India, with CAD design support, rapid prototyping and delivery. Send your idea, sketch or file for a quote.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Fusion3DLabs | Custom 3D Printing & Model Making India',
    description: 'Custom 3D printing and 3D model making with CAD support, prototyping and delivery across India.',
    url: '/',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Fusion3DLabs custom 3D printing and model making in India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fusion3DLabs | Custom 3D Printing & Model Making India',
    description: 'Custom 3D printing and 3D model making with delivery across India.',
    images: ['/opengraph-image'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://fusion3dlabs.com/#organization',
    name: 'Fusion3DLabs',
    description: 'Custom 3D printing, 3D model making, CAD design and rapid prototyping studio serving customers across India.',
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
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://fusion3dlabs.com/#website',
    url: 'https://fusion3dlabs.com/',
    name: 'Fusion3DLabs',
    inLanguage: 'en-IN',
    publisher: { '@id': 'https://fusion3dlabs.com/#organization' },
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        headline="Custom 3D Printing & Model Making Across India"
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
