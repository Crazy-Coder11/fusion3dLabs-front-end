'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `*Contact from fusion3dlabs.com*\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-3">Get in touch</p>
          <h1 className="text-5xl font-bold text-[var(--text-primary)] tracking-tight">Start Your Project</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {sent ? (
              <div className="p-8 rounded-2xl bg-[var(--surface)] border border-green-500/30 text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Message sent to WhatsApp</h3>
                <p className="text-sm text-[var(--text-muted)]">We'll get back to you shortly.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-sm text-[var(--accent)] hover:underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: 'name', label: 'Your Name *', placeholder: 'Your name', required: true },
                  { id: 'email', label: 'Email *', placeholder: 'you@example.com', required: true, type: 'email' },
                  { id: 'subject', label: 'Subject *', placeholder: 'Custom order, general question, etc.', required: true },
                ].map(field => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      id={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={form[field.id as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                      className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell us what you're looking for..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[var(--accent)] text-white rounded-full font-medium text-sm hover:bg-[var(--accent-2)] transition-colors"
                >
                  Let's Build Together
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-3">Direct WhatsApp</h3>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors text-sm font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat now on WhatsApp
              </a>
            </div>

            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-3">Response time</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">We typically respond within 2–4 hours during studio hours (10am – 7pm IST, Mon–Sat).</p>
            </div>

            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-3">For bulk or custom projects</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">For corporate gifts, large orders, or fully custom designs, use our dedicated form:</p>
              <a href="/bulk-order" className="text-sm text-[var(--accent)] hover:underline">→ Bulk / Custom Order Form</a>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <h3 className="font-bold text-[var(--text-primary)] mb-2 text-sm">No payment info needed</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">We never ask for payment details over chat or email. All orders are confirmed via WhatsApp before any payment arrangement is made.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
