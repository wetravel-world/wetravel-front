import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/composables/useApi'

export interface City {
  id: number
  name: string
  country: string
  continent: string
  slug: string
  welcome_score: string
  score_count: number
  hero_image_url: string
  description?: string
  meta_description?: string
  places?: Place[]
}

export interface Place {
  id: number
  name: string
  description: string
  place_type: string
  image_url: string
  address: string
}

export const useCitiesStore = defineStore('cities', () => {
  const cities = ref<City[]>([])
  const current = ref<City | null>(null)
  const loading = ref(false)
  const loadingMore = ref(false)
  const total = ref(0)
  const hasMore = ref(false)

  // preserved across loadMore calls
  let _q = ''
  let _continent = ''
  let _page = 1

  async function search(q: string, continent = '') {
    _q = q
    _continent = continent
    _page = 1
    loading.value = true
    hasMore.value = false
    try {
      const params: Record<string, string> = {}
      if (q) params.q = q
      if (continent && continent !== 'All') params.continent = continent
      const { data } = await api.get('/cities/', { params })
      cities.value = data.results ?? data
      total.value = data.count ?? cities.value.length
      hasMore.value = !!data.next
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    if (!hasMore.value || loadingMore.value) return
    _page++
    loadingMore.value = true
    try {
      const params: Record<string, string> = { page: String(_page) }
      if (_q) params.q = _q
      if (_continent && _continent !== 'All') params.continent = _continent
      const { data } = await api.get('/cities/', { params })
      cities.value = [...cities.value, ...(data.results ?? [])]
      total.value = data.count ?? total.value
      hasMore.value = !!data.next
    } finally {
      loadingMore.value = false
    }
  }

  async function fetchCity(slug: string) {
    loading.value = true
    try {
      const { data } = await api.get(`/cities/${slug}/`)
      current.value = data
    } finally {
      loading.value = false
    }
  }

  return { cities, current, loading, loadingMore, total, hasMore, search, loadMore, fetchCity }
})
