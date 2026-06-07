<template>
  <div v-if="store.loading" class="flex justify-center items-center min-h-[50vh]">
    <p class="text-wt-sub">Loading…</p>
  </div>

  <div v-else-if="country" class="font-sans text-wt-ink bg-wt-bg">

    <!-- hero -->
    <section class="px-4 md:px-14">
      <div class="max-w-[1180px] mx-auto relative">
        <div
          class="w-full h-44 sm:h-56 md:h-64 rounded-2xl overflow-hidden relative flex items-end"
          :style="`background:${scoreColor(numScore).main}1f`"
        >
          <img
            v-if="country.hero_image_url"
            :src="heroUrl(country.hero_image_url, 1200)"
            :srcset="heroSrcset(country.hero_image_url)"
            sizes="(min-width: 1180px) 1180px, 100vw"
            :alt="country.country"
            class="w-full h-full object-cover"
            fetchpriority="high"
            decoding="sync"
            width="1180"
            height="256"
          />
          <div class="absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(20,12,6,0)_30%,rgba(20,12,6,0.55))]" />
        </div>

        <!-- back button -->
        <RouterLink to="/search"
          class="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-wt-ink no-underline bg-white/[0.92] rounded-[10px] px-3 py-[7px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
          <span class="hidden sm:inline">All cities</span>
        </RouterLink>

        <!-- country info overlay -->
        <div class="absolute left-4 md:left-7 bottom-4 md:bottom-7 right-4 md:right-7 flex items-end justify-between gap-3 pointer-events-none text-white">
          <div class="min-w-0">
            <div class="font-mono text-[11px] tracking-widest opacity-90 mb-1">{{ country.city_count }} {{ country.city_count === 1 ? 'CITY' : 'CITIES' }}</div>
            <h1 class="font-serif font-semibold m-0 leading-tight text-[32px] sm:text-[42px] md:text-[52px] tracking-[-0.5px] [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">{{ country.country }}</h1>
          </div>
          <!-- average score badge — desktop only in hero -->
          <div v-if="country.average_score !== null" class="hidden md:flex items-center gap-3.5 pointer-events-auto flex-shrink-0 bg-white/[0.96] rounded-[18px] px-[18px] py-[14px]">
            <WelcomeScore :score="numScore" :size="64" :stroke="7" />
            <div class="whitespace-nowrap">
              <div class="text-xs text-wt-sub font-semibold">Average welcome score</div>
              <div class="text-[18px] font-extrabold" :style="`color:${scoreColor(numScore).ink}`">{{ scoreLabel(numScore) }}</div>
              <div class="text-xs text-wt-sub">across {{ country.city_count }} {{ country.city_count === 1 ? 'city' : 'cities' }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- mobile average score badge (below hero) -->
    <div v-if="country.average_score !== null" class="md:hidden px-4 pt-4">
      <div class="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm">
        <WelcomeScore :score="numScore" :size="52" :stroke="6" />
        <div>
          <div class="text-xs text-wt-sub font-semibold">Average welcome score</div>
          <div class="text-lg font-extrabold" :style="`color:${scoreColor(numScore).ink}`">{{ scoreLabel(numScore) }}</div>
          <div class="text-xs text-wt-sub">across {{ country.city_count }} {{ country.city_count === 1 ? 'city' : 'cities' }}</div>
        </div>
      </div>
    </div>

    <!-- page body -->
    <div class="max-w-[1180px] mx-auto px-4 md:px-14 pt-6 pb-16">

      <!-- SEO intro -->
      <p class="text-[17px] md:text-[18.5px] leading-relaxed text-wt-ink mb-3">
        <strong>Is {{ country.country }} safe for black travellers?</strong> {{ country.description }}
      </p>
      <p v-if="country.average_score !== null" class="text-[15px] leading-relaxed text-wt-sub mb-8">
        Across the {{ country.city_count }} {{ country.city_count === 1 ? 'city' : 'cities' }} we cover in {{ country.country }}, the average welcome score is {{ numScore.toFixed(1) }}/10 — blending editorial research, official data and reviews from mixed-race couples, black travellers and travelers of color.
      </p>

      <!-- cities -->
      <section>
        <div class="font-mono text-[11px] tracking-[1.2px] text-wt-coral uppercase mb-2">Explore</div>
        <h2 class="font-serif text-2xl md:text-[27px] font-semibold m-0 mb-4 tracking-[-0.4px]">Cities in {{ country.country }}</h2>
        <div v-if="country.cities.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CityCard v-for="(city, i) in country.cities" :key="city.id" :city="city" :index="i" />
        </div>
        <p v-else class="text-[14px] text-wt-sub">No cities listed for {{ country.country }} yet.</p>
      </section>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCitiesStore } from '@/stores/cities'
import { useSeo, useJsonLd } from '@/composables/useSeo'
import { scoreColor, scoreLabel } from '@/composables/useScore'
import WelcomeScore from '@/components/WelcomeScore.vue'
import CityCard from '@/components/CityCard.vue'

const route = useRoute()
const store = useCitiesStore()
const country = computed(() => store.currentCountry)
const numScore = computed(() => country.value?.average_score != null ? Number(country.value.average_score) : 0)

function heroUrl(url: string, w: number): string {
  if (!url?.includes('images.unsplash.com')) return url
  try {
    const u = new URL(url)
    u.searchParams.set('fm', 'webp')
    u.searchParams.set('q', '80')
    u.searchParams.set('w', String(w))
    return u.toString()
  } catch { return url }
}

function heroSrcset(url: string): string | undefined {
  if (!url?.includes('images.unsplash.com')) return undefined
  try {
    return [480, 800, 1200].map(w => `${heroUrl(url, w)} ${w}w`).join(', ')
  } catch { return undefined }
}

onMounted(() => store.fetchCountry(route.params.slug as string))

useSeo(() => ({
  title: country.value ? `Is ${country.value.country} welcoming for Black travelers? — WeTravel` : 'WeTravel',
  description: country.value?.description ?? '',
  canonical: `https://we-travel.world/country/${route.params.slug}`,
}))

useJsonLd(() => {
  if (!country.value) return null
  const c = country.value
  return {
    '@context': 'https://schema.org',
    '@type': 'Country',
    name: c.country,
    description: c.description,
    url: `https://we-travel.world/country/${c.slug}`,
    ...(c.hero_image_url ? { image: c.hero_image_url } : {}),
    ...(c.average_score !== null ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Number(c.average_score).toFixed(1),
        bestRating: '10',
        worstRating: '1',
        ratingCount: c.city_count,
      },
    } : {}),
  }
})
</script>
