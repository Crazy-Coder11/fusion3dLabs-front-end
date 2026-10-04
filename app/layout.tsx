import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import PromoBanner from '@/components/layout/PromoBanner'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ThemeProvider from '@/components/ThemeProvider'
import ConditionalPublicLayout from '@/components/layout/ConditionalPublicLayout'
import MotionProvider from '@/components/MotionProvider'
import CartDrawer from '@/components/layout/CartDrawer'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://fusion3dlabs.com'),
  title: {
    default: '3D Printing Services India | Fusion3DLabs',
    template: '%s | Fusion3DLabs',
  },
  description: 'Custom 3D printing, CAD design and rapid prototyping services with pan-India delivery. Send an idea, sketch or CAD file for a project quote.',
  applicationName: 'Fusion3DLabs',
  category: '3D printing services',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Fusion3DLabs' }],
  creator: 'Fusion3DLabs',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fusion3dlabs.com',
    siteName: 'Fusion3DLabs',
    title: 'Custom 3D Printing Services in India | Fusion3DLabs',
    description: 'Custom 3D printing, CAD design and rapid prototyping with delivery across India.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Fusion3DLabs custom 3D printing services in India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom 3D Printing Services in India | Fusion3DLabs',
    description: 'Custom 3D printing, CAD design and rapid prototyping with delivery across India.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand-icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="h-full" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <MotionProvider>
            <ConditionalPublicLayout>
              <div className="sticky top-0 z-50 w-full">
                <PromoBanner />
                <Navbar />
              </div>
            </ConditionalPublicLayout>
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <ConditionalPublicLayout>
              <Footer />
              <WhatsAppButton />
            </ConditionalPublicLayout>
            <Analytics />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
