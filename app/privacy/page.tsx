import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy Policy for Fusion3D Labs.' }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-[var(--text-muted)] text-sm mb-10">Last updated: June 2025</p>

        {[
          {
            heading: '1. Information We Collect',
            body: 'When you place an order or submit an inquiry, we collect your name, phone number, WhatsApp number, email address (if provided), and delivery address. We do not collect payment information — no transactions are processed on this website.',
          },
          {
            heading: '2. How We Use Your Information',
            body: 'We use your contact details solely to confirm orders, coordinate delivery, and respond to inquiries. We do not use your data for advertising or sell it to third parties.',
          },
          {
            heading: '3. WhatsApp Communication',
            body: 'By submitting an order or inquiry via our WhatsApp flow, you consent to receive order-related messages from Fusion3D Labs on WhatsApp. We will not contact you for marketing purposes without your explicit consent.',
          },
          {
            heading: '4. Data Storage',
            body: 'Order data is stored locally on your device (browser localStorage) for order tracking purposes. Contact form and order data sent via WhatsApp is retained only as long as needed to fulfil your order.',
          },
          {
            heading: '5. Your Rights',
            body: 'You may request deletion of any data we hold about you by contacting us on WhatsApp. We will comply within 30 days.',
          },
          {
            heading: '6. Changes to This Policy',
            body: 'We may update this policy periodically. Changes will be posted on this page with the updated date.',
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
