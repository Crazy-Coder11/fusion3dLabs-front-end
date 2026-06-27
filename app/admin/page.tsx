'use client'

import { useEffect, useState } from 'react'
import { useAdminStore, apiFetch } from '@/store/admin'

interface Stats {
  orders: { total: number; pending: number; in_production: number }
  inquiries: number
}

export default function AdminDashboard() {
  const { token } = useAdminStore()
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])

  useEffect(() => {
    if (!token) return
    Promise.all([
      apiFetch('/api/orders?limit=5', {}, token),
      apiFetch('/api/bulk-inquiries', {}, token),
    ]).then(([ordersData, inquiries]) => {
      setRecentOrders(ordersData.orders || [])
      const orders = ordersData.orders || []
      setStats({
        orders: {
          total: ordersData.total || 0,
          pending: orders.filter((o: any) => o.status === 'order_placed').length,
          in_production: orders.filter((o: any) => o.status === 'preparing').length,
        },
        inquiries: inquiries.length,
      })
    }).catch(console.error)
  }, [token])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Fusion3D Labs overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: stats?.orders.total ?? '—' },
          { label: 'Pending', value: stats?.orders.pending ?? '—', accent: true },
          { label: 'In Production', value: stats?.orders.in_production ?? '—' },
          { label: 'Bulk Inquiries', value: stats?.inquiries ?? '—' },
        ].map(stat => (
          <div key={stat.label} className={`p-5 rounded-2xl border ${stat.accent ? 'bg-[var(--accent)]/10 border-[var(--accent)]/30' : 'bg-[var(--surface)] border-[var(--border)]'}`}>
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.accent ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="p-5 border-b border-[var(--border)]">
          <h2 className="font-bold text-[var(--text-primary)]">Recent Orders</h2>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-[var(--text-muted)] text-sm">No orders yet</div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {recentOrders.map((order: any) => (
              <div key={order._id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono font-semibold text-[var(--text-primary)]">{order.orderId}</p>
                  <p className="text-xs text-[var(--text-muted)]">{order.customer?.name} — ₹{order.totalEstimate?.toLocaleString('en-IN')}</p>
                </div>
                <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium ${
                  order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                  order.status === 'order_placed' ? 'bg-[var(--accent)]/20 text-[var(--accent)]' :
                  'bg-[var(--surface-2)] text-[var(--text-muted)]'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
