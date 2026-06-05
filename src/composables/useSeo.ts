import { watchEffect, onUnmounted, getCurrentInstance } from 'vue'

interface SeoMeta {
  title: string
  description?: string
  image?: string
  canonical?: string
}

export function useSeo(meta: () => SeoMeta) {
  watchEffect(() => {
    const { title, description, image, canonical } = meta()

    document.title = title

    setMeta('description', description ?? '')
    // Open Graph
    setMeta('og:type', 'website', 'property')
    setMeta('og:title', title, 'property')
    setMeta('og:description', description ?? '', 'property')
    if (image) setMeta('og:image', image, 'property')
    if (canonical) setMeta('og:url', canonical, 'property')
    // Twitter / X
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description ?? '')
    if (image) setMeta('twitter:image', image)

    if (canonical) setLink('canonical', canonical)
  })
}

export function useJsonLd(data: () => Record<string, unknown> | null) {
  const id = 'jsonld-city'

  watchEffect(() => {
    const payload = data()
    let el = document.getElementById(id) as HTMLScriptElement | null

    if (!payload) {
      el?.remove()
      return
    }

    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }

    el.textContent = JSON.stringify(payload)
  })

  if (getCurrentInstance()) {
    onUnmounted(() => document.getElementById(id)?.remove())
  }
}

function setMeta(nameOrProp: string, content: string, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, nameOrProp)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}
