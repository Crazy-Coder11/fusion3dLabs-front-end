'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useAdminStore, apiFetch } from '@/store/admin'
import { formatPrice } from '@/lib/products'

interface Product {
  _id: string; name: string; slug: string; tagline?: string; description?: string
  price: number; category: string; material?: string; dimensions?: string
  finish?: string[]; tags?: string[]; images?: string[]; inStock: boolean; featured: boolean; limited: boolean
}

const STORAGE_KEY = 'fusion3d-admin-products'
const LOCAL_TOKEN = 'local-dev-token'

const EMPTY_FORM = {
  name: '', slug: '', tagline: '', description: '', price: '', category: '',
  material: '', dimensions: '', finish: '', tags: '',
  featured: false, limited: false, inStock: true,
}

function compressImage(file: File, maxDim = 1200, quality = 0.82): Promise<string> {
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

function readFilesAsBase64(files: FileList): Promise<string[]> {
  return Promise.all(Array.from(files).map(f => compressImage(f)))
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function uid() {
  return `local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

function loadLocal(): Product[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveLocal(items: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e: any) {
    if (e?.name === 'QuotaExceededError' || e?.code === 22) {
      throw new Error('Storage full — try fewer or smaller images.')
    }
    throw e
  }
}

export default function AdminProductsPage() {
  const { token } = useAdminStore()
  const isLocal = token === LOCAL_TOKEN

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [images, setImages] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [slugLocked, setSlugLocked] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  // true when token is local OR when the backend rejects/is unreachable
  const [localMode, setLocalMode] = useState(isLocal)

  const load = useCallback(async () => {
    setLoading(true)
    if (isLocal) {
      setLocalMode(true)
      setProducts(loadLocal())
      setLoading(false)
      return
    }
    try {
      const data = await apiFetch('/api/products', {}, token!)
      setProducts(data)
    } catch {
      // Backend unavailable or token invalid — fall back to localStorage
      setLocalMode(true)
      setProducts(loadLocal())
    } finally {
      setLoading(false)
    }
  }, [token, isLocal])

  useEffect(() => { if (token) load() }, [load, token])

  const openDrawer = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImages([])
    setSlugLocked(false)
    setError('')
    setDrawerOpen(true)
  }

  const openEditDrawer = (p: Product) => {
    setEditingId(p._id)
    setForm({
      name: p.name,
      slug: p.slug,
      tagline: p.tagline ?? '',
      description: p.description ?? '',
      price: String(p.price),
      category: p.category,
      material: p.material ?? '',
      dimensions: p.dimensions ?? '',
      finish: (p.finish ?? []).join(', '),
      tags: (p.tags ?? []).join(', '),
      featured: p.featured,
      limited: p.limited,
      inStock: p.inStock,
    })
    setImages(p.images ?? [])
    setSlugLocked(true)
    setError('')
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingId(null)
    setImages([])
  }

  const addImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const b64 = await readFilesAsBase64(files)
    setImages(prev => [...prev, ...b64])
  }

  const removeImage = (idx: number) => setImages(prev => prev.filter((_, i) => i !== idx))

  // Close drawer on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const setField = (field: keyof typeof EMPTY_FORM, value: string | boolean) => {
    setForm(f => {
      const next = { ...f, [field]: value }
      if (field === 'name' && !slugLocked) next.slug = slugify(value as string)
      return next
    })
  }

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!form.name || !form.slug || !form.price || !form.category) {
      setError('Name, Slug, Price and Category are required.')
      return
    }
    setSaving(true)
    setError('')

    const isEditing = !!editingId

    const productData = {
      name: form.name,
      slug: form.slug,
      tagline: form.tagline,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      material: form.material,
      dimensions: form.dimensions,
      finish: form.finish.split(',').map(s => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      images,
      featured: form.featured,
      limited: form.limited,
      inStock: form.inStock,
    }

    if (localMode || (isEditing && editingId!.startsWith('local_'))) {
      try {
        const all = loadLocal()
        const updated = isEditing
          ? all.map(p => p._id === editingId ? { ...p, ...productData } : p)
          : [...all, { _id: uid(), ...productData }]
        saveLocal(updated)
        setProducts(updated)
        closeDrawer()
        setSuccessMsg(isEditing ? 'Product updated locally!' : 'Product added locally!')
        setTimeout(() => setSuccessMsg(''), 3000)
      } catch (e: any) {
        setError(e.message ?? 'Failed to save locally.')
      } finally {
        setSaving(false)
      }
      return
    }

    try {
      if (isEditing) {
        await apiFetch(`/api/products/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        }, token!)
      } else {
        await apiFetch('/api/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        }, token!)
      }
      closeDrawer()
      setSuccessMsg(isEditing ? 'Product updated!' : 'Product saved!')
      setTimeout(() => setSuccessMsg(''), 3000)
      load()
    } catch (err: any) {
      const isNetworkError = err instanceof TypeError && err.message.includes('fetch')
      if (isNetworkError) {
        try {
          const all = loadLocal()
          const updated = isEditing
            ? all.map(p => p._id === editingId ? { ...p, ...productData } : p)
            : [...all, { _id: uid(), ...productData }]
          saveLocal(updated)
          setProducts(updated)
          closeDrawer()
          setSuccessMsg(isEditing ? 'Updated locally (backend offline)' : 'Saved locally (backend offline)')
          setTimeout(() => setSuccessMsg(''), 8080)
        } catch (localErr: any) {
          setError(localErr.message ?? 'Failed to save locally.')
        }
      } else {
        setError(err.message || 'Failed to save product.')
      }
    } finally {
      setSaving(false)
    }
  }

  const toggleStock = async (id: string, current: boolean) => {
    if (localMode || id.startsWith('local_')) {
      const updated = loadLocal().map(p => p._id === id ? { ...p, inStock: !current } : p)
      saveLocal(updated)
      setProducts(products.map(p => p._id === id ? { ...p, inStock: !current } : p))
      return
    }
    try {
      const updated = await apiFetch(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify({ inStock: !current }) }, token!)
      setProducts(prev => prev.map(p => p._id === id ? { ...p, inStock: updated.inStock } : p))
    } catch { console.error('toggle stock failed') }
  }

  const del = async (id: string) => {
    if (!confirm('Delete this product permanently?')) return
    if (localMode || id.startsWith('local_')) {
      const updated = loadLocal().filter(p => p._id !== id)
      saveLocal(updated)
      setProducts(updated)
      return
    }
    try {
      await apiFetch(`/api/products/${id}`, { method: 'DELETE' }, token!)
      setProducts(prev => prev.filter(p => p._id !== id))
    } catch { console.error('delete failed') }
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Products</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{products.length} total{localMode ? ' · local storage' : ''}</p>
        </div>
        <button
          onClick={openDrawer}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white rounded-xl text-sm font-medium hover:bg-[var(--accent-2)] transition-all duration-200 hover:shadow-[0_4px_20px_rgba(232,99,10,0.4)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Product
        </button>
      </div>

      {/* Toast */}
      {successMsg && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          {successMsg}
        </div>
      )}

      {/* Product list */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 rounded-2xl shimmer" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <p className="text-[var(--text-muted)] mb-2">No products yet</p>
          <button onClick={openDrawer} className="text-[var(--accent)] text-sm hover:underline">Add your first product →</button>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map(p => (
            <div
              key={p._id}
              className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/20 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-3)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                {p.images && p.images.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-[var(--accent)]/50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--text-primary)] truncate">{p.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{p.category} · {p.material || '—'} · {formatPrice(p.price)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {p.featured && (
                  <span className="text-[9px] uppercase tracking-wider bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
                <button
                  onClick={() => toggleStock(p._id, p.inStock)}
                  className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                    p.inStock ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  }`}
                >
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                </button>
                <button
                  onClick={() => openEditDrawer(p)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors opacity-0 group-hover:opacity-100"
                  title="Edit product"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button
                  onClick={() => del(p._id)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete product"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? 'auto' : 'none' }}
        onClick={closeDrawer}
      />

      {/* Slide-over drawer */}
      <div
        data-testid="product-drawer"
        data-open={drawerOpen}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-[var(--bg)] border-l border-[var(--border)] flex flex-col shadow-2xl"
        style={{
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: drawerOpen ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(.16,1,.3,1), opacity 0.4s cubic-bezier(.16,1,.3,1)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)] flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">{editingId ? 'Edit Product' : 'New Product'}</h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{editingId ? 'Update the product details below' : 'Fill in the details below'}</p>
          </div>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <Section label="Basic Info">
            <Field label="Product Name *">
              <input
                type="text"
                value={form.name}
                onChange={e => setField('name', e.target.value)}
                placeholder="e.g. Fractal Vase No. 3"
                className={inputCls}
              />
            </Field>
            <Field label="URL Slug *" hint="auto-generated · edit to override">
              <div className="relative">
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => { setSlugLocked(true); setField('slug', slugify(e.target.value)) }}
                  placeholder="fractal-vase-no-3"
                  className={inputCls + ' pr-16'}
                />
                {slugLocked && (
                  <button
                    type="button"
                    onClick={() => { setSlugLocked(false); setField('slug', slugify(form.name)) }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-wider text-[var(--accent)] hover:underline"
                  >
                    Auto
                  </button>
                )}
              </div>
            </Field>
            <Field label="Tagline">
              <input
                type="text"
                value={form.tagline}
                onChange={e => setField('tagline', e.target.value)}
                placeholder="Short punchy line"
                className={inputCls}
              />
            </Field>
            <Field label="Description">
              <textarea
                value={form.description}
                onChange={e => setField('description', e.target.value)}
                rows={3}
                placeholder="Detailed description of the product..."
                className={inputCls + ' resize-none'}
              />
            </Field>
          </Section>

          {/* Pricing */}
          <Section label="Pricing & Inventory">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (₹) *">
                <input
                  type="number"
                  value={form.price}
                  onChange={e => setField('price', e.target.value)}
                  placeholder="4999"
                  min="0"
                  className={inputCls}
                />
              </Field>
              <Field label="Category *">
                <input
                  type="text"
                  value={form.category}
                  onChange={e => setField('category', e.target.value)}
                  placeholder="Sculpture"
                  className={inputCls}
                />
              </Field>
            </div>
          </Section>

          {/* Details */}
          <Section label="Product Details">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Material">
                <input
                  type="text"
                  value={form.material}
                  onChange={e => setField('material', e.target.value)}
                  placeholder="PLA+"
                  className={inputCls}
                />
              </Field>
              <Field label="Dimensions">
                <input
                  type="text"
                  value={form.dimensions}
                  onChange={e => setField('dimensions', e.target.value)}
                  placeholder="22×22×40 cm"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Finishes" hint="comma separated">
              <input
                type="text"
                value={form.finish}
                onChange={e => setField('finish', e.target.value)}
                placeholder="Matte Black, Bone White, Metallic"
                className={inputCls}
              />
            </Field>
            <Field label="Tags" hint="comma separated">
              <input
                type="text"
                value={form.tags}
                onChange={e => setField('tags', e.target.value)}
                placeholder="geometric, gift, organic"
                className={inputCls}
              />
            </Field>
          </Section>

          {/* Images */}
          <Section label="Images">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => addImages(e.target.files)}
            />

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); addImages(e.dataTransfer.files) }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 cursor-pointer transition-colors duration-200 ${
                dragOver
                  ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                  : 'border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-3)]'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="text-sm text-[var(--text-muted)]">
                {dragOver ? 'Drop images here' : 'Click or drag images to upload'}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]/50">PNG, JPG, WEBP · multiple allowed</p>
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {images.map((src, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-[var(--border)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`product image ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); removeImage(idx) }}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 text-[9px] uppercase tracking-wider bg-[var(--accent)] text-white px-1.5 py-0.5 rounded-md">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
                {/* Add more button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)]/50 flex items-center justify-center transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
            )}
          </Section>

          {/* Flags */}
          <Section label="Flags">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {([
                ['inStock', 'In Stock'],
                ['featured', 'Featured'],
                ['limited', 'Limited Edition'],
              ] as [keyof typeof EMPTY_FORM, string][]).map(([field, label]) => (
                <label
                  key={field}
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] cursor-pointer select-none"
                  onClick={() => setField(field, !form[field])}
                >
                  <div
                    className={`w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                      form[field]
                        ? 'bg-[var(--accent)] border-[var(--accent)]'
                        : 'bg-[var(--bg-3)] border-[var(--border)] hover:border-[var(--accent)]/50'
                    }`}
                  >
                    {form[field] && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                  {label}
                </label>
              ))}
            </div>
          </Section>
        </div>

        {/* Drawer footer */}
        <div className="px-6 py-4 border-t border-[var(--border)] flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={closeDrawer}
            className="flex-1 py-2.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-2)] transition-all duration-200 disabled:opacity-60 hover:shadow-[0_4px_20px_rgba(232,99,10,0.4)]"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Saving…
              </span>
            ) : editingId ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">{label}</p>
      {children}
    </div>
  )
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
        {label}
        {hint && <span className="normal-case tracking-normal text-[var(--text-muted)]/50 font-normal">· {hint}</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-3.5 py-2.5 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all duration-200'
