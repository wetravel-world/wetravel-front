import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

export const SUPPORTED_LOCALES = ['en', 'fr'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

const STORAGE_KEY = 'wt-locale'

function detectLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && (SUPPORTED_LOCALES as readonly string[]).includes(saved)) {
    return saved as Locale
  }

  // Browser/location-based: navigator.languages reflects the user's
  // OS + browser locale, which correlates with their region far more
  // reliably (and with zero extra requests) than IP geolocation.
  for (const lang of navigator.languages ?? [navigator.language]) {
    const base = lang.split('-')[0].toLowerCase()
    if ((SUPPORTED_LOCALES as readonly string[]).includes(base)) {
      return base as Locale
    }
  }

  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { en, fr },
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.setAttribute('lang', locale)
}

// Keep <html lang="…"> in sync on initial load too
document.documentElement.setAttribute('lang', i18n.global.locale.value)
