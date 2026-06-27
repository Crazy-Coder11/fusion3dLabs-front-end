'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useAdminStore, apiFetch } from '@/store/admin'

type OrderStatus =
  | 'order_placed'
  | 'confirmed'
  | 'preparing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'order_placed',     label: 'Order Placed' },
  { value: 'confirmed',        label: 'Confirmed' },
  { value: 'preparing',        label: 'Preparing' },
  { value: 'packed',           label: 'Packed' },
  { value: 'shipped',          label: 'Shipped' },
  { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'delivered',        label: 'Delivered' },
  { value: 'cancelled',        label: 'Cancelled' },
]

const STATUS_STYLES: Record<OrderStatus, string> = {
  order_placed:     'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  confirmed:        'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  preparing:        'bg-purple-500/15 text-purple-400 border border-purple-500/20',
  packed:           'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20',
  shipped:          'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
  out_for_delivery: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
  delivered:        'bg-green-500/15 text-green-400 border border-green-500/20',
  cancelled:        'bg-red-500/15 text-red-400 border border-red-500/20',
}

interface OrderItem { name: string; finish: string; qty: number; price: number; slug?: string; image?: string }
interface StatusHistoryEntry { status: OrderStatus; note?: string; updatedAt: string }
interface Order {
  _id: string
  orderId: string
  trackingId: string
  status: OrderStatus
  customer: { name: string; email: string; phone: string; address?: string; notes?: string }
  items: OrderItem[]
  totalEstimate: number
  deliveryFee?: number
  adminNotes?: string
  courier?: string
  trackingNumber?: string
  trackingUrl?: string
  statusHistory: StatusHistoryEntry[]
  createdAt: string
}

