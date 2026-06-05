<template>
  <div class="font-sans text-wt-ink bg-wt-bg min-h-screen">

    <!-- search header -->
    <section class="bg-wt-ocean text-white px-4 md:px-14 pt-8 pb-9 md:pt-9">
      <div class="max-w-[1180px] mx-auto">
        <h1 class="font-serif text-[26px] md:text-[34px] font-semibold m-0 mb-1 tracking-[-0.5px]">Find your destination</h1>
        <p class="text-[14.5px] md:text-[15.5px] m-0 mb-5 text-white/80">Search welcome scores for black travellers, the diaspora and mixed-race couples.</p>
        <div class="flex items-center gap-3 bg-white rounded-2xl pl-4 pr-1.5 py-1.5 max-w-[620px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="2" stroke-linecap="round" class="flex-shrink-0"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input
            v-model="query"
            placeholder='Try a city or country…'
            class="flex-1 border-0 outline-none bg-transparent text-wt-ink text-[15px] md:text-[16px] py-3"
            @input="onSearch"
          />
          <button v-if="query" @click="query = ''; onSearch()"
            class="bg-wt-line text-wt-sub border-0 rounded-lg w-8 h-8 cursor-pointer text-base flex-shrink-0 flex items-center justify-center font-bold">×</button>
        </div>
      </div>
    </section>

    <!-- controls -->
    <section class="max-w-[1180px] mx-auto px-4 md:px-14 pt-5 pb-0">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <!-- continent filters -->
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="c in continents"
            :key="c"
            @click="selectContinent(c)"
            :class="['border-2 rounded-full px-3.5 py-1.5 font-semibold text-[13px] cursor-pointer transition-all duration-150',
              activeContinent === c ? 'border-wt-coral bg-wt-coral text-white' : 'border-wt-line bg-white text-wt-ink']">
            {{ c }}
          </button>
        </div>
        <!-- sort + count -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <span class="text-[13px] text-wt-sub">
            <strong class="text-wt-ink">{{ store.total }}</strong> {{ store.total === 1 ? 'city' : 'cities' }}<span v-if="query"> for "{{ query }}"</span>
          </span>
          <select v-model="sortBy" @change="resort"
            class="border border-wt-line bg-white rounded-xl px-3 py-2 text-[13.5px] text-wt-ink font-semibold cursor-pointer outline-none">
            <option value="score">Welcome score</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
      </div>
    </section>

    <!-- results -->
    <section class="max-w-[1180px] mx-auto px-4 md:px-14 pb-16">

      <!-- skeleton tiles — initial load only -->
      <div v-if="store.loading && store.cities.length === 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="n in 8" :key="n" class="bg-white rounded-2xl overflow-hidden flex h-24 animate-pulse">
          <div class="w-28 md:w-32 bg-wt-line flex-shrink-0" />
          <div class="flex-1 p-4 flex flex-col justify-between">
            <div class="flex justify-between gap-2">
              <div class="h-4 bg-wt-line rounded w-2/5" />
              <div class="h-4 bg-wt-line rounded w-1/5" />
            </div>
            <div class="h-3 bg-wt-line rounded w-3/4" />
            <div class="h-3 bg-wt-line rounded w-full" />
          </div>
        </div>
      </div>

      <!-- city list -->
      <div v-else-if="sorted.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TransitionGroup name="tile" tag="div" class="contents">
          <RouterLink
            v-for="(city, i) in sorted"
            :key="city.id"
            :to="`/city/${city.slug}`"
            class="no-underline text-inherit group"
          >
            <div
              class="bg-white rounded-2xl overflow-hidden flex h-full transition-all duration-150 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_32px_rgba(42,32,24,.12)] shadow-[0_1px_3px_rgba(42,32,24,0.05)]"
            >
              <!-- thumbnail -->
              <div class="relative w-28 md:w-32 flex-shrink-0">
                <div v-if="city.hero_image_url"
                  class="w-full h-full bg-cover bg-center"
                  :style="`background-image:url(${city.hero_image_url})`" />
                <div v-else class="w-full h-full" :style="`background:${tones[i % tones.length]}22`" />
                <div class="absolute top-2 left-2 bg-white rounded-lg px-1.5 py-1 flex items-center gap-1 shadow-[0_3px_10px_rgba(0,0,0,0.16)]">
                  <span class="w-2 h-2 rounded-full" :style="`background:${scoreColor(parseFloat(city.welcome_score)).main}`" />
                  <strong class="text-sm font-extrabold" :style="`color:${scoreColor(parseFloat(city.welcome_score)).ink}`">
                    {{ parseFloat(city.welcome_score).toFixed(1) }}
                  </strong>
                </div>
              </div>

              <!-- content -->
              <div class="flex-1 px-4 py-3.5 flex flex-col min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <div class="font-serif text-[18px] md:text-[20px] font-semibold truncate">{{ city.name }}</div>
                    <div class="text-[12px] text-wt-sub">{{ city.country }}</div>
                  </div>
                  <span class="font-mono text-[10px] px-2 py-1 rounded-md flex-shrink-0 font-medium"
                    :style="`color:${scoreColor(parseFloat(city.welcome_score)).main};background:${scoreColor(parseFloat(city.welcome_score)).soft}`">
                    {{ scoreLabel(parseFloat(city.welcome_score)) }}
                  </span>
                </div>
                <p class="m-0 mt-1.5 text-[13px] leading-relaxed text-wt-sub flex-1 line-clamp-2">{{ city.description }}</p>
                <div class="flex items-center gap-1.5 text-[12px] text-wt-sub mt-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#e0a52e"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.95l1.1-6.5-4.7-4.6 6.5-.95z"/></svg>
                  {{ city.score_count }} reviews
                  <span class="ml-auto text-wt-coral font-bold inline-flex items-center gap-1">
                    View <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </span>
                </div>
              </div>
            </div>
          </RouterLink>
        </TransitionGroup>
      </div>

      <!-- no results -->
      <div v-else-if="!store.loading" class="text-center py-16">
        <div class="text-[18px] font-bold mb-1.5">No destinations match your search</div>
        <div class="text-[15px] text-wt-sub mb-5">We're adding cities every week. Try a different term or continent.</div>
        <button @click="reset"
          class="bg-wt-coral text-white border-0 rounded-xl px-6 py-3 font-bold text-[15px] cursor-pointer">
          Clear filters
        </button>
      </div>

      <!-- infinite scroll sentinel -->
      <div ref="sentinel" class="h-1 mt-4" />

      <!-- load-more skeleton -->
      <div v-if="store.loadingMore" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div v-for="n in 4" :key="n" class="bg-white rounded-2xl overflow-hidden flex h-24 animate-pulse">
          <div class="w-28 md:w-32 bg-wt-line flex-shrink-0" />
          <div class="flex-1 p-4 flex flex-col justify-between">
            <div class="h-4 bg-wt-line rounded w-2/5" />
            <div class="h-3 bg-wt-line rounded w-3/4" />
            <div class="h-3 bg-wt-line rounded w-full" />
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCitiesStore } from '@/stores/cities'
import { scoreColor, scoreLabel, TONES } from '@/composables/useScore'
import { trackSiteSearch } from '@/composables/useMatomo'
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: 'Explore cities — WeTravel',
  description: 'Search and filter cities worldwide by welcome score for black travellers, mixed-race couples and the African diaspora.',
  canonical: 'https://we-travel.world/search',
}))

