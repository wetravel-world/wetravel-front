declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const ADS_ID = 'AW-18219477717'

export function isAdTraffic(): boolean {
  const params = new URLSearchParams(window.location.search)
  return params.has('gclid') || params.has('gad_source')
}

// Conversion labels — replace REPLACE_WITH_* with the label from Google Ads > Conversions
const CONVERSIONS = {
  registration: `${ADS_ID}/3t5yCNKBgbscENXV3O9D`,
  bookingClick: `${ADS_ID}/REPLACE_WITH_BOOKING_LABEL`,
}

export function trackConversion(sendTo: string) {
  if (!window.gtag) return
  window.gtag('event', 'conversion', { send_to: sendTo })
}

export function trackPageview() {
  if (!window.gtag) return
  window.gtag('config', ADS_ID, { page_path: window.location.pathname })
}
export function trackRegistration() { trackConversion(CONVERSIONS.registration) }
export function trackBookingClick() { trackConversion(CONVERSIONS.bookingClick) }
