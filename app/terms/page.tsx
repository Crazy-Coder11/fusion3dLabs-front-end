import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service', description: 'Terms of Service for Fusion3D Labs.' }

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight mb-2">Terms of Service</h1>
        <p className="text-[var(--text-muted)] text-sm mb-10">Last updated: June 2025</p>

        {[
          {
            heading: '1. Orders',
            body: 'Submitting an order on this website creates an inquiry, not a binding contract. Orders are confirmed only after direct communication with our team via WhatsApp. We reserve the right to decline any order.',
          },
          {
            heading: '2. Pricing',
            body: 'Prices listed on the website are starting prices and may vary based on finish selection, size, or customization. Final pricing is confirmed during the WhatsApp consultation before production begins.',
          },
          {
            heading: '3. Production & Lead Times',
            body: 'Lead times are provided as estimates and depend on current studio capacity. We will keep you updated via WhatsApp on production progress.',
          },
          {
            heading: '4. Returns & Refunds',
            body: 'As each piece is made to order, we do not accept returns unless the product arrives damaged or defective. Damage claims must be reported with photographic evidence within 48 hours of delivery.',
          },
          {
            heading: '5. Intellectual Property',
            body: 'All designs, models, and visual content on this site are the intellectual property of Fusion3D Labs. Reproduction or resale without written permission is prohibited.',
          },
          {
            heading: '6. Limitation of Liability',
            body: 'Fusion3D Labs is not liable for indirect damages, delays caused by shipping carriers, or issues beyond our reasonable control.',
          },
        ].map(section => (
          <section key={section.heading} className="mb-8">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">{section.heading}</h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
