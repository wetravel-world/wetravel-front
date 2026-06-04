<template>
  <AppHeader v-if="!route.meta.hideLayout" />
  <main :class="route.meta.hideLayout ? '' : 'bg-wt-bg min-h-screen'">
    <RouterView />
  </main>
  <AppFooter v-if="!route.meta.hideLayout" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()
</script>
