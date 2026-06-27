'use client'

import { useState, useRef } from 'react'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

function compressImage(file: File, maxDim = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = e => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = e.target!.result as string
    }
    reader.readAsDataURL(file)
  })
}

export default function BulkOrderPage() {
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '',
    productType: '', quantity: '', customization: '', deadline: '', notes: '',
  })
  const [images, setImages] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const addImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setCompressing(true)
    try {
      const compressed = await Promise.all(Array.from(files).map(f => compressImage(f)))
      setImages(prev => [...prev, ...compressed].slice(0, 5)) // max 5 images
    } finally {
      setCompressing(false)
    }
  }

  const removeImage = (idx: number) => setImages(prev => prev.filter((_, i) => i !== idx))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const payload = { ...form, referenceImages: images }

    // Try to save to backend
    try {
      await fetch(`${API_BASE}/api/bulk-inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(res => { if (!res.ok) throw new Error('API error') })
      
      setSubmitting(false)
      setSent(true)
    } catch {
      setError('Failed to submit inquiry. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-3">Enterprise & Custom Solutions</p>
          <h1 className="text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            Build the Impossible
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl leading-relaxed">
            From high-strength functional prototypes for engineers to bespoke architectural models and custom corporate gifting. If you can imagine it, we can manufacture it.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: '◈', title: 'End-to-End Engineering', desc: 'From a napkin sketch to a production-ready CAD model.' },
            { icon: '⬡', title: 'Scalable Manufacturing', desc: 'From a single prototype to low-volume production runs with significant volume discounts.' },
            { icon: '○', title: 'Premium White-label', desc: 'Your products, your branding, delivered with Apple-level fit and finish.' },
          ].map(b => (
            <div key={b.title} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="text-xl text-[var(--accent)] mb-3">{b.icon}</div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {sent ? (
          <div className="p-10 rounded-2xl bg-[var(--surface)] border border-green-500/30 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Inquiry sent!</h3>
            <p className="text-[var(--text-muted)] text-sm mb-4">
              Our team will review your inquiry and get back to you within 24 hours.
            </p>
            <button onClick={() => { setSent(false); setImages([]) }} className="text-sm text-[var(--accent)] hover:underline">
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <h2 className="font-bold text-[var(--text-primary)] text-lg">Tell us about your project</h2>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name *" id="name" value={form.name} onChange={set('name')} required placeholder="Your name" />
              <Field label="Company / Brand" id="company" value={form.company} onChange={set('company')} placeholder="Optional" />
              <Field label="Phone *" id="phone" value={form.phone} onChange={set('phone')} required placeholder="+91 98765 43210" type="tel" />
              <Field label="Email *" id="email" value={form.email} onChange={set('email')} required placeholder="you@company.com" type="email" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="productType" className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Product Type *</label>
                <select
                  id="productType"
                  required
                  value={form.productType}
                  onChange={set('productType')}
                  className="w-full px-4 py-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  <option value="">Select a category</option>
                  <option>Sculpture / Art piece</option>
                  <option>Decor item</option>
                  <option>Desk accessory</option>
                  <option>Corporate gift</option>
                  <option>Event installation</option>
                  <option>Fully custom / Other</option>
                </select>
              </div>
              <Field label="Quantity Needed *" id="quantity" value={form.quantity} onChange={set('quantity')} required placeholder="e.g. 50 units" />
            </div>

            <Field label="Deadline (if any)" id="deadline" value={form.deadline} onChange={set('deadline')} placeholder="e.g. By 15 August 2025" />

            <div>
              <label htmlFor="customization" className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Customization Details *</label>
              <textarea
                id="customization"
                required
                rows={4}
                value={form.customization}
                onChange={set('customization')}
                placeholder="Describe what you need — dimensions, finish, logo placement, custom design brief, etc."
                className="w-full px-4 py-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">Additional Notes</label>
              <textarea
                id="notes"
                rows={2}
                value={form.notes}
                onChange={set('notes')}
                placeholder="Budget range, packaging requirements, delivery location..."
                className="w-full px-4 py-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              />
            </div>

            {/* Reference Images Upload */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
                Reference Images <span className="normal-case tracking-normal font-normal text-[var(--text-muted)]/60">· optional · up to 5</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => addImages(e.target.files)}
              />

              {images.length < 5 && (
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); addImages(e.dataTransfer.files) }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-7 cursor-pointer transition-colors duration-200 ${
                    dragOver
                      ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                      : 'border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-3)]'
                  }`}
                >
                  {compressing ? (
                    <svg className="animate-spin text-[var(--accent)]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  )}
                  <p className="text-sm text-[var(--text-muted)]">
                    {compressing ? 'Compressing…' : dragOver ? 'Drop images here' : 'Click or drag to upload reference images'}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]/50">PNG, JPG, WEBP · max 5 images</p>
                </div>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {images.map((src, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-[var(--border)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={`reference ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)]/50 flex items-center justify-center transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || compressing}
              className="w-full py-4 bg-[var(--accent)] text-white rounded-full font-medium hover:bg-[var(--accent-2)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-[var(--accent)]/20"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Sending…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Let's Build Together
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({ label, id, value, onChange, required, placeholder, type = 'text' }: {
  label: string; id: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">{label}</label>
      <input
        type={type} id={id} value={value} onChange={onChange}
        required={required} placeholder={placeholder}
        className="w-full px-4 py-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
      />
    </div>
  )
}
