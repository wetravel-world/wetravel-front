<template>
  <div class="font-sans text-wt-ink min-h-screen grid grid-cols-2">
    <!-- form side -->
    <div class="bg-wt-bg flex flex-col px-14 py-[30px]">
      <RouterLink to="/" class="flex items-center gap-2.5 no-underline mb-auto">
        <img src="/logo.png" alt="WeTravel" class="h-[3.5vw] w-auto" />
        <span class="ml-[-15px] font-serif text-[22px] font-semibold text-wt-ink tracking-[-0.3px]">WeTravel</span>
      </RouterLink>
      <div class="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto pb-10">
        <h1 class="font-serif text-[34px] font-semibold tracking-[-0.6px] m-0 mb-2">Create your account</h1>
        <p class="text-[15.5px] text-wt-sub m-0 mb-7 leading-[1.5]">Save cities, write reviews and book vetted stays with your referral perks.</p>
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
          <button type="submit" class="w-full bg-wt-coral text-white border-0 rounded-[13px] py-[15px] font-extrabold text-[16px] cursor-pointer mt-1">Create account</button>
          <p class="text-center text-[14px] text-wt-sub mt-[18px]">Already have an account? <RouterLink to="/auth/login" class="text-wt-coral font-bold no-underline">Log in</RouterLink></p>
        </form>
      </div>
    </div>
    <!-- brand side -->
    <div class="bg-[#133f81] text-white relative overflow-hidden flex flex-col justify-end p-12">
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const email = ref('')
const password = ref('')
const errs = ref<{ username?: string; email?: string; password?: string }>({})
const serverErrors = ref<string[]>([])
const router = useRouter()
const auth = useAuthStore()

async function submit() {
  errs.value = {}
  serverErrors.value = []
  if (username.value.trim().length < 3) errs.value.username = 'Pick a username (3+ characters).'
  if (!email.value.includes('@')) errs.value.email = 'Enter a valid email address.'
  if (password.value.length < 8) errs.value.password = 'Password must be at least 8 characters.'
  if (Object.keys(errs.value).length) return
  try {
    await auth.register({ username: username.value, email: email.value, password: password.value })
    router.push('/')
  } catch (e: any) {
    const data = e?.response?.data
    if (data) serverErrors.value = Object.values(data).flat() as string[]
    else serverErrors.value = ['Registration failed.']
  }
}
</script>
