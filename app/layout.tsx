import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ThemeProvider from '@/components/ThemeProvider'
import CursorGlow from '@/components/CursorGlow'
import ConditionalPublicLayout from '@/components/layout/ConditionalPublicLayout'
import MotionProvider from '@/components/MotionProvider'
import CartDrawer from '@/components/layout/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fusion3dlabs.com'),
  title: {
    default: 'Fusion3DLabs | Turn Your Imagination Into Reality | Premium 3D Printing India',
    template: '%s | Fusion3DLabs',
  },
  description: 'Fusion3DLabs is India\'s premium 3D printing and rapid prototyping studio. We transform imagination into reality for engineers, designers, and creators. Start your project today.',
  keywords: ['3D Printing India', 'Rapid Prototyping', 'Custom 3D Printing', 'CAD Design Services', 'Product Development', 'Industrial 3D Printing'],
  authors: [{ name: 'Fusion3DLabs' }],
  creator: 'Fusion3DLabs',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fusion3dlabs.com',
    siteName: 'Fusion3DLabs',
    title: 'Fusion3DLabs | Turn Your Imagination Into Reality',
    description: 'Fusion3DLabs is India\'s premium 3D printing and rapid prototyping studio. We transform imagination into reality.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Fusion3DLabs - Turn Your Imagination Into Reality' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fusion3DLabs | Turn Your Imagination Into Reality',
    description: 'Fusion3DLabs is India\'s premium 3D printing and rapid prototyping studio.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <MotionProvider>
            <CursorGlow />
            <ConditionalPublicLayout>
              <Navbar />
            </ConditionalPublicLayout>
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <ConditionalPublicLayout>
              <Footer />
              <WhatsAppButton />
            </ConditionalPublicLayout>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
