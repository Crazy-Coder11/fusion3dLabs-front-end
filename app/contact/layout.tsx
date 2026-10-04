import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & 3D Printing Quote',
  description: 'Contact Fusion3DLabs to discuss custom 3D printing, CAD design, rapid prototyping or a made-to-order project in India.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
