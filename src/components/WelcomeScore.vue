<template>
  <div class="relative flex-shrink-0" :style="`width:${size}px;height:${size}px;`">
    <svg :width="size" :height="size" class="-rotate-90">
      <circle :cx="size/2" :cy="size/2" :r="r" fill="none" :stroke="color.main + '22'" :stroke-width="stroke" />
      <circle :cx="size/2" :cy="size/2" :r="r" fill="none" :stroke="color.main" :stroke-width="stroke"
        stroke-linecap="round" :stroke-dasharray="circ" :stroke-dashoffset="circ * (1 - pct)" />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center leading-none">
      <span class="font-sans font-extrabold" :style="`font-size:${size*0.32}px;color:${color.ink};`">{{ score.toFixed(1) }}</span>
      <span v-if="showOutOf" class="font-mono mt-px" :style="`font-size:${size*0.13}px;color:${color.main};`">/10</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { scoreColor } from '@/composables/useScore'

const props = defineProps<{
  score: number
  count?: number
  size?: number
  stroke?: number
  showOutOf?: boolean
  compact?: boolean
}>()

const size = computed(() => props.compact ? 44 : (props.size ?? 64))
const stroke = computed(() => props.stroke ?? (props.compact ? 5 : 6))
const showOutOf = computed(() => props.showOutOf !== false && !props.compact)

const color = computed(() => scoreColor(props.score))
const r = computed(() => (size.value - stroke.value) / 2)
const circ = computed(() => 2 * Math.PI * r.value)
const pct = computed(() => Math.max(0, Math.min(1, props.score / 10)))
</script>
