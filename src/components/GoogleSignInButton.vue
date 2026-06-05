<template>
  <div>
    <button
      type="button"
      :disabled="loading"
      @click="handleClick"
      class="w-full flex items-center justify-center gap-3 bg-white border-[1.5px] border-wt-line rounded-xl px-4 py-[13px] text-[15px] font-semibold text-wt-ink cursor-pointer hover:border-wt-coral/50 hover:bg-wt-bg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <!-- Google "G" logo -->
      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <span>{{ loading ? 'Signing in…' : label }}</span>
    </button>
    <p v-if="error" class="text-[12.5px] text-red-500 mt-2 text-center">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  label?: string
  redirect?: string
}>()

const router = useRouter()
const auth = useAuthStore()
const loading = ref(false)
const error = ref('')
const label = props.label ?? 'Continue with Google'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void
          prompt: (callback?: (notification: PromptNotification) => void) => void
          cancel: () => void
          renderButton: (parent: HTMLElement, options: object) => void
        }
      }
    }
  }
  interface PromptNotification {
    isDisplayed: () => boolean
    isNotDisplayed: () => boolean
    isSkippedMoment: () => boolean
    isDismissedMoment: () => boolean
    getNotDisplayedReason: () => string
    getSkippedReason: () => string
    getDismissedReason: () => string
  }
}

async function handleCredentialResponse(response: { credential: string }) {
  loading.value = true
  error.value = ''
  try {
    await auth.loginWithGoogle(response.credential)
    router.push(props.redirect ?? '/')
  } catch (e: any) {
    error.value = e?.response?.data?.detail ?? 'Google sign-in failed. Please try again.'
    loading.value = false
  }
}

function initializeGIS() {
  window.google!.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: true,
    context: 'signin',
  })
}

function handleClick() {
  error.value = ''

  if (!CLIENT_ID) {
    error.value = 'Google sign-in is not configured.'
    return
  }

  if (!window.google) {
    // Script not loaded yet — try waiting a moment then retry
    loading.value = true
    const maxWait = 3000
    const start = Date.now()
    const poll = setInterval(() => {
      if (window.google) {
        clearInterval(poll)
        loading.value = false
        triggerPrompt()
      } else if (Date.now() - start > maxWait) {
        clearInterval(poll)
        loading.value = false
        error.value = 'Google script failed to load. Please refresh the page.'
      }
    }, 100)
    return
  }

  triggerPrompt()
}

function triggerPrompt() {
  // Always (re-)initialize before prompting so the callback is always registered,
  // regardless of whether onMounted ran before the script loaded.
  initializeGIS()

  window.google!.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      // One Tap was suppressed (Firefox ETP, Safari ITP, ad blockers…)
      // Fall back to the backend redirect OAuth flow
      const reason = notification.isNotDisplayed()
        ? notification.getNotDisplayedReason()
        : notification.getSkippedReason()

      // Suppressions like 'browser_not_supported' or 'third_party_cookies_blocked'
      // → redirect to backend's allauth Google URL
      if (['browser_not_supported', 'third_party_cookies_blocked', 'opt_out_or_no_session'].includes(reason)) {
        window.location.href = '/api/auth/google/redirect/'
      }
      // For other suppressions (user closed, etc.) do nothing
    }
  })
}
</script>
