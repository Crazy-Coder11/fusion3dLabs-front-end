'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SplitRevealProps {
  text: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  className?: string
  delay?: number
  scrub?: boolean | number
  start?: string
  end?: string
  stagger?: number
}

export default function SplitReveal({
  text,
  tag: Tag = 'div',
  className,
  delay = 0,
  scrub = false,
  start = 'top 88%',
  end = 'bottom 30%',
  stagger = 0.055,
}: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const words = containerRef.current?.querySelectorAll<HTMLElement>('.sr-word')
    if (!words?.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: '115%', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: scrub ? 0.015 : stagger,
          duration: scrub ? 1 : 0.85,
          ease: scrub ? 'none' : 'power4.out',
          delay: delay / 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub: scrub || false,
            toggleActions: scrub ? undefined : 'play none none none',
          },
        }
      )
    }, containerRef)

    return () => {
      try { ctx.revert() } catch (_) {}
    }
  }, [delay, scrub, start, end, stagger])

  const words = text.split(' ')

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 'inherit' }}
        >
          <span className="sr-word" style={{ display: 'inline-block' }}>
            {word}
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
