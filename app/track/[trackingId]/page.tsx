'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

type OrderStatus =
  | 'order_placed'
  | 'confirmed'
  | 'preparing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

const STATUS_STEPS: { key: OrderStatus; label: string; icon: string; desc: string }[] = [
  { key: 'order_placed',     label: 'Order Placed',       icon: '📋', desc: 'Your order has been received and is awaiting review.' },
  { key: 'confirmed',        label: 'Confirmed',           icon: '✅', desc: 'Your order has been confirmed by our team.' },
  { key: 'preparing',        label: 'Preparing',           icon: '🔧', desc: 'Your piece is being printed and finished in our studio.' },
  { key: 'packed',           label: 'Packed',              icon: '📦', desc: 'Your order has been carefully packed and is ready for dispatch.' },
  { key: 'shipped',          label: 'Shipped',             icon: '🚚', desc: 'Your package is on its way to you.' },
  { key: 'out_for_delivery', label: 'Out for Delivery',   icon: '🛵', desc: 'Your order is out for delivery today.' },
  { key: 'delivered',        label: 'Delivered',           icon: '🎉', desc: 'Your order has been delivered. Enjoy your piece!' },
]

interface OrderData {
  orderId: string
  trackingId: string
  items: Array<{ name: string; finish: string; qty: number; price: number }>
  customer: { name: string }
  totalEstimate: number
  deliveryFee?: number
  status: OrderStatus | 'cancelled'
  statusHistory: Array<{ status: OrderStatus; note?: string; updatedAt: string }>
  courier?: string
  trackingNumber?: string
  trackingUrl?: string
  createdAt: string
}

interface Props {
  params: Promise<{ trackingId: string }>
}

export default function TrackByIdPage({ params }: Props) {
  const [trackingId, setTrackingId] = useState('')
  const [order, setOrder] = useState<OrderData | null | 'loading'>('loading')

  useEffect(() => {
    params.then(({ trackingId: tid }) => {
      setTrackingId(tid)
      fetch(`${API_BASE}/api/orders/track/${encodeURIComponent(tid)}`, { cache: 'no-store' })
        .then(r => r.ok ? r.json() : null)
        .then(data => setOrder(data))
        .catch(() => setOrder(null))
    })
  }, [params])

  const currentIndex = order && order !== 'loading' && order.status !== 'cancelled'
    ? STATUS_STEPS.findIndex(s => s.key === order.status)
    : -1

  const progressPct = currentIndex >= 0
    ? Math.round(((currentIndex + 1) / STATUS_STEPS.length) * 100)
    : 0

  if (order === 'loading') {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-5xl">🔍</p>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Order Not Found</h1>
        <p className="text-[var(--text-muted)] text-sm max-w-sm">
          No order found for tracking ID <span className="font-mono text-[var(--accent)]">{trackingId}</span>.
          Check your confirmation email for the correct ID.
        </p>
        <Link href="/track" className="text-sm text-[var(--accent)] hover:underline mt-2">
          ← Try again
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <Link href="/track" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-4 inline-block">
            ← Track another order
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2">Live Tracking</p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Your Order</h1>
        </div>

        <div className="space-y-5 float-in">
          {/* Summary card */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Order ID</p>
                <p className="font-mono font-bold text-[var(--text-primary)]">{order.orderId}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Tracking ID</p>
                <p className="font-mono font-bold text-[var(--accent)]">{order.trackingId}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Placed</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            {order.status !== 'cancelled' && (
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] mb-1.5">
                  <span>Progress</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-2 bg-[var(--bg-3)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="border-t border-[var(--border)] pt-4 space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    {item.name} {item.finish && `(${item.finish})`} ×{item.qty}
                  </span>
                  <span className="text-[var(--text-primary)] font-medium">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-medium text-sm pt-2 border-t border-[var(--border)]">
                <span className="text-[var(--text-secondary)]">Product Total</span>
                <span className="text-[var(--text-primary)]">₹{order.totalEstimate.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-medium text-sm pt-2">
                <span className="text-[var(--text-secondary)]">Delivery Charge</span>
                <span className={order.deliveryFee !== undefined ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] text-[10px]"}>
                  {order.deliveryFee !== undefined ? `₹${order.deliveryFee.toLocaleString('en-IN')}` : 'Will be updated shortly'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2 border-t border-[var(--border)] bg-[var(--bg-3)] -mx-6 px-6 pb-4 pt-4 rounded-b-2xl">
                <span className="text-[var(--text-primary)] uppercase tracking-widest text-[10px]">Total</span>
                <span className="text-[var(--accent)] text-lg">
                  {order.deliveryFee !== undefined ? `₹${(order.totalEstimate + order.deliveryFee).toLocaleString('en-IN')}` : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">Order Timeline</p>

            {order.status === 'cancelled' ? (
              <div className="text-center py-6">
                <p className="text-3xl mb-3">❌</p>
                <p className="font-semibold text-red-400">Order Cancelled</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Contact us at{' '}
                  <a href="mailto:support@fusion3dlabs.com" className="text-[var(--accent)] hover:underline">
                    support@fusion3dlabs.com
                  </a>
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {STATUS_STEPS.map((step, i) => {
                  const isComplete = i <= currentIndex
                  const isCurrent = i === currentIndex
                  const isLast = i === STATUS_STEPS.length - 1

                  return (
                    <div key={step.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-base transition-all duration-500 ${
                          isComplete
                            ? 'bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/30'
                            : 'bg-[var(--surface)] border border-[var(--border)]'
                        } ${isCurrent ? 'ring-2 ring-[var(--accent)]/40 ring-offset-2 ring-offset-[var(--bg)]' : ''}`}>
                          {isComplete ? (
                            isCurrent ? step.icon : (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )
                          ) : (
                            <span className="grayscale opacity-40">{step.icon}</span>
                          )}
                        </div>
                        {!isLast && (
                          <div className={`w-px flex-1 min-h-[36px] transition-colors duration-700 ${
                            i < currentIndex ? 'bg-[var(--accent)]/40' : 'bg-[var(--border)]'
                          }`} />
                        )}
                      </div>

                      <div className={`pt-1.5 pb-6 flex-1 ${isLast ? 'pb-0' : ''}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className={`text-sm font-semibold ${isComplete ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <span className="text-[10px] uppercase tracking-widest bg-[var(--accent)]/15 text-[var(--accent)] px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        {isComplete && (
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                        )}
                        {/* Latest note for current status */}
                        {isCurrent && order.statusHistory?.length > 0 && (() => {
                          const lastEntry = [...order.statusHistory].reverse().find(h => h.status === step.key)
                          return lastEntry?.note ? (
                            <p className="text-xs text-[var(--accent)]/80 mt-1 italic">Note: {lastEntry.note}</p>
                          ) : null
                        })()}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Shipping info */}
          {(order.courier || order.trackingNumber) && (
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--accent)]/20">
              <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">Shipping Details</p>
              <div className="grid grid-cols-2 gap-4">
                {order.courier && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Courier</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{order.courier}</p>
                  </div>
                )}
                {order.trackingNumber && (
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] mb-1">Tracking Number</p>
                    <p className="text-sm font-mono text-[var(--accent)]">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--accent)] hover:underline"
                >
                  Track with {order.courier || 'courier'} →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
