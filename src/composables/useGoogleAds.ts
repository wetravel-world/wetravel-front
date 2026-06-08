declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackConversion(sendTo: string) {
  if (!window.gtag) return
  window.gtag('event', 'conversion', { send_to: sendTo })
}
