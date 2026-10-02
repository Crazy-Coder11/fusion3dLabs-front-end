'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // If reduced motion is requested, immediately reveal all elements
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(
        '.reveal-on-scroll, .reveal-scale, .reveal-left, .reveal-right, .reveal-group'
      ).forEach(el => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const observeElements = () => {
      const targets = document.querySelectorAll(
        '.reveal-on-scroll:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-left:not(.is-revealed), .reveal-right:not(.is-revealed), .reveal-group:not(.is-revealed)'
      )
      targets.forEach(target => {
        // If element is already in viewport on mount, reveal immediately
        const rect = target.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          target.classList.add('is-revealed')
        } else {
          observer.observe(target)
        }
      })
    }

    // Initial pass
    observeElements()

    // Pass after slight delay for dynamically rendered / hydrated children
    const timer = setTimeout(observeElements, 120)

    // Mutation observer to capture client-rendered updates
    const mutationObs = new MutationObserver(() => {
      observeElements()
    })
    mutationObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      mutationObs.disconnect()
    }
  }, [pathname])

  return <>{children}</>
}
