<template>
  <div class="relative max-w-[560px] w-full">
    <div
      class="flex items-center gap-3 bg-white rounded-[15px] pl-[18px] pr-1.5 py-1.5 transition-shadow duration-[180ms]"
      :class="open ? 'shadow-wt-search-open' : 'shadow-wt-search'"
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="2" stroke-linecap="round" class="flex-shrink-0">
        <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
      </svg>
      <input
        v-model="query"
        placeholder="Search for a city..."
        class="flex-1 border-0 outline-none bg-transparent text-[16.5px] text-wt-ink py-3.5"
        @input="onInput"
        @focus="open = true"
        @keydown.enter.prevent="submitSearch"
      />

      <!-- Mobile -->
      <button @click="submitSearch" class="bg-wt-coral text-white border-0 rounded-[11px] px-[22px] py-[13px] font-sans font-bold text-[15px] cursor-pointer flex-shrink-0 ml-[-6vw]">
        Check city
      </button>
    </div>

    <div v-if="open && (suggestions.length || query.length >= 2)" class="absolute top-[calc(100%+10px)] left-0 right-0 z-30 bg-white rounded-[15px] shadow-wt-dropdown p-[7px] text-left">
      <div class="font-mono text-[10.5px] tracking-[1px] text-wt-faint px-[11px] pt-[7px] pb-[5px] uppercase">
        {{ query ? suggestions.length + ' destinations' : 'Popular right now' }}
      </div>
      <button
        v-for="(city, i) in suggestions"
        :key="city.id"
        @click="select(city)"
        class="flex w-full items-center gap-[13px] px-[11px] py-[9px] border-0 bg-transparent rounded-[11px] cursor-pointer text-left hover:bg-[#faf3ea] transition-colors"
      >
        <div class="w-11 h-11 rounded-[10px] flex-shrink-0" :style="`background:${tones[i % tones.length]}22`" />
        <span class="flex-1">
          <span class="block font-bold text-[15.5px] text-wt-ink">{{ city.name }}</span>
          <span class="block text-[12.5px] text-wt-sub">{{ city.country }}</span>
        </span>
        <ScoreChip :score="parseFloat(city.welcome_score)" />
      </button>
      <div v-if="query.length >= 2 && !suggestions.length" class="px-3 py-4 text-wt-sub text-[14px]">
        No cities match "{{ query }}" yet.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/composables/useApi'
import type { City } from '@/stores/cities'
import { scoreColor, TONES } from '@/composables/useScore'
import ScoreChip from './ScoreChip.vue'
import { trackSiteSearch } from '@/composables/useMatomo'

const emit = defineEmits<{ select: [slug: string] }>()

defineProps<{ placeholder?: string; autoFocus?: boolean }>()

const query = ref('')
const suggestions = ref<City[]>([])
const open = ref(false)
const router = useRouter()
const tones = TONES
let debounceTimer: ReturnType<typeof setTimeout>

async function onInput() {
  open.value = true
  clearTimeout(debounceTimer)
  if (query.value.length < 2) { suggestions.value = []; return }
  debounceTimer = setTimeout(async () => {
    try {
      const { data } = await api.get('/cities/', { params: { q: query.value } })
      suggestions.value = (data.results ?? data).slice(0, 6)
    } catch {
      suggestions.value = []
    }
  }, 300)
}

function select(city: City) {
  trackSiteSearch(query.value, false, suggestions.value.length)
  open.value = false
  query.value = ''
  suggestions.value = []
  emit('select', city.slug)
}

function submitSearch() {
  open.value = false
  if (query.value.trim()) {
    trackSiteSearch(query.value, false, suggestions.value.length)
    suggestions.value = []
    router.push({ path: '/search', query: { q: query.value } })
  } else {
    suggestions.value = []
    router.push('/search')
  }
}
</script>
