<template>
  <header class="bg-wt-bg relative z-50">
    <nav class="flex items-center justify-between px-4 md:px-14 py-4 md:py-5 max-w-[1300px] mx-auto">
      <!-- logo -->
      <RouterLink to="/" class="flex items-center gap-2 no-underline">
        <img src="/logo.png" alt="WeTravel" class="h-8 md:h-[3.2vw] max-h-10 w-auto" />
        <span class="-ml-3 font-serif text-xl font-semibold text-wt-ink tracking-[-0.3px]">WeTravel</span>
      </RouterLink>

      <!-- desktop nav -->
      <div class="hidden md:flex items-center gap-6 text-[15px] font-medium">
        <RouterLink to="/search" :class="['no-underline font-medium', isActive('/search') ? 'text-wt-coral font-bold' : 'text-wt-sub']">Explore</RouterLink>
        <a href="/#stories" class="text-wt-sub no-underline">Stories</a>

        <!-- authenticated: avatar + dropdown -->
        <template v-if="auth.isAuthenticated && auth.user">
          <div class="relative" ref="dropdownRef">
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="flex items-center gap-2 focus:outline-none"
              aria-label="User menu"
            >
              <img
                v-if="auth.user.avatar_url"
                :src="auth.user.avatar_url"
                :alt="auth.user.username"
                class="w-9 h-9 rounded-full object-cover ring-2 ring-wt-coral/30"
              />
              <span v-else class="w-9 h-9 rounded-full bg-wt-coral text-white flex items-center justify-center font-extrabold text-[15px] flex-shrink-0">
                {{ (auth.user.username || 'U')[0].toUpperCase() }}
              </span>
              <svg :class="['w-3.5 h-3.5 text-wt-sub transition-transform', dropdownOpen ? 'rotate-180' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            <!-- dropdown panel -->
            <div v-if="dropdownOpen" class="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-wt-line py-1.5 z-50">
              <div class="px-4 py-2.5 border-b border-wt-line">
                <p class="text-[13.5px] font-semibold text-wt-ink truncate">{{ auth.user.username }}</p>
                <p class="text-[12px] text-wt-sub truncate">{{ auth.user.email }}</p>
              </div>
              <RouterLink
                to="/profile"
                @click="dropdownOpen = false"
                class="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-wt-ink no-underline hover:bg-wt-bg rounded-lg mx-1"
              >
                <svg class="w-4 h-4 text-wt-sub" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                My profile
              </RouterLink>
              <RouterLink
                to="/settings"
                @click="dropdownOpen = false"
                class="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-wt-ink no-underline hover:bg-wt-bg rounded-lg mx-1"
              >
                <svg class="w-4 h-4 text-wt-sub" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                Settings
              </RouterLink>
              <div class="border-t border-wt-line mt-1 pt-1">
                <button
                  @click="handleLogout"
                  class="flex items-center gap-2.5 w-full px-4 py-2.5 text-[14px] text-red-500 hover:bg-red-50 rounded-lg mx-1 text-left"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- guest: login + signup -->
        <template v-else>
          <RouterLink to="/auth/login" class="text-wt-sub no-underline font-medium">Log in</RouterLink>
          <RouterLink to="/auth/register" class="bg-wt-coral text-white rounded-xl px-4 py-2.5 font-bold text-[14.5px] no-underline">Sign up</RouterLink>
        </template>
      </div>

      <!-- mobile right side -->
      <div class="flex md:hidden items-center gap-3">
        <template v-if="auth.isAuthenticated && auth.user">
          <RouterLink to="/settings">
            <img
              v-if="auth.user.avatar_url"
              :src="auth.user.avatar_url"
              :alt="auth.user.username"
              class="w-8 h-8 rounded-full object-cover"
            />
            <span v-else class="w-8 h-8 rounded-full bg-wt-coral text-white flex items-center justify-center font-extrabold text-[15px]">
              {{ (auth.user.username || 'U')[0].toUpperCase() }}
            </span>
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/auth/login" class="text-wt-sub no-underline text-sm font-semibold">Log in</RouterLink>
        </template>
        <!-- hamburger -->
        <button @click="menuOpen = !menuOpen" class="p-1.5 rounded-lg text-wt-ink" aria-label="Menu">
          <svg v-if="!menuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </nav>

    <!-- mobile menu drawer -->
    <div v-if="menuOpen" class="md:hidden border-t border-wt-line bg-wt-bg px-4 pb-5 pt-3 flex flex-col gap-1">
      <RouterLink to="/search" @click="menuOpen = false"
        :class="['py-3 px-2 rounded-xl text-[15px] font-medium no-underline', isActive('/search') ? 'text-wt-coral font-bold bg-wt-coral/10' : 'text-wt-ink']">
        Explore cities
      </RouterLink>
      <a href="#stories" @click="menuOpen = false" class="py-3 px-2 rounded-xl text-[15px] text-wt-ink no-underline">Stories</a>
      <a href="#stories" @click="menuOpen = false" class="py-3 px-2 rounded-xl text-[15px] text-wt-ink no-underline">Community</a>

      <template v-if="auth.isAuthenticated && auth.user">
        <div class="mt-2 pt-3 border-t border-wt-line flex flex-col gap-1">
          <RouterLink to="/profile" @click="menuOpen = false" class="py-3 px-2 rounded-xl text-[15px] text-wt-ink no-underline font-medium">My profile</RouterLink>
          <RouterLink to="/settings" @click="menuOpen = false" class="py-3 px-2 rounded-xl text-[15px] text-wt-ink no-underline font-medium">Settings</RouterLink>
          <button @click="handleLogout" class="py-3 px-2 rounded-xl text-[15px] text-red-500 font-medium text-left">Log out</button>
        </div>
      </template>
      <template v-else>
        <div class="mt-2 pt-3 border-t border-wt-line flex flex-col gap-2">
          <RouterLink to="/auth/login" @click="menuOpen = false"
            class="py-3 px-4 rounded-xl text-center text-[15px] font-semibold text-wt-ink no-underline border border-wt-line">
            Log in
          </RouterLink>
          <RouterLink to="/auth/register" @click="menuOpen = false"
            class="py-3 px-4 rounded-xl text-center text-[15px] font-bold text-white bg-wt-coral no-underline">
            Sign up
          </RouterLink>
        </div>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const menuOpen = ref(false)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onMounted(() => {
  auth.fetchMe()
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

function handleOutsideClick(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}

function isActive(path: string) {
  return route.path.startsWith(path)
}

async function handleLogout() {
  dropdownOpen.value = false
  menuOpen.value = false
  await auth.logout()
  router.push('/')
}
</script>
