<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-gray-500">Completing sign-in…</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  try {
    await auth.fetchMe()
    router.push('/')
  } catch {
    router.push('/auth/login')
  }
})
</script>
