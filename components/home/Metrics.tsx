'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const METRICS = [
  { value: 5000, suffix: '+', label: 'Parts', sub: 'printed' },
  { value: 99.4, suffix: '%', label: 'Accuracy', sub: 'tolerance' },
  { value: 350, suffix: '+', label: 'Clients', sub: 'worldwide' },
]

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const start = useCallback(() => {
    if (started) return
    setStarted(true)

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration, started])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start()
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [start])

  return { count, ref }
}

export default function Metrics() {
  return (
    <section className="py-32 lg:py-48 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 reveal-group">
          {METRICS.map((metric, i) => (
            <MetricItem key={i} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricItem({ metric }: { metric: typeof METRICS[0] }) {
  const { count, ref } = useCountUp(metric.value)

  const displayValue = metric.value % 1 !== 0
    ? count.toFixed(1)
    : Math.round(count).toLocaleString()

  return (
    <div ref={ref} className="text-center">
      <p className="text-6xl lg:text-7xl font-black text-primary mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {displayValue}{metric.suffix}
      </p>
      <div className="text-text-secondary text-xs uppercase tracking-[0.3em]">{metric.label}</div>
      <p className="text-text-muted text-xs uppercase tracking-[0.3em]">{metric.sub}</p>
    </div>
  )
}