'use client'

import { useState } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'

const PROJECT_TYPES = [
  'Rapid Prototyping',
  'Custom 3D Art & Sculpture',
  'Industrial / Mechanical Part',
  'Architectural Scale Model',
  'Bulk / Corporate Order',
  'General Inquiry',
]

const TIMELINES = [
  'Urgent (24 - 48 hours)',
  'Within 1 - 2 weeks',
  'Flexible / Research Phase',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: PROJECT_TYPES[0],
    timeline: TIMELINES[1],
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const text = encodeURIComponent(
      `*New Project Inquiry | Fusion3DLabs*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      (form.phone ? `*Phone:* ${form.phone}\n` : '') +
      `*Project Type:* ${form.projectType}\n` +
      `*Timeline:* ${form.timeline}\n\n` +
      `*Message / Requirements:*\n${form.message}`
    )

    // Open WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
    setSubmitting(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-bg pt-20 sm:pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              Get In Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.15] mb-4">
              Let's Build Something{' '}
              <span className="text-accent-gradient">Extraordinary.</span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Have an engineering challenge, custom art piece, or prototyping project in mind? Connect with our studio engineers directly.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-surface border border-border shadow-sm">
              {sent ? (
                <div className="py-12 px-4 text-center space-y-4 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary tracking-tight">Inquiry Forwarded!</h3>
                  <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                    Your project details were routed to our WhatsApp studio desk. Our engineers typically respond within 2–4 hours during studio hours.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setSent(false)
                        setForm({
                          name: '',
                          email: '',
                          phone: '',
                          projectType: PROJECT_TYPES[0],
                          timeline: TIMELINES[1],
                          message: '',
                        })
                      }}
                      className="px-6 py-2.5 rounded-full bg-bg-2 hover:bg-bg-3 text-text-primary text-xs font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                    <Link
                      href="/shop"
                      className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-highlight-1 transition-colors"
                    >
                      Explore Shop
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-bg-2/50 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-bg-2/50 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                        Phone / WhatsApp <span className="text-text-muted text-[10px] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-bg-2/50 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all"
                      />
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <label htmlFor="timeline" className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                        Target Timeline
                      </label>
                      <select
                        id="timeline"
                        value={form.timeline}
                        onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-bg-2/50 border border-border text-text-primary text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all cursor-pointer"
                      >
                        {TIMELINES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label htmlFor="projectType" className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                      Project Category
                    </label>
                    <select
                      id="projectType"
                      value={form.projectType}
                      onChange={e => setForm(f => ({ ...f, projectType: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-bg-2/50 border border-border text-text-primary text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all cursor-pointer"
                    >
                      {PROJECT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                      Project Requirements & Details <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us about the dimensions, materials (PLA, PETG, Resin, Carbon Fiber), functional needs, or upload details..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-bg-2/50 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all resize-y min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 bg-primary text-white rounded-full font-semibold text-sm hover:bg-highlight-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-primary/20 cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? 'Connecting to WhatsApp...' : 'Send Inquiry to Studio Desk'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>

                  <p className="text-[11px] text-text-muted text-center leading-relaxed">
                    By submitting, your message will open in WhatsApp with our engineering desk for immediate review. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Info & Direct Contact Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Direct Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-surface text-white border border-white/10 shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold">
                    Fastest Response
                  </span>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white">Direct WhatsApp Desk</h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Chat directly with our lead prototyping engineer for real-time file review and quick turnaround estimates.
                </p>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Studio Hours & SLA */}
            <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
              <h4 className="font-bold text-text-primary text-sm uppercase tracking-wider">Studio Details</h4>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary block">Hours & Response</span>
                    <span className="text-text-secondary">Mon – Sat: 10:00 AM – 7:00 PM IST</span>
                    <span className="text-text-muted block text-[11px] mt-0.5">Average reply time: 2–4 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-border/50">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-text-primary block">Studio Hub</span>
                    <span className="text-text-secondary">Bangalore, India — Pan-India Shipping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Have CAD files? Bulk Order Banner */}
            <div className="p-6 rounded-3xl bg-bg-2 border border-border space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Need CAD / Bulk Prototyping?</span>
              <h4 className="font-bold text-text-primary text-base">Have STL, STEP, or OBJ Files?</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Use our dedicated bulk portal for CAD file uploads, multi-part quote requests, and corporate batch orders.
              </p>
              <Link
                href="/bulk-order"
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-highlight-1 transition-colors pt-1"
              >
                Go to Bulk Order Portal
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}