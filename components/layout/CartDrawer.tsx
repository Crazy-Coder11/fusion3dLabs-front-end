'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCartStore()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeCart])

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-surface text-text-primary shadow-2xl flex flex-col h-full z-10 animate-slide-left border-l border-border"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-text-primary">Your Cart</h2>
              <p className="text-xs text-text-secondary">{itemCount()} {itemCount() === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-bg-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-bg-2 flex items-center justify-center text-text-muted">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="text-base font-semibold text-text-primary">Your cart is empty</p>
              <p className="text-xs text-text-secondary max-w-xs">
                Explore our catalog of custom 3D printed objects and rapid prototyping services.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-primary text-white rounded-full text-xs font-medium hover:bg-highlight-1 transition-colors"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.finish}`}
                className="flex gap-4 p-3.5 rounded-xl bg-bg-2/50 border border-border transition-all"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-bg-3 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="font-medium text-text-primary text-sm hover:text-primary transition-colors truncate"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id, item.finish)}
                      className="text-text-muted hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-text-secondary mb-2">Finish: {item.finish}</p>

                  <div className="flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-border rounded-full bg-surface">
                      <button
                        onClick={() => updateQuantity(item.id, item.finish, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-medium text-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.finish, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-text-primary text-xs"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions if items exist */}
        {items.length > 0 && (
          <div className="p-5 border-t border-border bg-surface-2/40 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-bold text-text-primary text-base">{formatPrice(total())}</span>
              </div>
              <p className="text-[11px] text-text-muted">Taxes & shipping calculated at final confirmation.</p>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-full font-medium text-sm hover:bg-highlight-1 transition-all shadow-md"
              >
                Checkout
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full flex items-center justify-center py-2 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
