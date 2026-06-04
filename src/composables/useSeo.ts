import { watchEffect } from 'vue'

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
    setMeta('og:title', title, 'property')
    setMeta('og:description', description ?? '', 'property')
    if (image) setMeta('og:image', image, 'property')
    if (canonical) setLink('canonical', canonical)
  })
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
