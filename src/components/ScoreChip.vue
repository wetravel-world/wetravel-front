<template>
  <span :style="`display:inline-flex;align-items:center;gap:${sm ? 5 : 8}px;background:${color.soft};color:${color.ink};white-space:nowrap;border-radius:999px;padding:${sm ? '4px 9px' : '6px 12px'};font-family:'Hanken Grotesk',sans-serif;font-weight:600;font-size:${sm ? 13 : 15}px;`">
    <strong class="font-extrabold">{{ score.toFixed(1) }}</strong>
    <span v-if="withLabel" class="font-semibold opacity-[0.92]">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { scoreColor, scoreLabel } from '@/composables/useScore'

const props = defineProps<{ score: number; withLabel?: boolean; sm?: boolean }>()

const color = computed(() => scoreColor(props.score))
const label = computed(() => scoreLabel(props.score))
const withLabel = computed(() => props.withLabel !== false)
</script>
