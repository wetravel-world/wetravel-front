<template>
  <div
    v-if="visible"
    class="relative px-4 md:px-14 py-12 md:py-14 overflow-hidden"
  >

<div class="relative max-w-[1300px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">

      <!-- Variant A -->
      <template v-if="variant === 'a'">
        <div>
          <div class="font-mono text-[12px] tracking-[2px] text-wt-sub uppercase mb-4">Ranked by Black travelers · 60+ countries</div>
          <h2 class="text-[36px] md:text-[42px] font-semibold text-wt-ink m-0 leading-[1.1] tracking-[-0.8px] max-w-[620px]">
            The world's <span class="text-wt-coral italic">most racist countries</span><br />
            for Black travelers — ranked by people who actually went there.
          </h2>
        </div>
        <button @click="onCta" class="flex-shrink-0 bg-wt-coral text-white rounded-[13px] px-7 py-5 font-extrabold text-[17px] border-0 cursor-pointer whitespace-nowrap hover:bg-wt-coral-dark transition-colors w-full md:w-auto text-center">
          See the ranking →
        </button>
      </template>

      <!-- Variant B -->
      <template v-else-if="variant === 'b'">
        <div>
          <div class="font-mono text-[12px] tracking-[2px] text-wt-sub uppercase mb-4">Before you book</div>
          <h2 class="text-[36px] md:text-[42px] font-semibold text-wt-ink m-0 leading-[1.1] tracking-[-0.8px] max-w-[620px]">
            Is your destination
            <span class="text-wt-coral italic">on the racist list?</span>
          </h2>
          <p class="text-[17px] text-wt-sub mt-4 mb-0 max-w-[460px] leading-relaxed">
            12,000+ Black travelers rated 60+ countries. The results will surprise you.
          </p>
        </div>
        <button @click="onCta" class="flex-shrink-0 bg-wt-coral text-white rounded-[13px] px-7 py-5 font-extrabold text-[17px] border-0 cursor-pointer whitespace-nowrap hover:bg-wt-coral-dark transition-colors w-full md:w-auto text-center">
          Check any country →
        </button>
      </template>

      <!-- Variant C -->
      <template v-else>
        <div>
          <div class="font-mono text-[12px] tracking-[2px] text-wt-sub uppercase mb-4">Real people. Real scores.</div>
          <h2 class="text-[36px] md:text-[42px] font-semibold text-wt-ink m-0 leading-[1.1] tracking-[-0.8px] max-w-[620px]">
            The <span class="text-wt-coral italic">most racist countries</span><br />in the world —
            according to Black travelers.
          </h2>
          <p class="text-[17px] text-wt-sub mt-4 mb-0 max-w-[460px] leading-relaxed">
            Not governments. Not tourism boards. Real people who've been there.
          </p>
        </div>
        <button @click="onCta" class="flex-shrink-0 bg-wt-coral text-white rounded-[13px] px-7 py-5 font-extrabold text-[17px] border-0 cursor-pointer whitespace-nowrap hover:bg-wt-coral-dark transition-colors w-full md:w-auto text-center">
          See which countries to avoid →
        </button>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { trackEvent } from '@/composables/useMatomo'
import { isAdTraffic } from '@/composables/useGoogleAds'

const STORAGE_KEY = 'wt_ad_hook_variant'

const router = useRouter()
const visible = ref(false)
const variant = ref<'a' | 'b' | 'c'>('a')

const emit = defineEmits<{ (e: 'ad-detected'): void }>()

function pickVariant(): 'a' | 'b' | 'c' {
  const stored = sessionStorage.getItem(STORAGE_KEY) as 'a' | 'b' | 'c' | null
  if (stored) return stored
  const variants: ('a' | 'b' | 'c')[] = ['a', 'b', 'c']
  const picked = variants[Math.floor(Math.random() * 3)]
  sessionStorage.setItem(STORAGE_KEY, picked)
  return picked
}

function onCta() {
  trackEvent('AdHook', 'cta_click', `variant-${variant.value}`)
  router.push('/search')
}

onMounted(() => {
  if (!isAdTraffic()) return

  variant.value = pickVariant()
  visible.value = true
  emit('ad-detected')
  trackEvent('AdHook', 'impression', `variant-${variant.value}`)
})
</script>
