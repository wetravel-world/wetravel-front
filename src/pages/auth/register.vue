<template>
  <div class="font-sans text-wt-ink min-h-screen grid grid-cols-1 md:grid-cols-2">
    <!-- form side -->
    <div class="bg-wt-bg flex flex-col px-5 sm:px-10 md:px-14 py-[30px]">
      <RouterLink to="/" class="flex items-center gap-2.5 no-underline mb-auto">
        <img src="/logo.png" alt="WeTravel" class="h-8 md:h-[3.5vw] w-auto" />
        <span class="ml-[-15px] font-serif text-[22px] font-semibold text-wt-ink tracking-[-0.3px]">WeTravel</span>
      </RouterLink>

      <!-- Check-your-email state -->
      <div v-if="emailSent" class="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto pb-10">
        <div class="w-16 h-16 rounded-full bg-wt-coral-soft flex items-center justify-center mb-6 mx-auto">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        <h1 class="font-serif text-[28px] font-semibold tracking-[-0.5px] m-0 mb-2 text-center">Check your inbox</h1>
        <p class="text-[15px] text-wt-sub text-center leading-[1.6] m-0 mb-7">
          We sent a confirmation link to <strong class="text-wt-ink">{{ submittedEmail }}</strong>.<br />
          Click it to activate your account.
        </p>
        <p class="text-center text-[13.5px] text-wt-sub">
          Didn't receive it?
          <button @click="resend" :disabled="resendCooldown > 0"
            class="text-wt-coral font-bold bg-transparent border-0 cursor-pointer p-0 disabled:opacity-50 disabled:cursor-not-allowed">
            {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend email' }}
          </button>
        </p>
        <p v-if="resendMessage" class="text-center text-[13px] text-wt-sub mt-3">{{ resendMessage }}</p>
        <p class="text-center text-[14px] text-wt-sub mt-6">
          <RouterLink to="/auth/login" class="text-wt-coral font-bold no-underline">Back to login</RouterLink>
        </p>
      </div>

      <!-- Registration form -->
      <div v-else class="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto pb-10">
        <h1 class="font-serif text-[34px] font-semibold tracking-[-0.6px] m-0 mb-2">Create your account</h1>
        <p class="text-[15.5px] text-wt-sub m-0 mb-7 leading-[1.5]">Save cities, write reviews and book vetted stays with your referral perks.</p>
        <GoogleSignInButton label="Sign up with Google" :redirect="(route.query.redirect as string) || '/'" class="mb-5" />
        <div class="flex items-center gap-3 mb-5">
          <div class="flex-1 h-px bg-wt-line"></div>
          <span class="text-[13px] text-wt-sub font-medium">or</span>
          <div class="flex-1 h-px bg-wt-line"></div>
        </div>
        <form @submit.prevent="submit">
          <label class="block mb-4">
            <span class="block text-[13.5px] font-semibold text-wt-ink mb-[7px]">Username</span>
            <input v-model="username" type="text" required placeholder="e.g. alisha_b, justin&emily..." autocomplete="username"
              class="w-full border-[1.5px] rounded-xl px-[15px] py-[13px] text-[15px] text-wt-ink outline-none bg-white transition-colors focus:border-wt-coral"
              :class="errs.username ? 'border-red-400' : 'border-wt-line'" />
            <span v-if="errs.username" class="block text-[12.5px] text-red-500 mt-1.5">{{ errs.username }}</span>
          </label>
          <label class="block mb-4">
            <span class="block text-[13.5px] font-semibold text-wt-ink mb-[7px]">Email</span>
            <input v-model="email" type="email" required placeholder="you@example.com" autocomplete="email"
              class="w-full border-[1.5px] rounded-xl px-[15px] py-[13px] text-[15px] text-wt-ink outline-none bg-white transition-colors focus:border-wt-coral"
              :class="errs.email ? 'border-red-400' : 'border-wt-line'" />
            <span v-if="errs.email" class="block text-[12.5px] text-red-500 mt-1.5">{{ errs.email }}</span>
          </label>
          <label class="block mb-4">
            <span class="block text-[13.5px] font-semibold text-wt-ink mb-[7px]">Password</span>
            <input v-model="password" type="password" required placeholder="At least 8 characters" autocomplete="new-password"
              class="w-full border-[1.5px] rounded-xl px-[15px] py-[13px] text-[15px] text-wt-ink outline-none bg-white transition-colors focus:border-wt-coral"
              :class="errs.password ? 'border-red-400' : 'border-wt-line'" />
            <span v-if="errs.password" class="block text-[12.5px] text-red-500 mt-1.5">{{ errs.password }}</span>
          </label>
          <p v-if="serverErrors.length" class="text-[12.5px] text-red-500 mb-3">
            <span v-for="e in serverErrors" :key="e" class="block">{{ e }}</span>
          </p>
          <button type="submit" :disabled="loading"
            class="w-full bg-wt-coral text-white border-0 rounded-[13px] py-[15px] font-extrabold text-[16px] cursor-pointer mt-1 disabled:opacity-60">
            {{ loading ? 'Creating account…' : 'Create account' }}
          </button>
          <p class="text-center text-[14px] text-wt-sub mt-[18px]">Already have an account? <RouterLink to="/auth/login" class="text-wt-coral font-bold no-underline">Log in</RouterLink></p>
        </form>
      </div>
    </div>

    <!-- brand side — hidden on mobile -->
    <div class="hidden md:flex bg-[#133f81] text-white relative overflow-hidden flex-col justify-end p-12">
      <div class="absolute top-[-60px] right-[-60px] w-[260px] h-[260px] rounded-full bg-[#e9663e55] pointer-events-none" />
      <div class="absolute top-[120px] left-[-80px] w-[200px] h-[200px] rounded-full bg-[#ef8fa033] pointer-events-none" />
      <div class="absolute top-12 left-12 inline-flex items-center gap-2 bg-white/[0.14] rounded-full px-[15px] py-2">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>
        <span class="text-[13px] font-bold">Travel like you belong everywhere</span>
      </div>
      <div class="relative">
        <svg width="38" height="38" viewBox="0 0 24 24" fill="white" class="opacity-50 mb-[14px] block"><path d="M10 7H5a3 3 0 0 0-3 3v7h8v-8H6a2 2 0 0 1 4 0zM22 7h-5a3 3 0 0 0-3 3v7h8v-8h-4a2 2 0 0 1 4 0z"/></svg>
        <p class="font-serif text-[26px] leading-[1.4] font-medium m-0 mb-5">Having a community that tells you the truth before you travel changes everything.</p>
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-[#e9663e22] flex-shrink-0" />
          <div>
            <div class="font-bold">Amara &amp; Tom</div>
            <div class="text-[13px] text-white/70">Mixed-race couple · 14 trips</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import GoogleSignInButton from '@/components/GoogleSignInButton.vue'
import api from '@/composables/useApi'
import { setPostAuthRedirect } from '@/composables/usePostAuthRedirect'

const route = useRoute()
const username = ref('')
const email = ref('')
const password = ref('')
const errs = ref<{ username?: string; email?: string; password?: string }>({})
const serverErrors = ref<string[]>([])
const loading = ref(false)
const emailSent = ref(false)
const submittedEmail = ref('')
const resendCooldown = ref(0)
const resendMessage = ref('')
const auth = useAuthStore()

async function submit() {
  errs.value = {}
  serverErrors.value = []
  if (username.value.trim().length < 3) errs.value.username = 'Pick a username (3+ characters).'
  if (!email.value.includes('@')) errs.value.email = 'Enter a valid email address.'
  if (password.value.length < 8) errs.value.password = 'Password must be at least 8 characters.'
  if (Object.keys(errs.value).length) return

  loading.value = true
  try {
    await auth.register({ username: username.value, email: email.value, password: password.value })
    setPostAuthRedirect((route.query.redirect as string) || '/')
    submittedEmail.value = email.value
    emailSent.value = true
  } catch (e: any) {
    const data = e?.response?.data
    if (data) serverErrors.value = Object.values(data).flat() as string[]
    else serverErrors.value = ['Registration failed.']
  } finally {
    loading.value = false
  }
}

async function resend() {
  resendMessage.value = ''
  try {
    await api.post('/auth/resend-verification/', { email: submittedEmail.value })
    resendMessage.value = 'Email sent! Check your inbox.'
    startCooldown()
  } catch {
    resendMessage.value = 'Could not resend. Try again in a moment.'
  }
}

function startCooldown() {
  resendCooldown.value = 60
  const id = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(id)
  }, 1000)
}
</script>
