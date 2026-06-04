<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-row sm:flex-col">
    <!-- image -->
    <div class="w-28 sm:w-full h-auto sm:h-36 flex-shrink-0">
      <img v-if="place.image_url" :src="place.image_url" :alt="place.name" loading="lazy"
        class="w-full h-full object-cover min-h-[100px]" />
      <div v-else class="w-full h-full bg-wt-line min-h-[100px]" />
    </div>
    <!-- content -->
    <div class="px-3.5 py-3 sm:p-4 flex flex-col justify-center min-w-0">
      <span class="font-mono text-[10.5px] tracking-wide text-wt-coral uppercase font-medium">{{ place.place_type }}</span>
      <h3 class="font-bold text-[14.5px] sm:text-[15px] text-wt-ink mt-1 mb-1.5 leading-tight">{{ place.name }}</h3>
      <p class="text-[13px] text-wt-sub m-0 leading-snug line-clamp-2">{{ place.description }}</p>
      <p v-if="place.address" class="text-[11.5px] text-wt-faint mt-1.5 mb-0 leading-tight truncate">{{ place.address }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Place } from '@/stores/cities'
defineProps<{ place: Place }>()
</script>
