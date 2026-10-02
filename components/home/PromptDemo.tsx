'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

const PROMPTS = [
  'Generative lattice vase in matte white PLA',
  'Drone chassis prototype in carbon PETG',
  'Parametric architectural scale model',
  'Custom gear assembly with 0.1mm tolerance',
]

export default function PromptDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleSelectPrompt = (prompt: string) => {
    if (isGenerating) return
    setCompleted(false)
    setInputValue('')
    // Typing animation
    let i = 0
    const type = () => {
      if (i <= prompt.length) {
        setInputValue(prompt.slice(0, i))
        i++
        setTimeout(type, 25 + Math.random() * 15)
      }
    }
    type()
  }

  const handleGenerate = () => {
    if (!inputValue.trim() || isGenerating) return
    setIsGenerating(true)
    setProgress(0)
    setCompleted(false)

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 8 + 2
        if (next >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setCompleted(true)
          return 100
        }
        return next
      })
    }, 80)
  }

  return (
    <section className="py-32 lg:py-48 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Prompt visual container - large rounded rectangle */}
          <div
            ref={containerRef}
            className="relative reveal-on-scroll"
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-hero)',
              padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 48px)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Product Preview Area */}
            <div
              className="relative w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center mb-8"
              style={{
                height: '280px',
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
              }}
            >
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4 w-full px-8">
                  {/* Scanning bar animation */}
                  <div className="w-full max-w-xs h-1 bg-bg-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${progress}%`,
                        transition: 'width 80ms linear',
                      }}
                    />
                  </div>
                  <p className="text-text-secondary text-sm font-medium">
                    Slicing layers... {Math.round(progress)}%
                  </p>
                  <p className="text-text-muted text-xs">
                    Layer {Math.round(progress * 4.5)} / 450
                  </p>
                </div>
              ) : completed ? (
                <div className="flex flex-col items-center gap-3 animate-float">
                  <div className="text-5xl">🎉</div>
                  <p className="text-primary text-sm font-semibold">Model Ready</p>
                  <p className="text-text-secondary text-xs">
                    450 layers · 0.1mm resolution · Est. 4h 20m
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="text-5xl">📦</div>
                  <p className="text-text-secondary text-sm">
                    Select a prompt below to start
                  </p>
                </div>
              )}
            </div>

            {/* Prompt Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectPrompt(prompt)}
                  className="pill cursor-pointer hover:border-primary hover:text-primary transition-all duration-200"
                  style={{ fontSize: '12px' }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input + Generate */}
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Describe what you want to create..."
                className="flex-1 px-6 py-4 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={handleGenerate}
                disabled={!inputValue.trim() || isGenerating}
                className="px-6 py-4 bg-primary text-white rounded-xl font-medium hover:bg-highlight-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap arrow-cta"
              >
                Generate
                <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}