'use client'

import { useEffect, useRef, CSSProperties } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  className?: string
  style?: CSSProperties
  threshold?: number
  once?: boolean
}

function getHidden(dir: Direction): CSSProperties {
  switch (dir) {
    case 'up':    return { opacity: 0, transform: 'translateY(52px) scale(0.97)' }
    case 'down':  return { opacity: 0, transform: 'translateY(-52px) scale(0.97)' }
    case 'left':  return { opacity: 0, transform: 'translateX(52px)' }
    case 'right': return { opacity: 0, transform: 'translateX(-52px)' }
    case 'scale': return { opacity: 0, transform: 'scale(0.88)' }
    case 'fade':  return { opacity: 0 }
  }
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
  threshold = 0.08,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const hidden = getHidden(direction)
    Object.assign(el.style, hidden)
    el.style.transition = `opacity 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms`

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) translateX(0) scale(1)'
          if (once) obs.unobserve(el)
        } else if (!once) {
          Object.assign(el.style, hidden)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, direction, threshold, once])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