interface EditState {
  status: OrderStatus
  adminNotes: string
  courier: string
  trackingNumber: string
  trackingUrl: string
  statusNote: string
  deliveryFee: number | ''
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl text-sm font-medium shadow-2xl flex items-center gap-2.5 float-in ${
      type === 'success'
        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
        : 'bg-red-500/20 border border-red-500/30 text-red-400'
    }`}>
      {type === 'success' ? '✓' : '✕'} {message}
    </div>
  )
}

export default function AdminOrdersPage() {
  const { token } = useAdminStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editStates, setEditStates] = useState<Record<string, EditState>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  const load = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter) params.set('status', filter)
      if (search) params.set('search', search)
      const url = `/api/orders?${params.toString()}`
      const data = await apiFetch(url, {}, token)
      setOrders(data.orders || [])
    } catch (e) {
      console.error(e)
      showToast('Failed to load orders', 'error')
    } finally {
      setLoading(false)
    }
  }, [token, filter, search, showToast])

  useEffect(() => { load() }, [load])

  const initEditState = (order: Order): EditState => ({
    status: order.status,
    adminNotes: order.adminNotes || '',
    courier: order.courier || '',
    trackingNumber: order.trackingNumber || '',
    trackingUrl: order.trackingUrl || '',
    statusNote: '',
    deliveryFee: order.deliveryFee ?? '',
  })

  const toggleExpand = (order: Order) => {
    if (expandedId === order._id) {
      setExpandedId(null)
    } else {
      setExpandedId(order._id)
      if (!editStates[order._id]) {
        setEditStates(prev => ({ ...prev, [order._id]: initEditState(order) }))
      }
    }
  }

  const setField = (id: string, field: keyof EditState, value: string | number) => {
    setEditStates(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  const saveOrder = async (order: Order) => {
    const edit = editStates[order._id]
    if (!edit || !token) return
    setSaving(order._id)
    try {
      const updated = await apiFetch(
        `/api/orders/${order._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            status: edit.status,
            adminNotes: edit.adminNotes,
            courier: edit.courier,
            trackingNumber: edit.trackingNumber,
            trackingUrl: edit.trackingUrl,
            statusNote: edit.statusNote,
            deliveryFee: edit.deliveryFee === '' ? undefined : Number(edit.deliveryFee),
          }),
        },
        token
      )
      setOrders(prev => prev.map(o => o._id === order._id ? { ...o, ...updated } : o))
      setEditStates(prev => ({ ...prev, [order._id]: { ...edit, statusNote: '' } }))
      showToast('Order updated — email sent to customer', 'success')
    } catch {
      showToast('Failed to save changes', 'error')
    } finally {
      setSaving(null)
    }
  }

  const totalOrders = orders.length

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {toast && <Toast {...toast} />}

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Orders</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{totalOrders} order{totalOrders !== 1 ? 's' : ''} found</p>
        </div>
        <button
          onClick={load}
          className="px-4 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load()}
          placeholder="Search by order ID, name, email…"
          className="flex-1 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-secondary)] focus:outline-none cursor-pointer min-w-[160px]"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl shimmer" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-24 text-[var(--text-muted)]">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-lg font-semibold text-[var(--text-primary)] mb-2">No orders found</p>
          <p className="text-sm">Try adjusting your filters or search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const isExpanded = expandedId === order._id
            const edit = editStates[order._id]
            const statusLabel = STATUS_OPTIONS.find(s => s.value === order.status)?.label || order.status

            return (
              <div
                key={order._id}
                className={`rounded-2xl bg-[var(--surface)] border transition-all duration-300 ${
                  isExpanded ? 'border-[var(--accent)]/30' : 'border-[var(--border)]'
                }`}
              >
                {/* Order card header */}
                <button
                  onClick={() => toggleExpand(order)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-mono font-bold text-[var(--text-primary)] text-sm">{order.orderId}</p>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">TRK: {order.trackingId}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">
                        {order.customer?.name}
                        {order.customer?.email && <span> · {order.customer.email}</span>}
                        {order.customer?.phone && <span> · {order.customer.phone}</span>}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        {order.items?.map((item, i) => (
                          <span key={i}>{item.name} ×{item.qty}{i < order.items.length - 1 ? ', ' : ''}</span>
                        ))}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold ${STATUS_STYLES[order.status] || ''}`}>
                        {statusLabel}
                      </span>
                      <p className="text-sm font-bold text-[var(--text-primary)]">
                        ₹{(order.totalEstimate + (order.deliveryFee || 0))?.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Expanded detail panel */}
                {isExpanded && edit && (
                  <div className="border-t border-[var(--border)] p-5 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">

                      {/* Status update */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                          Order Status
                        </label>
                        <select
                          value={edit.status}
                          onChange={e => setField(order._id, 'status', e.target.value)}
                          className="w-full px-3 py-2.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
                        >
                          {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </div>

                      {/* Status note */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                          Status Note (sent in email)
                        </label>
                        <input
                          type="text"
                          value={edit.statusNote}
                          onChange={e => setField(order._id, 'statusNote', e.target.value)}
                          placeholder="e.g. Expected delivery in 2–3 days"
                          className="w-full px-3 py-2.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>

                      {/* Courier */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                          Courier Name
                        </label>
                        <input
                          type="text"
                          value={edit.courier}
                          onChange={e => setField(order._id, 'courier', e.target.value)}
                          placeholder="e.g. Delhivery, Blue Dart"
                          className="w-full px-3 py-2.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>

                      {/* Tracking number */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                          Tracking Number
                        </label>
                        <input
                          type="text"
                          value={edit.trackingNumber}
                          onChange={e => setField(order._id, 'trackingNumber', e.target.value)}
                          placeholder="Courier tracking number"
                          className="w-full px-3 py-2.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
                        />
                      </div>

                      {/* Tracking URL — full width */}
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                          Courier Tracking URL
                        </label>
                        <input
                          type="url"
                          value={edit.trackingUrl}
                          onChange={e => setField(order._id, 'trackingUrl', e.target.value)}
                          placeholder="https://courier.com/track/..."
                          className="w-full px-3 py-2.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>

                      {/* Delivery Fee — full width */}
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                          Delivery Fee (₹)
                        </label>
                        <input
                          type="number"
                          value={edit.deliveryFee}
                          onChange={e => setField(order._id, 'deliveryFee', e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="e.g. 150"
                          className="w-full px-3 py-2.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>

                      {/* Admin notes — full width */}
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                          Admin Notes (internal)
                        </label>
                        <textarea
                          value={edit.adminNotes}
                          onChange={e => setField(order._id, 'adminNotes', e.target.value)}
                          placeholder="Internal notes about this order…"
                          rows={2}
                          className="w-full px-3 py-2.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                        />
                      </div>
                    </div>
                    {/* ── Order Items ── */}
                    <div className="rounded-xl bg-[var(--bg-3)] border border-[var(--border)] overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-[var(--border)]">
                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">Order Items</p>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border)]">
                            <th className="text-left px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">Product</th>
                            <th className="text-center px-2 py-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">Qty</th>
                            <th className="text-right px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">Unit Price</th>
                            <th className="text-right px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items?.map((item, i) => (
                            <tr key={i} className="border-b border-[var(--border)]/50 last:border-0">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  {item.image ? (
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[var(--surface)] border border-[var(--border)] shrink-0">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                                      <span className="text-[var(--text-muted)] text-xs">◈</span>
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    {item.slug ? (
                                      <Link href={`/product/${item.slug}`} target="_blank" className="text-[var(--text-primary)] font-medium hover:text-[var(--accent)] transition-colors">
                                        {item.name} ↗
                                      </Link>
                                    ) : (
                                      <p className="text-[var(--text-primary)] font-medium">{item.name}</p>
                                    )}
                                    {item.finish && <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Finish: {item.finish}</p>}
                                  </div>
                                </div>
                              </td>
                              <td className="text-center px-2 py-3 text-[var(--text-secondary)]">×{item.qty}</td>
                              <td className="text-right px-4 py-3 text-[var(--text-secondary)] font-mono text-xs">₹{item.price?.toLocaleString('en-IN')}</td>
                              <td className="text-right px-4 py-3 text-[var(--text-primary)] font-semibold font-mono text-xs">₹{(item.price * item.qty)?.toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-[var(--border)]">
                            <td colSpan={3} className="px-4 py-3 text-right text-xs font-medium text-[var(--text-secondary)]">Product Total</td>
                            <td className="px-4 py-3 text-right text-sm font-bold text-[var(--text-primary)] font-mono">₹{order.totalEstimate?.toLocaleString('en-IN')}</td>
                          </tr>
                          <tr className="border-t border-[var(--border)]/50">
                            <td colSpan={3} className="px-4 py-3 text-right text-xs font-medium text-[var(--text-secondary)]">Delivery Charge</td>
                            <td className="px-4 py-3 text-right text-sm font-semibold text-[var(--text-primary)] font-mono">
                              {order.deliveryFee !== undefined ? `₹${order.deliveryFee.toLocaleString('en-IN')}` : <span className="text-[10px] text-[var(--text-muted)] font-sans">Pending</span>}
                            </td>
                          </tr>
                          <tr className="border-t border-[var(--border)] bg-[var(--bg-3)]">
                            <td colSpan={3} className="px-4 py-3 text-right text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Total</td>
                            <td className="px-4 py-3 text-right text-sm font-bold text-[var(--accent)] font-mono">₹{(order.totalEstimate + (order.deliveryFee || 0))?.toLocaleString('en-IN')}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* ── Customer Details ── */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[var(--bg-3)] border border-[var(--border)]">
                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Customer</p>
                        <p className="text-sm text-[var(--text-primary)] font-medium">{order.customer?.name}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{order.customer?.email}</p>
                        <p className="text-xs text-[var(--text-muted)]">{order.customer?.phone}</p>
                      </div>

                      {/* Delivery address */}
                      {order.customer?.address && (
                        <div className="p-3 rounded-lg bg-[var(--bg-3)] border border-[var(--border)]">
                          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Delivery Address</p>
                          <p className="text-sm text-[var(--text-secondary)]">{order.customer.address}</p>
                        </div>
                      )}
                    </div>

                    {/* Customer Notes */}
                    {order.customer?.notes && (
                      <div className="p-3 rounded-lg bg-[var(--bg-3)] border border-[var(--border)]">
                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Customer Notes</p>
                        <p className="text-sm text-[var(--text-secondary)] italic">{order.customer.notes}</p>
                      </div>
                    )}

                    {/* Status history */}
                    {order.statusHistory?.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">Status History</p>
                        <div className="space-y-1.5">
                          {[...order.statusHistory].reverse().slice(0, 5).map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${STATUS_STYLES[h.status] || 'text-[var(--text-muted)]'}`}>
                                {STATUS_OPTIONS.find(s => s.value === h.status)?.label || h.status}
                              </span>
                              <span className="text-[var(--text-muted)]">
                                {new Date(h.updatedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {h.note && <span className="text-[var(--text-muted)] italic">— {h.note}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Save button */}
                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                      <p className="text-[10px] text-[var(--text-muted)]">
                        💌 Changing status will automatically email the customer
                      </p>
                      <button
                        onClick={() => saveOrder(order)}
                        disabled={saving === order._id}
                        className="px-5 py-2.5 bg-[var(--accent)] text-white rounded-full text-sm font-semibold hover:bg-[var(--accent-2)] transition-colors disabled:opacity-60 flex items-center gap-2"
                      >
                        {saving === order._id ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving…
                          </>
                        ) : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
