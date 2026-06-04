declare global {
  interface Window {
    _paq: unknown[][]
  }
}

const MATOMO_URL = import.meta.env.VITE_MATOMO_URL as string | undefined
const SITE_ID = import.meta.env.VITE_MATOMO_SITE_ID as string | undefined

export function initMatomo() {
  if (!MATOMO_URL || !SITE_ID) return

  window._paq = window._paq ?? []
  window._paq.push(['enableLinkTracking'])
  window._paq.push(['enableHeartBeatTimer', 15])
  window._paq.push(['setSiteId', SITE_ID])
  window._paq.push(['setTrackerUrl', `${MATOMO_URL}/matomo.php`])

  const script = document.createElement('script')
  script.async = true
  script.src = `${MATOMO_URL}/matomo.js`
  document.head.appendChild(script)
}

export function trackPageView(url: string, title?: string) {
  if (!window._paq) return
  window._paq.push(['setCustomUrl', url])
  if (title) window._paq.push(['setDocumentTitle', title])
  window._paq.push(['trackPageView'])
}

export function trackEvent(category: string, action: string, name?: string, value?: number) {
  if (!window._paq) return
  window._paq.push(['trackEvent', category, action, ...(name ? [name] : []), ...(value !== undefined ? [value] : [])])
}

export function trackSiteSearch(keyword: string, category?: string | false, resultsCount?: number | false) {
  if (!window._paq || !keyword.trim()) return
  window._paq.push(['trackSiteSearch', keyword.trim(), category ?? false, resultsCount ?? false])
}
