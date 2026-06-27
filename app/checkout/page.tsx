'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/products'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// ─── Disposable email domain blocklist ───────────────────────────────────────
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','guerrillamail.com','guerrillamail.org','guerrillamail.net',
  'guerrillamail.de','guerrillamail.biz','guerrillamail.info','tempmail.com',
  'temp-mail.org','throwam.com','trashmail.com','trashmail.me','trashmail.net',
  'yopmail.com','sharklasers.com','guerrillamailblock.com','grr.la',
  'spam4.me','dispostable.com','mailnull.com','spamgourmet.com',
  'mytrashmail.com','mailnull.com','filzmail.com','trashmail.io',
  'getnada.com','maildrop.cc','getairmail.com','fakeinbox.com',
  'tempr.email','anonaddy.com','moakt.com','throwam.com',
  'spamevader.com','inboxbear.com','emailondeck.com','spamcanceller.com',
  'trbvm.com','spambe.at','spaml.com','bccto.me','chacuo.net',
  'discard.email','discardmail.com','discardmail.de','einrot.com',
  'example.com','test.com','mailtest.com',
])

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return true
  return DISPOSABLE_DOMAINS.has(domain)
}

function isValidEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  if (isDisposableEmail(email)) return 'Temporary or disposable email addresses are not allowed. Please use your real email.'
  return null
}

function isValidPhone(phone: string): string | null {
  const cleaned = phone.replace(/[\s\-().]/g, '')
  // Must start with + and have 7-15 digits
  if (!/^\+\d{7,15}$/.test(cleaned)) {
    return 'Phone must include country code (e.g. +91 98765 43210) and be 7–15 digits'
  }
  return null
}

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  notes: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  address?: string
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()

  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', address: '', notes: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value })),
    []
  )

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = 'Full name is required (min 2 characters)'
    const emailErr = isValidEmail(form.email.trim())
    if (emailErr) newErrors.email = emailErr
    const phoneErr = isValidPhone(form.phone.trim())
    if (phoneErr) newErrors.phone = phoneErr
    if (!form.address.trim() || form.address.trim().length < 10) newErrors.address = 'Please enter your full delivery address'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center pt-20">
        <div className="text-center px-6">
          <p className="text-5xl mb-4">🛒</p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Nothing to checkout</h1>
          <Link href="/shop" className="text-[var(--accent)] hover:underline">Browse Shop →</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setServerError('')

    const payload = {
      items: items.map(i => ({
        productId: i.id,
        slug: i.slug,
        name: i.name,
        qty: i.quantity,
        price: i.price,
        finish: i.finish,
        image: i.image,
      })),
      customer: {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        notes: form.notes.trim(),
      },
      totalEstimate: total(),
    }

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to place order. Please try again.')
      }

      const data = await res.json()
      clearCart()
      router.push(`/checkout/success?orderId=${data.orderId}&trackingId=${data.trackingId}`)
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  const orderTotal = total()

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2">Final Step</p>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight">Complete Your Order</h1>
          <p className="text-[var(--text-muted)] mt-2 text-sm">No payment required now — our team will confirm details and shipping.</p>
        </div>

        {/* "What Happens Next" card */}
        <div className="mb-10 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--accent)]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[var(--accent)] text-lg">✦</span>
              <h2 className="font-bold text-[var(--text-primary)] tracking-tight">What Happens Next?</h2>
            </div>
            <ul className="space-y-2.5">
              {[
                'Your order request will be reviewed by our team.',
                'One of our team members will contact you shortly to confirm your order.',
                'Shipping charges, delivery timelines, and final confirmation will be shared during the confirmation process.',
                'You will receive order updates via email.',
                'You can track your order at any time using your tracking link.',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--accent)] mt-0.5 text-xs">•</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Form fields */}
            <div className="lg:col-span-2 space-y-5">
              <FormField
                label="Full Name *"
                id="checkout-name"
                value={form.name}
                onChange={set('name')}
                placeholder="Your full name"
                error={errors.name}
              />
              <FormField
                label="Email Address *"
                id="checkout-email"
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="you@gmail.com"
                error={errors.email}
                hint="We'll send your order confirmation and updates here"
              />
              <FormField
                label="Phone Number *"
                id="checkout-phone"
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+91 98765 43210"
                error={errors.phone}
                hint="Include country code (e.g. +91 for India)"
              />
              <div>
                <label htmlFor="checkout-address" className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  Delivery Address *
                </label>
                <textarea
                  id="checkout-address"
                  value={form.address}
                  onChange={set('address')}
                  placeholder="Full delivery address including city, state, and PIN code"
                  rows={3}
                  className={`w-full px-4 py-3 bg-[var(--surface)] border rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors resize-none ${
                    errors.address ? 'border-red-500/60 focus:border-red-500' : 'border-[var(--border)] focus:border-[var(--accent)]'
                  }`}
                />
                {errors.address && <p className="mt-1.5 text-xs text-red-400">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="checkout-notes" className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  Notes (optional)
                </label>
                <textarea
                  id="checkout-notes"
                  value={form.notes}
                  onChange={set('notes')}
                  placeholder="Any special requests, customization notes, or preferred delivery time"
                  rows={2}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
              </div>

              {serverError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                  {serverError}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <h2 className="font-bold text-[var(--text-primary)] mb-4">Order Summary</h2>
                <div className="space-y-2.5 mb-4">
                  {items.map(item => (
                    <div key={`${item.id}-${item.finish}`} className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)] truncate pr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-[var(--text-primary)] font-medium shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[var(--border)] flex justify-between mb-2">
                  <span className="font-semibold text-[var(--text-primary)]">Subtotal</span>
                  <span className="font-bold text-[var(--text-primary)]">{formatPrice(orderTotal)}</span>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] mb-6">
                  + Shipping charges to be confirmed by our team
                </p>

                <button
                  type="submit"
                  id="checkout-submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--accent)] text-white rounded-full font-semibold text-sm hover:bg-[var(--accent-2)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent)]/20"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Placing Order…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      Create Something Amazing
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[var(--text-muted)] text-center mt-3 leading-relaxed">
                  A confirmation email will be sent to you. No payment until confirmed.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── FormField component ──────────────────────────────────────────────────────
function FormField({
  label, id, value, onChange, placeholder, type = 'text', error, hint,
}: {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  error?: string
  hint?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-[var(--surface)] border rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors ${
          error ? 'border-red-500/60 focus:border-red-500' : 'border-[var(--border)] focus:border-[var(--accent)]'
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-[var(--text-muted)]">{hint}</p>}
    </div>
  )
}
