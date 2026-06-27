'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  finish: string
  quantity: number
  image?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string, finish: string) => void
  updateQuantity: (id: string, finish: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items
        const existing = items.find(i => i.id === item.id && i.finish === item.finish)
        if (existing) {
          set({ items: items.map(i =>
            i.id === item.id && i.finish === item.finish
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )})
        } else {
          set({ items: [...items, item] })
        }
      },

      removeItem: (id, finish) => {
        set({ items: get().items.filter(i => !(i.id === id && i.finish === finish)) })
      },

      updateQuantity: (id, finish, qty) => {
        if (qty <= 0) {
          get().removeItem(id, finish)
          return
        }
        set({ items: get().items.map(i =>
          i.id === id && i.finish === finish ? { ...i, quantity: qty } : i
        )})
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'fusion3d-cart' }
  )
)
