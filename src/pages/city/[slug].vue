<template>
  <div v-if="store.loading" class="flex justify-center items-center min-h-[50vh]">
    <p class="text-wt-sub">Loading…</p>
  </div>

  <div v-else-if="city" class="font-sans text-wt-ink bg-wt-bg">

    <!-- hero -->
    <section class="px-4 md:px-14">
      <div class="max-w-[1180px] mx-auto relative">
        <div
          class="w-full h-52 sm:h-72 md:h-[340px] rounded-2xl overflow-hidden relative"
          :style="`background:${scoreColor(numScore).main}1f`"
        >
          <img v-if="city.hero_image_url" :src="city.hero_image_url" :alt="city.name"
            class="w-full h-full object-cover" />
          <div v-else class="w-full h-full bg-[rgba(30,110,140,0.12)]" />
          <div class="absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(20,12,6,0)_30%,rgba(20,12,6,0.7))]" />
        </div>

        <!-- back button -->
        <RouterLink to="/search"
          class="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-wt-ink no-underline bg-white/[0.92] rounded-[10px] px-3 py-[7px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
          <span class="hidden sm:inline">All cities</span>
        </RouterLink>

        <!-- city info overlay -->
        <div class="absolute left-4 md:left-7 bottom-4 md:bottom-7 right-4 md:right-7 flex items-end justify-between gap-3 pointer-events-none text-white">
          <div class="min-w-0">
            <div class="font-mono text-[11px] tracking-widest opacity-90 mb-1">{{ city.country.toUpperCase() }}</div>
            <h1 class="font-serif font-semibold m-0 leading-tight text-[32px] sm:text-[42px] md:text-[52px] tracking-[-0.5px] [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">{{ city.name }}</h1>
          </div>
          <!-- score badge — desktop only in hero -->
          <div class="hidden md:flex items-center gap-3.5 pointer-events-auto flex-shrink-0 bg-white/[0.96] rounded-[18px] px-[18px] py-[14px]">
            <WelcomeScore :score="numScore" :size="64" :stroke="7" />
            <div class="whitespace-nowrap">
              <div class="text-xs text-wt-sub font-semibold">Welcome score</div>
              <div class="text-[18px] font-extrabold" :style="`color:${scoreColor(numScore).ink}`">{{ scoreLabel(numScore) }}</div>
              <div class="text-xs text-wt-sub">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#e0a52e" class="inline -mt-0.5 mr-0.5"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.95l1.1-6.5-4.7-4.6 6.5-.95z"/></svg>
                {{ city.score_count }} reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- mobile score badge (below hero) -->
    <div class="md:hidden px-4 pt-4">
      <div class="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm">
        <WelcomeScore :score="numScore" :size="52" :stroke="6" />
        <div>
          <div class="text-xs text-wt-sub font-semibold">Welcome score</div>
          <div class="text-lg font-extrabold" :style="`color:${scoreColor(numScore).ink}`">{{ scoreLabel(numScore) }}</div>
          <div class="text-xs text-wt-sub">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#e0a52e" class="inline -mt-0.5 mr-0.5"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.95l1.1-6.5-4.7-4.6 6.5-.95z"/></svg>
            {{ city.score_count }} reviews
          </div>
        </div>
      </div>
    </div>

    <!-- page body -->
    <div class="max-w-[1180px] mx-auto px-4 md:px-14 pt-6 pb-16 grid grid-cols-1 md:grid-cols-[1fr_372px] gap-10 md:gap-12 items-start">

      <!-- main column -->
      <main>
        <!-- SEO intro -->
        <p class="text-[17px] md:text-[18.5px] leading-relaxed text-wt-ink mb-3">
          <strong>Is {{ city.name }} safe for black travellers?</strong> {{ city.description }}
        </p>
        <p class="text-[15px] leading-relaxed text-wt-sub mb-8">
          Our {{ numScore.toFixed(1) }}/10 welcome score blends editorial research, official data and {{ city.score_count }} reviews from mixed-race couples, black travellers and diasporas who've been to {{ city.name }}.
        </p>

        <!-- booking widget — mobile only (appears early in flow) -->
        <div class="md:hidden mb-8">
          <BookingWidget :city-slug="city.slug" :city-name="city.name" />
          <p class="text-center mt-3 text-xs text-wt-faint">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="inline -mt-0.5 mr-1"><path d="M12 3l7 3v5c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6z"/></svg>
            Every host is vetted as welcoming
          </p>
        </div>

        <!-- score breakdown -->
        <section class="mb-10">
          <div class="font-mono text-[11px] tracking-[1.2px] text-wt-coral uppercase mb-2">The breakdown</div>
          <h2 class="font-serif text-2xl md:text-[27px] font-semibold m-0 mb-4 tracking-[-0.4px]">How welcoming is {{ city.name }}?</h2>
          <div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div class="text-center sm:pr-6 sm:border-r sm:border-wt-line flex-shrink-0">
              <WelcomeScore :score="numScore" :size="88" :stroke="8" />
              <div class="text-sm font-bold mt-2" :style="`color:${scoreColor(numScore).ink}`">{{ scoreLabel(numScore) }}</div>
            </div>
            <div class="flex flex-col gap-3.5 w-full">
              <div class="flex items-center gap-2.5">
                <span class="w-16 md:w-24 text-[13px] text-wt-sub font-medium">Safety</span>
                <div class="flex-1 h-1.5 rounded-full bg-wt-line overflow-hidden">
                  <div :style="`width:${numScore * 10}%;height:100%;background:${scoreColor(numScore).main};border-radius:4px;`" />
                </div>
                <span class="w-7 text-right text-[13.5px] font-bold text-wt-ink tabular-nums">{{ numScore.toFixed(1) }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- reviews (collapsed — shows 1 comment + expand) -->
        <section class="mb-10">
          <div class="font-mono text-[11px] tracking-[1.2px] text-wt-coral uppercase mb-2">Real reviews</div>
          <h2 class="font-serif text-2xl md:text-[27px] font-semibold m-0 mb-4 tracking-[-0.4px]">What travellers say</h2>
          <CommentForm :city-slug="city.slug" class="mb-4" />
          <CommentList :city-slug="city.slug" :collapsed="true" />
        </section>

        <!-- places -->
        <section v-if="city.places?.length" class="mb-10">
          <div class="font-mono text-[11px] tracking-[1.2px] text-wt-coral uppercase mb-2">See it</div>
          <h2 class="font-serif text-2xl md:text-[27px] font-semibold m-0 mb-4 tracking-[-0.4px]">Places in {{ city.name }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <PlaceCard v-for="place in city.places" :key="place.id" :place="place" />
          </div>
        </section>
      </main>

      <!-- sidebar — desktop only -->
      <aside class="hidden md:block sticky top-5">
        <BookingWidget :city-slug="city.slug" :city-name="city.name" />
        <p class="text-center mt-3.5 text-xs text-wt-sub">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="inline -mt-0.5 mr-1"><path d="M12 3l7 3v5c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6z"/></svg>
          Every host is vetted as welcoming
        </p>
      </aside>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCitiesStore } from '@/stores/cities'
import { useSeo } from '@/composables/useSeo'
import { scoreColor, scoreLabel } from '@/composables/useScore'
import WelcomeScore from '@/components/WelcomeScore.vue'
import BookingWidget from '@/components/BookingWidget.vue'
import PlaceCard from '@/components/PlaceCard.vue'
import CommentList from '@/components/CommentList.vue'
import CommentForm from '@/components/CommentForm.vue'

const route = useRoute()
const store = useCitiesStore()
const city = computed(() => store.current)
const numScore = computed(() => city.value ? parseFloat(city.value.welcome_score) : 0)

onMounted(() => store.fetchCity(route.params.slug as string))

useSeo(() => ({
  title: city.value ? `Is ${city.value.name} welcoming for Black travelers? — WeTravel` : 'WeTravel',
  description: city.value?.meta_description ?? city.value?.description ?? '',
  image: city.value?.hero_image_url,
  canonical: `https://we-travel.world/city/${route.params.slug}`,
}))
</script>
