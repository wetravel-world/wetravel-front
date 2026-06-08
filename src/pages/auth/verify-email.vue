<template>
  <div class="font-sans text-wt-ink min-h-screen bg-wt-bg flex flex-col items-center justify-center px-5 py-12">
    <!-- Logo -->
    <RouterLink to="/" class="flex items-center gap-2.5 no-underline mb-10">
      <img src="/logo.png" alt="WeTravel" class="h-8 w-auto" />
      <span class="ml-[-15px] font-serif text-[22px] font-semibold text-wt-ink tracking-[-0.3px]">WeTravel</span>
    </RouterLink>

    <!-- Card -->
    <div class="bg-white rounded-2xl border border-wt-line shadow-wt-panel w-full max-w-[420px] px-8 py-10 text-center">

      <!-- Loading -->
      <template v-if="state === 'loading'">
        <div class="w-14 h-14 rounded-full bg-wt-coral-soft flex items-center justify-center mx-auto mb-5 animate-pulse">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        <p class="text-wt-sub text-[15px]">Verifying your email…</p>
      </template>

      <!-- Success -->
      <template v-else-if="state === 'success'">
        <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1 class="font-serif text-[26px] font-semibold tracking-[-0.4px] m-0 mb-2">Email confirmed!</h1>
        <p class="text-[15px] text-wt-sub leading-[1.6] m-0 mb-7">You're all set. Start exploring welcoming cities.</p>
        <RouterLink :to="redirectTarget"
          class="block w-full bg-wt-coral text-white no-underline rounded-[13px] py-[14px] font-extrabold text-[16px]">
          Go to WeTravel
        </RouterLink>
      </template>

      <!-- Error -->
      <template v-else>
        <div class="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h1 class="font-serif text-[24px] font-semibold tracking-[-0.4px] m-0 mb-2">Link invalid or expired</h1>
        <p class="text-[15px] text-wt-sub leading-[1.6] m-0 mb-7">{{ errorMessage }}</p>
        <RouterLink to="/auth/register"
          class="block w-full bg-wt-coral text-white no-underline rounded-[13px] py-[14px] font-extrabold text-[16px] mb-3">
          Back to register
        </RouterLink>
        <RouterLink to="/auth/login" class="text-[14px] text-wt-coral font-bold no-underline">
          Already verified? Log in
        </RouterLink>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/composables/useApi'
import { consumePostAuthRedirect } from '@/composables/usePostAuthRedirect'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const state = ref<'loading' | 'success' | 'error'>('loading')
const errorMessage = ref('This verification link is invalid or has already been used.')
const redirectTarget = ref('/')

onMounted(async () => {
  const token = route.query.token as string
  if (!token) {
    state.value = 'error'
    return
  }
  try {
    await api.get(`/auth/verify-email/?token=${token}`)
    await auth.fetchMe()
    redirectTarget.value = consumePostAuthRedirect()
    state.value = 'success'
    setTimeout(() => router.push(redirectTarget.value), 2000)
  } catch (e: any) {
    errorMessage.value = e?.response?.data?.detail ?? 'This verification link is invalid or has already been used.'
    state.value = 'error'
  }
})
</script>
