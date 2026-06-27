'use client'

import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/products'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center pt-20">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-3">Your cart is empty</h1>
          <p className="text-[var(--text-muted)] mb-8">Add some objects from the collection to get started.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-white rounded-full font-medium hover:bg-[var(--accent-2)] transition-colors"
          >
            Browse Collection
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2">Ready to order</p>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight">
            Your Cart <span className="text-[var(--text-muted)] font-normal">({itemCount()} items)</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={`${item.id}-${item.finish}`} className="flex gap-4 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl bg-[var(--bg-3)] flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-[var(--accent)]/30" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/product/${item.slug}`} className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors text-sm">
                        {item.name}
                      </Link>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">Finish: {item.finish}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.finish)}
                      className="text-[var(--text-muted)] hover:text-red-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center border border-[var(--border)] rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.finish, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs transition-colors"
                      >−</button>
                      <span className="w-7 text-center text-xs font-medium text-[var(--text-primary)]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.finish, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs transition-colors"
                      >+</button>
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <h2 className="font-bold text-[var(--text-primary)] mb-6 text-lg">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Subtotal</span>
                  <span className="text-[var(--text-primary)] font-medium">{formatPrice(total())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Shipping</span>
                  <span className="text-[var(--text-muted)]">Calculated on confirmation</span>
                </div>
                <div className="pt-3 border-t border-[var(--border)] flex justify-between">
                  <span className="font-semibold text-[var(--text-primary)]">Estimated Total</span>
                  <span className="font-bold text-[var(--text-primary)] text-lg">{formatPrice(total())}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--accent)] text-white rounded-full font-medium text-sm hover:bg-[var(--accent-2)] transition-colors mb-3 shadow-lg shadow-[var(--accent)]/20"
              >
                Proceed to Checkout
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>

              <Link href="/shop" className="w-full flex items-center justify-center py-3 text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] transition-colors">
                Continue Shopping
              </Link>

              <div className="mt-6 p-3 rounded-xl bg-[var(--bg-3)] text-xs text-[var(--text-muted)] text-center leading-relaxed">
                No payment required now. Our team will contact you to confirm your order and arrange delivery.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
