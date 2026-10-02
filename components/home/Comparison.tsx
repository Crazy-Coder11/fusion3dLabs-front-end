'use client'

import { useState } from 'react'

const VIEWS = ['All', 'On Your Own', 'Generic Bureau', 'Fusion3DLabs']

const ROWS = [
  {
    feature: 'Setup Time',
    own: 'Days',
    bureau: 'Hours',
    ours: 'Minutes',
  },
  {
    feature: 'Material Cost',
    own: 'Varies',
    bureau: '$$$',
    ours: '$$',
  },
  {
    feature: 'Surface Quality',
    own: 'Basic',
    bureau: 'Standard',
    ours: 'Premium',
  },
  {
    feature: 'Design Support',
    own: 'None',
    bureau: 'Email',
    ours: 'Dedicated Engineer',
  },
  {
    feature: 'Iteration Speed',
    own: '1-2 weeks',
    bureau: '3-5 days',
    ours: '24-48 hours',
  },
  {
    feature: 'Post Processing',
    own: 'DIY',
    bureau: 'Basic',
    ours: 'Full Studio Finish',
  },
]

export default function ComparisonSection() {
  const [activeView, setActiveView] = useState('All')

  return (
    <section className="py-32 lg:py-48 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 reveal-on-scroll">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Compare Workflows</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight">Which Workflow Fits You?</h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 reveal-on-scroll">
          {VIEWS.map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
              style={{
                background: activeView === view ? 'var(--primary)' : 'transparent',
                color: activeView === view ? '#FFFFFF' : 'var(--text-secondary)',
                border: `1px solid ${activeView === view ? 'var(--primary)' : 'var(--border)'}`,
              }}
            >
              {view}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto reveal-on-scroll">
          <table className="w-full" style={{ borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left text-xs uppercase tracking-widest text-text-secondary px-6 py-5 font-medium">Feature</th>
                {(activeView === 'All' || activeView === 'On Your Own') && (
                  <th className="text-center text-xs uppercase tracking-widest text-text-secondary px-6 py-5 font-medium">On Your Own</th>
                )}
                {(activeView === 'All' || activeView === 'Generic Bureau') && (
                  <th className="text-center text-xs uppercase tracking-widest text-text-secondary px-6 py-5 font-medium">Generic Bureau</th>
                )}
                {(activeView === 'All' || activeView === 'Fusion3DLabs') && (
                  <th className="text-center text-xs uppercase tracking-widest px-6 py-5 font-medium" style={{ color: 'var(--primary)' }}>
                    Fusion3DLabs ✦
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    background: i % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)',
                    transition: 'background 300ms ease',
                  }}
                >
                  <td className="text-left text-text-primary px-6 py-5 font-medium text-sm">
                    {row.feature}
                  </td>
                  {(activeView === 'All' || activeView === 'On Your Own') && (
                    <td className="text-center text-text-secondary px-6 py-5 text-sm">{row.own}</td>
                  )}
                  {(activeView === 'All' || activeView === 'Generic Bureau') && (
                    <td className="text-center text-text-secondary px-6 py-5 text-sm">{row.bureau}</td>
                  )}
                  {(activeView === 'All' || activeView === 'Fusion3DLabs') && (
                    <td className="text-center px-6 py-5 text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                      {row.ours}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}