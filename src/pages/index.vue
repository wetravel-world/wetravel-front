<template>
  <div class="font-sans text-wt-ink bg-wt-bg">

    <!-- hero -->
    <section class="max-w-[1300px] mx-auto px-4 md:px-14 pt-8 pb-10 md:pt-9 md:pb-14 grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-10 md:gap-14 items-center">
      <div>
        <div class="inline-flex items-center gap-2 bg-wt-coral-soft rounded-full px-4 py-2 mb-6">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c44e2c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>
          <span class="text-[13px] font-bold text-wt-deep-blue">Travel like you belong everywhere</span>
        </div>
        <span class="hidden lg:block md:block">
          <h1 class="font-semibold leading-[1.1] m-0 mb-6 text-[38px] md:text-[52px] lg:text-[58px] tracking-[-1.2px]">
            Find places where you can
            <span class="text-wt-coral italic">travel safely.</span>
          </h1>
          <p class="text-[16px] md:text-[18px] leading-relaxed text-wt-sub m-0 mb-7 max-w-[480px]">
            Welcome scores and real stories for <b>mixed-race couples, black travellers and diasporas</b> — so every trip feels like it was made for you.
          </p>
        </span>
        <SearchBar @select="goToCity" />
        <div class="flex flex-wrap gap-4 mt-6 text-sm text-wt-sub">
          <span class="inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>
            Real community reviews
          </span>
          <span class="inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>
            Cities worldwide scored
          </span>
          <span class="inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>
            Vetted places to stay
          </span>
        </div>
      </div>

      <!-- photo collage — hidden on mobile -->
      <div class="hidden md:grid grid-cols-2 gap-3.5 [grid-template-rows:15vh_15vh_15vh]">
        <div class="[grid-row:1/span_2] rounded-[20px] overflow-hidden">
          <picture>
            <source srcset="/home/bahamas.webp" type="image/webp" />
            <img src="/home/bahamas.jpg" alt="Bahamas" width="1200" height="900" loading="lazy" decoding="async" class="w-full h-full object-cover block" />
          </picture>
        </div>
        <div class="rounded-[20px] overflow-hidden">
          <picture>
            <source srcset="/home/paris.webp" type="image/webp" />
            <img src="/home/paris.jpg" alt="Paris" width="1200" height="900" loading="lazy" decoding="async" class="w-full h-full object-cover block" />
          </picture>
        </div>
        <div class="[grid-row:2/span_2] rounded-[20px] overflow-hidden">
          <!-- LCP image: high priority, no lazy load, WebP first -->
          <picture>
            <source srcset="/home/rome.webp" type="image/webp" />
            <img src="/home/rome.jpg" alt="Rome" width="1400" height="933" fetchpriority="high" decoding="sync" class="w-full h-full object-cover block" />
          </picture>
        </div>
        <div class="rounded-[20px] overflow-hidden">
          <picture>
            <source srcset="/home/korea.webp" type="image/webp" />
            <img src="/home/korea.jpg" alt="Korea" width="1200" height="802" loading="lazy" decoding="async" class="w-full h-full object-cover block" />
          </picture>
        </div>
      </div>
    </section>

    <!-- trust ribbon -->
    <section class="bg-white border-t border-b border-wt-line">
      <div class="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4">
        <div class="px-4 md:px-7 py-5 flex gap-3.5 items-center">
          <div class="w-10 h-10 rounded-xl bg-wt-coral-soft flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c44e2c" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6z"/></svg>
          </div>
          <div><div class="font-bold text-[14px] md:text-[15px]">Researched</div><div class="text-[12.5px] text-wt-sub">Editorial + official data</div></div>
        </div>
        <div class="px-4 md:px-7 py-5 border-l border-wt-line flex gap-3.5 items-center">
          <div class="w-10 h-10 rounded-xl bg-wt-coral-soft flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#c44e2c"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.95l1.1-6.5-4.7-4.6 6.5-.95z"/></svg>
          </div>
          <div><div class="font-bold text-[14px] md:text-[15px]">Reviewed</div><div class="text-[12.5px] text-wt-sub">By travellers like you</div></div>
        </div>
        <div class="px-4 md:px-7 py-5 border-t md:border-t-0 border-l md:border-l border-wt-line flex gap-3.5 items-center">
          <div class="w-10 h-10 rounded-xl bg-wt-coral-soft flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c44e2c" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.6-7-9.5A3.7 3.7 0 0 1 12 7a3.7 3.7 0 0 1 7 3.5C19 15.4 12 20 12 20z"/></svg>
          </div>
          <div><div class="font-bold text-[14px] md:text-[15px]">For couples</div><div class="text-[12.5px] text-wt-sub">Mixed-race friendly</div></div>
        </div>
        <div class="px-4 md:px-7 py-5 border-t md:border-t-0 border-l border-wt-line flex gap-3.5 items-center">
          <div class="w-10 h-10 rounded-xl bg-wt-coral-soft flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c44e2c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18V8M3 12h18a0 0 0 0 1 0 0v6M3 12V9a2 2 0 0 1 2-2h7v5M21 18v-3"/></svg>
          </div>
          <div><div class="font-bold text-[14px] md:text-[15px]">Stay safe</div><div class="text-[12.5px] text-wt-sub">Vetted places to stay</div></div>
        </div>
      </div>
    </section>

    <!-- featured destinations -->
    <section class="max-w-[1300px] mx-auto px-4 md:px-14 py-12 md:py-16">
      <div class="flex items-end justify-between mb-6 md:mb-7">
        <div>
          <div class="font-mono text-[11.5px] tracking-[1.5px] text-wt-coral uppercase mb-2">Loved by travellers</div>
          <h2 class="font-serif text-[26px] md:text-[36px] font-semibold m-0 tracking-[-0.6px]">Where travellers feel welcome</h2>
        </div>
        <RouterLink to="/search" class="text-[14px] md:text-[15px] text-wt-coral font-bold inline-flex items-center gap-1.5 no-underline flex-shrink-0 ml-4">
          Explore all
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </RouterLink>
      </div>

      <div v-if="store.loading" class="text-center py-10 text-wt-sub">Loading…</div>
      <div v-else-if="featured.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <CityCard v-for="(city, i) in featured" :key="city.id" :city="city" :index="i" />
      </div>
      <p v-else class="text-center text-wt-sub py-10">No cities yet — check back soon.</p>
    </section>

    <!-- stories section -->
    <section id="stories" class="bg-wt-ocean text-white px-4 md:px-14 py-14 md:py-16">
      <div class="max-w-[1180px] mx-auto">
        <div class="font-mono text-[11.5px] tracking-[1.5px] text-wt-peach uppercase mb-2">From the community</div>
        <h2 class="font-serif text-[26px] md:text-[36px] font-semibold m-0 mb-7 md:mb-8 tracking-[-0.6px]">Stories from travellers like you</h2>

        <!-- mobile: horizontal scroll carousel -->
        <div class="md:hidden px-2">
          <div
            ref="carouselRef"
            @scroll.passive="onCarouselScroll"
            class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide mx-[-16px] px-4"
          >
            <div
              v-for="story in stories"
              :key="story.name"
              class="flex-shrink-0 bg-white rounded-2xl p-6 snap-start w-[calc(100vw-48px)]"
            >
              <div class="flex gap-1 mb-3.5">
                <svg v-for="n in 5" :key="n" width="15" height="15" viewBox="0 0 24 24" fill="#e0a52e"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.95l1.1-6.5-4.7-4.6 6.5-.95z"/></svg>
              </div>
              <p class="font-serif text-[17px] leading-snug text-wt-ink m-0 mb-5 font-medium">"{{ story.quote }}"</p>
              <div class="flex items-center gap-3">
                <div class="w-[42px] h-[42px] rounded-full flex-shrink-0" :style="`background:${story.tone}22`" />
                <div>
                  <div class="font-bold text-[14px] text-wt-ink">{{ story.name }}</div>
                  <div class="text-[12.5px] text-wt-sub">{{ story.meta }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- dots -->
          <div class="flex justify-center gap-2 mt-1">
            <button
              v-for="(_, i) in stories"
              :key="i"
              @click="scrollCarouselTo(i)"
              :class="['h-2 rounded-full transition-all duration-200', activeStory === i ? 'w-5 bg-wt-peach' : 'w-2 bg-white/30']"
              :aria-label="`Story ${i + 1}`"
            />
          </div>
        </div>

        <!-- desktop: grid -->
        <div class="hidden md:grid grid-cols-3 gap-5 md:gap-6">
          <div v-for="story in stories" :key="story.name" class="bg-white rounded-2xl p-6 md:p-7">
            <div class="flex gap-1 mb-3.5">
              <svg v-for="n in 5" :key="n" width="15" height="15" viewBox="0 0 24 24" fill="#e0a52e"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.95l1.1-6.5-4.7-4.6 6.5-.95z"/></svg>
            </div>
            <p class="font-serif text-[18.5px] leading-snug text-wt-ink m-0 mb-5 font-medium">"{{ story.quote }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-[42px] h-[42px] rounded-full flex-shrink-0" :style="`background:${story.tone}22`" />
              <div>
                <div class="font-bold text-[14.5px] text-wt-ink">{{ story.name }}</div>
                <div class="text-[12.5px] text-wt-sub">{{ story.meta }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA band -->
    <section class="px-4 md:px-14 py-12 md:py-16">
      <div class="max-w-[1180px] mx-auto rounded-3xl px-6 py-10 md:px-14 md:py-14 relative overflow-hidden bg-[linear-gradient(110deg,#e9663e,#c44e2c)]">
        <div class="absolute right-[-40px] top-[-40px] w-52 h-52 rounded-full pointer-events-none bg-white/[0.12]" />
        <div class="absolute right-[90px] bottom-[-70px] w-44 h-44 rounded-full pointer-events-none bg-white/10" />
        <div class="relative max-w-xl">
          <h2 class="font-serif text-[26px] md:text-[34px] font-semibold text-white m-0 mb-3 tracking-[-0.5px]">Planning a trip? Start with how welcome you'll feel.</h2>
          <p class="text-[15px] md:text-[17px] leading-relaxed m-0 mb-7 text-white/[0.92]">Search any city, read the breakdown, then book a vetted place to stay.</p>
          <RouterLink to="/search" class="inline-flex items-center gap-2.5 bg-white rounded-[13px] px-6 py-4 font-extrabold text-[15px] md:text-[16px] no-underline text-wt-coral-dark">
            Explore destinations
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCitiesStore } from '@/stores/cities'
import { useSeo } from '@/composables/useSeo'
import SearchBar from '@/components/SearchBar.vue'
import CityCard from '@/components/CityCard.vue'

const router = useRouter()
const store = useCitiesStore()

useSeo(() => ({
  title: 'WeTravel — Travel like you belong everywhere',
  description: "Welcome scores and real reviews for mixed-race couples, black travellers and diasporas. Find out how welcome you'll feel in any city.",
  canonical: 'https://we-travel.world/',
}))

onMounted(() => store.search(''))

const featured = computed(() => store.cities.slice(0, 6))

function goToCity(slug: string) {
  router.push(`/city/${slug}`)
}

const stories = [
  { quote: "Accra felt like a homecoming I didn't know I needed. The score was right — pure warmth.", name: 'Kwame O.', meta: 'Solo traveller · Atlanta → Accra', tone: '#e9663e' },
  { quote: "As a mixed couple we always research first. Lisbon scored an 8.6 and it absolutely delivered.", name: 'Sofia & Dani', meta: 'Interracial couple · Lisbon', tone: '#1e6e8c' },
  { quote: "I check WeTravel before every trip now. It's saved me from a few bad calls — and found us great stays.", name: 'Naomi R.', meta: 'Business traveller · Toronto', tone: '#b5567f' },
]

// carousel
const carouselRef = ref<HTMLElement | null>(null)
const activeStory = ref(0)

function onCarouselScroll() {
  const el = carouselRef.value
  if (!el) return
  const cardWidth = el.clientWidth - 16
  activeStory.value = Math.round(el.scrollLeft / (cardWidth + 16))
}

function scrollCarouselTo(i: number) {
  const el = carouselRef.value
  if (!el) return
  const cardWidth = el.clientWidth - 16
  el.scrollTo({ left: i * (cardWidth + 16), behavior: 'smooth' })
}
</script>
