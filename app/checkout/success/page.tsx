'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

const NEXT_STEPS = [
  {
    num: '01',
    icon: '👥',
    title: 'Team Review',
    desc: 'One of our team members will contact you shortly to confirm your order.',
  },
  {
    num: '02',
    icon: '📦',
    title: 'Shipping Confirmation',
    desc: 'Shipping charges, delivery timelines, and final details will be shared with you.',
  },
  {
    num: '03',
    icon: '🖨️',
    title: 'Production',
    desc: 'Your piece is printed and finished in our studio with care.',
  },
  {
    num: '04',
    icon: '🚚',
    title: 'Delivered',
    desc: 'Shipped with tracking to your door.',
  },
]

function SuccessContent() {
  const params = useSearchParams()
  const orderId = params.get('orderId') || '—'
  const trackingId = params.get('trackingId') || '—'

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center pt-20 pb-24 px-6">
      <div className="max-w-xl w-full">

        {/* Success icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border border-green-500/20 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-3">Success</p>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Order Submitted Successfully
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Thank you for choosing <strong className="text-[var(--text-primary)]">Fusion3D Labs</strong>.<br />
            Our team has received your order request and will reach out to you shortly.
          </p>
        </div>

        {/* Order IDs */}
        <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Order ID</p>
              <p className="font-mono text-sm text-[var(--text-primary)] font-bold">{orderId}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Tracking ID</p>
              <p className="font-mono text-sm text-[var(--accent)] font-bold">{trackingId}</p>
            </div>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-3 pt-3 border-t border-[var(--border)] leading-relaxed">
            💌 A confirmation email has been sent to your email address with your order details and tracking link.
          </p>
        </div>

        {/* Important note */}
        <div className="p-5 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/20 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)] rounded-l-2xl" />
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed pl-3">
            <strong className="text-[var(--text-primary)] block mb-1">Please note:</strong>
            One of our team members will get back to you shortly after placing to confirm the order and discuss shipping charges, delivery timelines, and other details.
          </p>
        </div>

        {/* What happens next */}
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] mb-8">
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-5">What happens next</p>
          <div className="space-y-5">
            {NEXT_STEPS.map((step, i) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-sm">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-[var(--accent)]">{step.num}</span>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{step.title}</p>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                </div>
                {i < NEXT_STEPS.length - 1 && (
                  <div className="absolute left-[52px] mt-8 w-px h-5 bg-[var(--border)]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/track/${trackingId}`}
            id="success-track-btn"
            className="flex-1 py-4 rounded-full bg-[var(--accent)] text-white font-semibold text-sm text-center hover:bg-[var(--accent-2)] transition-all duration-300 shadow-lg shadow-[var(--accent)]/20"
          >
            Track Order →
          </Link>
          <Link
            href="/shop"
            id="success-shop-btn"
            className="flex-1 py-4 rounded-full border border-[var(--border)] text-[var(--text-secondary)] font-medium text-sm text-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-6 leading-relaxed">
          Track your order anytime using ID:{' '}
          <span className="font-mono text-[var(--accent)]">{trackingId}</span>
          <br />No login required.
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)]" />}>
      <SuccessContent />
    </Suspense>
  )
}
