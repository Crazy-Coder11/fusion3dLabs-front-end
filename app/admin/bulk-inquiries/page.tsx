'use client'

import { useEffect, useState } from 'react'
import { useAdminStore, apiFetch } from '@/store/admin'

const STATUS_OPTIONS = ['new', 'contacted', 'quoted', 'won', 'lost']
const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-yellow-500/20 text-yellow-400',
  quoted: 'bg-purple-500/20 text-purple-400',
  won: 'bg-green-500/20 text-green-400',
  lost: 'bg-red-500/20 text-red-400',
}

export default function AdminBulkInquiriesPage() {
  const { token } = useAdminStore()
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    apiFetch('/api/bulk-inquiries', {}, token)
      .then(data => setInquiries(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  const updateStatus = async (id: string, status: string) => {
    if (!token) return
    try {
      await apiFetch(`/api/bulk-inquiries/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }, token)
      setInquiries(prev => prev.map(i => i._id === id ? { ...i, status } : i))
    } catch (e) { console.error(e) }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-8">Bulk Inquiries</h1>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl shimmer" />)}</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 text-[var(--text-muted)]">No bulk inquiries yet</div>
      ) : (
        <div className="space-y-3">
          {inquiries.map(inq => (
            <div key={inq._id} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-semibold text-sm text-[var(--text-primary)]">
                    {inq.name}{inq.company ? ` — ${inq.company}` : ''}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{inq.phone} · {inq.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[inq.status] || ''}`}>
                    {inq.status}
                  </span>
                  <select
                    value={inq.status}
                    onChange={e => updateStatus(inq._id, e.target.value)}
                    className="text-xs px-2.5 py-1.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] focus:outline-none cursor-pointer"
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)] space-y-1">
                <p><span className="text-[var(--text-secondary)]">Type:</span> {inq.productType} · <span className="text-[var(--text-secondary)]">Qty:</span> {inq.quantity}</p>
                {inq.deadline && <p><span className="text-[var(--text-secondary)]">Deadline:</span> {inq.deadline}</p>}
                <p><span className="text-[var(--text-secondary)]">Details:</span> {inq.customization}</p>
                {inq.notes && <p><span className="text-[var(--text-secondary)]">Notes:</span> {inq.notes}</p>}
              </div>
              {inq.referenceImages?.length > 0 && (
                <div className="mt-3">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">Reference Images</p>
                  <div className="flex gap-2 flex-wrap">
                    {inq.referenceImages.map((src: string, i: number) => (
                      <a key={i} href={src} target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`ref ${i + 1}`}
                          className="w-16 h-16 rounded-lg object-cover border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-[10px] text-[var(--text-muted)] mt-2">
                {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
