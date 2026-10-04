import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3D Printed Products & Custom Objects',
  description: 'Browse made-to-order 3D printed objects from Fusion3DLabs or request a custom design delivered across India.',
  alternates: { canonical: '/shop' },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
