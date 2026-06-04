<template>
  <RouterLink :to="`/city/${city.slug}`" class="no-underline text-inherit block group">
    <div class="bg-white rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_16px_36px_rgba(42,32,24,.14)] shadow-[0_2px_4px_rgba(42,32,24,0.05)]">

      <!-- image -->
      <div class="relative h-48 md:h-52 flex-shrink-0">
        <div
          v-if="city.hero_image_url"
          class="w-full h-full bg-cover bg-center"
          :style="`background-image:url(${city.hero_image_url})`"
        />
        <div v-else class="w-full h-full" :style="`background:${tone}22`" />

        <!-- score badge -->
        <div class="absolute top-3 right-3 bg-white rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.16)]">
          <span class="w-2 h-2 rounded-full flex-shrink-0" :style="`background:${color.main}`" />
          <strong class="text-[17px] font-extrabold" :style="`color:${color.ink}`">{{ numScore.toFixed(1) }}</strong>
          <span class="font-mono text-[10px] text-wt-sub">/10</span>
        </div>

        <!-- city name overlay -->
        <div class="absolute bottom-3 left-4 text-white text-shadow-overlay">
          <div class="font-serif text-[22px] font-semibold leading-tight">{{ city.name }}</div>
          <div class="text-[13px] opacity-95">{{ city.country }}</div>
        </div>
      </div>

      <!-- body -->
      <div class="px-4 py-4 flex flex-col flex-1">
        <span class="font-mono text-[10.5px] font-medium tracking-wide uppercase mb-2 block" :style="`color:${color.main}`">
          {{ scoreLabel(numScore).toUpperCase() }}
        </span>
        <p class="m-0 mb-4 text-[14px] leading-relaxed text-wt-sub flex-1 line-clamp-2">{{ city.description }}</p>
        <span class="text-[14px] text-wt-coral font-bold inline-flex items-center gap-1.5">
          See the full report
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { City } from '@/stores/cities'
import { scoreColor, scoreLabel, TONES } from '@/composables/useScore'

const props = defineProps<{ city: City; index?: number }>()

const numScore = computed(() => parseFloat(props.city.welcome_score))
const color = computed(() => scoreColor(numScore.value))
const tone = computed(() => TONES[(props.index ?? 0) % TONES.length])
</script>
