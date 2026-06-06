<template>
  <div class="min-h-screen bg-wt-bg font-sans">
    <div class="max-w-[1080px] mx-auto px-4 py-8 md:py-12">

      <!-- profile header card -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-wt-line flex flex-wrap gap-5 items-center mb-6">
        <img
          v-if="auth.user?.avatar_url"
          :src="auth.user.avatar_url"
          :alt="auth.user.username"
          class="w-20 h-20 rounded-full object-cover flex-shrink-0"
        />
        <span v-else class="w-20 h-20 rounded-full bg-wt-coral text-white flex items-center justify-center font-extrabold text-3xl flex-shrink-0">
          {{ (auth.user?.username || 'U')[0].toUpperCase() }}
        </span>

        <div class="flex-1 min-w-[180px]">
          <h1 class="font-serif text-[28px] font-semibold text-wt-ink m-0 mb-1 tracking-[-0.4px]">
            {{ auth.user?.username }}
          </h1>
          <div class="text-[14px] text-wt-sub">{{ auth.user?.email }}</div>
          <div class="mt-2 flex items-center gap-1.5 text-[13px] text-wt-sub">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2"/>
            </svg>
            Member of WeTravel
          </div>
        </div>

        <div class="flex gap-2 self-start">
          <RouterLink to="/settings" class="no-underline border border-wt-line bg-white rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-wt-ink hover:bg-wt-bg transition">
            Settings
          </RouterLink>
          <button @click="signOut" class="border border-wt-line bg-white rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-wt-ink hover:bg-wt-bg transition">
            Log out
          </button>
        </div>
      </div>

      <!-- stats -->
      <div class="bg-white rounded-2xl border border-wt-line shadow-sm px-6 py-5 mb-8 flex gap-10 flex-wrap">
        <div class="text-center min-w-[80px]">
          <div class="font-serif text-[32px] font-semibold text-wt-ink leading-none">
            {{ activity ? activity.comment_count : '—' }}
          </div>
          <div class="text-[12.5px] text-wt-sub mt-1.5">Reviews written</div>
        </div>
        <div class="w-px bg-wt-line self-stretch hidden sm:block" />
        <div class="text-center min-w-[80px]">
          <div class="font-serif text-[32px] font-semibold text-wt-ink leading-none">
            {{ activity ? activity.reply_count : '—' }}
          </div>
          <div class="text-[12.5px] text-wt-sub mt-1.5">Replies posted</div>
        </div>
      </div>

      <!-- stamps collection -->
      <template v-if="activity?.commented_cities?.length">
        <h2 class="font-serif text-[22px] font-semibold text-wt-ink mb-4 tracking-[-0.3px]">Stamps collected</h2>
        <div class="bg-white rounded-2xl border border-wt-line shadow-sm px-6 py-5 mb-8">
          <div
            class="flex flex-wrap gap-x-3 gap-y-4 transition-all duration-300"
            :class="stampsExpanded ? '' : 'max-h-[320px] overflow-hidden'"
          >
            <div
              v-for="(city, i) in activity.commented_cities"
              :key="city.slug"
              class="group relative flex flex-col items-center gap-1 cursor-default"
            >
              <img
                :src="`${apiBase}/static/img/stamps/${city.slug}.png`"
                :alt="city.name"
                :style="{ transform: `rotate(${STAMP_TILTS[i % STAMP_TILTS.length]}deg)` }"
                class="w-32 h-32 object-contain transition-transform duration-150 group-hover:scale-110"
              />
              <span class="text-[10.5px] text-wt-sub text-center leading-tight max-w-[128px] truncate">{{ city.name }}</span>
            </div>
          </div>
          <button
            v-if="!stampsExpanded && activity.commented_cities.length > 4"
            @click="stampsExpanded = true"
            class="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-wt-line text-[13.5px] font-semibold text-wt-ink hover:bg-wt-bg transition"
          >
            See all {{ activity.commented_cities.length }} stamps
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </template>

      <!-- commented places -->
      <h2 class="font-serif text-[22px] font-semibold text-wt-ink mb-4 tracking-[-0.3px]">Commented places</h2>

      <!-- loading skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="n in 3" :key="n" class="bg-white rounded-2xl h-56 animate-pulse border border-wt-line" />
      </div>

      <!-- city cards grid -->
      <div v-else-if="activity?.commented_cities?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CityCard
          v-for="(city, i) in activity.commented_cities"
          :key="city.id"
          :city="city"
          :index="i"
        />
      </div>

      <!-- empty state -->
      <div v-else class="bg-white rounded-2xl border border-wt-line shadow-sm px-8 py-12 text-center">
        <svg class="w-10 h-10 text-wt-line mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <p class="text-[15px] font-semibold text-wt-ink mb-1">No reviews yet</p>
        <p class="text-[13.5px] text-wt-sub mb-5">Explore a city and share your experience.</p>
        <RouterLink to="/search" class="inline-flex items-center gap-2 bg-wt-coral text-white rounded-xl px-5 py-2.5 font-bold text-[14px] no-underline">
          Explore cities
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/composables/useApi'
import CityCard from '@/components/CityCard.vue'
import type { City } from '@/stores/cities'

interface Activity {
  comment_count: number
  reply_count: number
  commented_cities: City[]
}

const auth = useAuthStore()
const router = useRouter()
const activity = ref<Activity | null>(null)
const loading = ref(true)
const stampsExpanded = ref(false)
const apiBase = import.meta.env.VITE_API_BASE_URL ?? ''
const STAMP_TILTS = [-4, 3, -2, 5, -3, 2, -6, 4, -1, 3, -5, 2, -3, 4, -2, 1]

onMounted(async () => {
  try {
    const { data } = await api.get('/users/me/activity/')
    activity.value = data
  } finally {
    loading.value = false
  }
})

async function signOut() {
  await auth.logout()
  router.push('/')
}
</script>