const route = useRoute()
const store = useCitiesStore()
const tones = TONES

const query = ref((route.query.q as string) || '')
const activeContinent = ref('All')
const sortBy = ref('score')
const sentinel = ref<HTMLElement | null>(null)

const continents = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Middle East', 'Oceania']

const sorted = computed(() => {
  const list = [...store.cities]
  return sortBy.value === 'name'
    ? list.sort((a, b) => a.name.localeCompare(b.name))
    : list.sort((a, b) => parseFloat(b.welcome_score) - parseFloat(a.welcome_score))
})

let debounceTimer: ReturnType<typeof setTimeout>
function onSearch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    await store.search(query.value, activeContinent.value)
    if (query.value.trim()) {
      const category = activeContinent.value !== 'All' ? activeContinent.value : false
      trackSiteSearch(query.value, category, store.total)
    }
  }, 300)
}

function selectContinent(c: string) {
  activeContinent.value = c
  store.search(query.value, c).then(() => {
    if (query.value.trim()) {
      trackSiteSearch(query.value, c !== 'All' ? c : false, store.total)
    }
  })
}

function resort() {
  // sort is client-side on current page data; no re-fetch needed
}

function reset() {
  query.value = ''
  activeContinent.value = 'All'
  sortBy.value = 'score'
  store.search('', 'All')
}

// IntersectionObserver for infinite scroll
let observer: IntersectionObserver | null = null

function setupObserver() {
  observer?.disconnect()
  if (!sentinel.value) return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && store.hasMore && !store.loadingMore && !store.loading) {
        store.loadMore()
      }
    },
    { rootMargin: '200px' },
  )
  observer.observe(sentinel.value)
}

watch(sentinel, setupObserver)
onUnmounted(() => observer?.disconnect())

onMounted(() => store.search(query.value || '', 'All'))
</script>

<style scoped>
.tile-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.tile-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>
