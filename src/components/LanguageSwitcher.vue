<template>
  <div class="relative" ref="rootRef">
    <button
      @click="open = !open"
      class="flex items-center gap-1.5 text-[13px] font-semibold text-wt-sub hover:text-wt-ink transition-colors px-2 py-1.5 rounded-lg"
      :aria-label="t('language.label')"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span class="uppercase">{{ locale }}</span>
    </button>

    <div v-if="open" class="absolute right-0 top-full mt-2 w-36 bg-white rounded-2xl shadow-lg border border-wt-line py-1.5 z-50">
      <button
        v-for="code in SUPPORTED_LOCALES"
        :key="code"
        @click="choose(code)"
        :class="['flex items-center justify-between w-full px-4 py-2 text-[14px] rounded-lg mx-1 text-left transition-colors',
          code === locale ? 'text-wt-coral font-bold bg-wt-coral-soft' : 'text-wt-ink hover:bg-wt-bg']"
        :style="{ width: 'calc(100% - 0.5rem)' }"
      >
        {{ t(`language.${code}`) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, setLocale, type Locale } from '@/i18n'

const { t, locale } = useI18n()
const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

function choose(code: Locale) {
  setLocale(code)
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>
