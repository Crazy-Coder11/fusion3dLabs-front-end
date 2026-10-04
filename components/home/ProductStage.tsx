'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function ProductStage() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 899px)').matches) return

    let frame = 0
    const move = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        stage.style.transform = `perspective(1400px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translateZ(0)`
      })
    }
    const reset = () => {
      cancelAnimationFrame(frame)
      stage.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    }

    stage.addEventListener('pointermove', move, { passive: true })
    stage.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <div className="[perspective:1400px]">
      <div
        ref={stageRef}
        className="relative aspect-[3/2] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_45px_100px_-45px_rgba(6,40,23,0.35)] transition-transform duration-500 ease-out will-change-transform"
      >
        <Image
          src="/product-showcase-illustration.jpg"
          alt="Illustrative range of custom 3D printed product categories"
          fill
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06150d]/60 via-transparent to-white/10" />
        <div className="absolute left-5 bottom-5 sm:left-8 sm:bottom-8 max-w-md rounded-2xl border border-white/20 bg-black/25 p-4 sm:p-5 text-white backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-200 mb-2">Illustrative category showcase</p>
          <p className="text-sm sm:text-base leading-relaxed text-white">Idols, car miniatures, personalized pieces, figurines, prototypes and architectural models.</p>
        </div>
      </div>
    </div>
  )
}
