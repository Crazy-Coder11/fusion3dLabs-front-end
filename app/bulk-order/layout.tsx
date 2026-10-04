import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom & Bulk 3D Printing Quote',
  description: 'Request a quote for custom 3D printing, prototypes, architectural models or a low-volume production project from Fusion3DLabs.',
  alternates: { canonical: '/bulk-order' },
}

export default function BulkOrderLayout({ children }: { children: React.ReactNode }) {
  return children
}
