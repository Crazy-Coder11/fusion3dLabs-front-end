type AnalyticsValue = string | number | boolean | undefined

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(event: string, parameters: Record<string, AnalyticsValue> = {}) {
  if (typeof window === 'undefined') return
  if (window.gtag) {
    window.gtag('event', event, parameters)
    return
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...parameters })
}
