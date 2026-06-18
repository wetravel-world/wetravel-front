<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-wt-panel">
    <div class="px-5 pt-5 pb-0">
      <div class="flex items-center gap-2 mb-1">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18V8M3 12h18a0 0 0 0 1 0 0v6M3 12V9a2 2 0 0 1 2-2h7v5M21 18v-3"/></svg>
        <h2 class="font-serif text-xl font-semibold m-0">Book a vetted stay</h2>
      </div>
      <p class="text-[13px] text-wt-sub m-0 mb-4">Places personally checked as welcoming.</p>
    </div>
    <div class="px-5 pb-5">
      <a
        :href="bookingUrl"
        target="_blank"
        rel="noopener noreferrer"
        @click="trackBookingClick"
        class="block w-full bg-wt-coral text-white rounded-[13px] py-4 font-extrabold text-base text-center no-underline min-h-[52px] flex items-center justify-center"
      >
        Find hotels in {{ cityName }}
      </a>
      <p class="text-[11.5px] text-wt-faint text-center mt-2.5 mb-0">Via our Booking.com partner link</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/composables/useApi'
import { trackBookingClick } from '@/composables/useGoogleAds'

const props = defineProps<{ citySlug: string; cityName: string }>()
const bookingUrl = ref('#')

onMounted(async () => {
  try {
    const { data } = await api.get('/booking/search/', { params: { city: props.citySlug } })
    bookingUrl.value = data.booking_url
  } catch {
    bookingUrl.value = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(props.cityName)}&utm_source=wetravel&utm_medium=city_page&utm_campaign=${props.citySlug}`
  }
})
</script>
