<template>
  <div class="min-h-screen bg-wt-bg font-sans">
    <div class="max-w-2xl mx-auto px-4 py-10 md:py-14">

      <h1 class="font-serif text-[28px] font-semibold text-wt-ink mb-8 tracking-[-0.4px]">Account settings</h1>

      <!-- Profile info -->
      <section class="bg-white rounded-2xl shadow-sm border border-wt-line mb-6">
        <div class="px-6 py-5 border-b border-wt-line flex items-center gap-4">
          <img
            v-if="auth.user?.avatar_url"
            :src="auth.user.avatar_url"
            :alt="auth.user.username"
            class="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <span v-else class="w-16 h-16 rounded-full bg-wt-coral text-white flex items-center justify-center font-extrabold text-2xl flex-shrink-0">
            {{ (auth.user?.username || 'U')[0].toUpperCase() }}
          </span>
          <div>
            <p class="font-semibold text-wt-ink text-[15px]">{{ auth.user?.username }}</p>
            <p class="text-wt-sub text-[13.5px]">{{ auth.user?.email }}</p>
          </div>
        </div>

        <form @submit.prevent="saveProfile" class="px-6 py-5 flex flex-col gap-4">
          <h2 class="font-semibold text-[15px] text-wt-ink">Personal information</h2>

          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-medium text-wt-sub">Username</label>
            <input
              v-model="profileForm.username"
              type="text"
              autocomplete="username"
              class="w-full px-4 py-3 rounded-xl border border-wt-line text-[14.5px] text-wt-ink bg-wt-bg focus:outline-none focus:ring-2 focus:ring-wt-coral/40 focus:border-wt-coral transition"
              :class="{ 'border-red-400': profileErrors.username }"
            />
            <p v-if="profileErrors.username" class="text-red-500 text-[12.5px]">{{ profileErrors.username }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-medium text-wt-sub">Email address</label>
            <input
              v-model="profileForm.email"
              type="email"
              autocomplete="email"
              class="w-full px-4 py-3 rounded-xl border border-wt-line text-[14.5px] text-wt-ink bg-wt-bg focus:outline-none focus:ring-2 focus:ring-wt-coral/40 focus:border-wt-coral transition"
              :class="{ 'border-red-400': profileErrors.email }"
            />
            <p v-if="profileErrors.email" class="text-red-500 text-[12.5px]">{{ profileErrors.email }}</p>
          </div>

          <div class="flex items-center justify-between pt-1">
            <p v-if="profileSuccess" class="text-green-600 text-[13px] font-medium">Changes saved.</p>
            <span v-else />
            <button
              type="submit"
              :disabled="profileLoading"
              class="bg-wt-coral text-white rounded-xl px-5 py-2.5 font-bold text-[14px] disabled:opacity-60 transition"
            >
              {{ profileLoading ? 'Saving…' : 'Save changes' }}
            </button>
          </div>
        </form>
      </section>

      <!-- Change password -->
      <section class="bg-white rounded-2xl shadow-sm border border-wt-line">
        <div class="px-6 py-5 border-b border-wt-line">
          <h2 class="font-semibold text-[15px] text-wt-ink">Change password</h2>
          <p v-if="auth.user?.is_google_auth" class="text-wt-sub text-[13px] mt-1">Your account uses Google sign-in — password changes are not available.</p>
        </div>

        <form
          v-if="!auth.user?.is_google_auth"
          @submit.prevent="savePassword"
          class="px-6 py-5 flex flex-col gap-4"
        >
          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-medium text-wt-sub">Current password</label>
            <input
              v-model="passwordForm.current_password"
              type="password"
              autocomplete="current-password"
              class="w-full px-4 py-3 rounded-xl border border-wt-line text-[14.5px] text-wt-ink bg-wt-bg focus:outline-none focus:ring-2 focus:ring-wt-coral/40 focus:border-wt-coral transition"
              :class="{ 'border-red-400': passwordErrors.current_password }"
            />
            <p v-if="passwordErrors.current_password" class="text-red-500 text-[12.5px]">{{ passwordErrors.current_password }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-medium text-wt-sub">New password</label>
            <input
              v-model="passwordForm.new_password"
              type="password"
              autocomplete="new-password"
              class="w-full px-4 py-3 rounded-xl border border-wt-line text-[14.5px] text-wt-ink bg-wt-bg focus:outline-none focus:ring-2 focus:ring-wt-coral/40 focus:border-wt-coral transition"
              :class="{ 'border-red-400': passwordErrors.new_password }"
            />
            <p v-if="passwordErrors.new_password" class="text-red-500 text-[12.5px]">{{ passwordErrors.new_password }}</p>
            <p class="text-wt-sub text-[12px]">Min. 8 characters, one uppercase letter and one number.</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[13px] font-medium text-wt-sub">Confirm new password</label>
            <input
              v-model="passwordForm.confirm_password"
              type="password"
              autocomplete="new-password"
              class="w-full px-4 py-3 rounded-xl border border-wt-line text-[14.5px] text-wt-ink bg-wt-bg focus:outline-none focus:ring-2 focus:ring-wt-coral/40 focus:border-wt-coral transition"
              :class="{ 'border-red-400': passwordErrors.confirm_password }"
            />
            <p v-if="passwordErrors.confirm_password" class="text-red-500 text-[12.5px]">{{ passwordErrors.confirm_password }}</p>
          </div>

          <div class="flex items-center justify-between pt-1">
            <p v-if="passwordSuccess" class="text-green-600 text-[13px] font-medium">Password updated.</p>
            <span v-else />
            <button
              type="submit"
              :disabled="passwordLoading"
              class="bg-wt-coral text-white rounded-xl px-5 py-2.5 font-bold text-[14px] disabled:opacity-60 transition"
            >
              {{ passwordLoading ? 'Updating…' : 'Update password' }}
            </button>
          </div>
        </form>

        <div v-else class="px-6 py-5">
          <p class="text-wt-sub text-[14px]">Sign in with Google is active on this account.</p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// ── Profile form ──────────────────────────────────────────────────
const profileForm = reactive({
  username: auth.user?.username ?? '',
  email: auth.user?.email ?? '',
})
const profileErrors = reactive<Record<string, string>>({})
const profileLoading = ref(false)
const profileSuccess = ref(false)

watch(() => auth.user, (u) => {
  if (u) {
    profileForm.username = u.username
    profileForm.email = u.email
  }
}, { immediate: true })

async function saveProfile() {
  Object.keys(profileErrors).forEach(k => delete profileErrors[k])
  profileSuccess.value = false
  profileLoading.value = true
  try {
    await auth.updateProfile({ username: profileForm.username, email: profileForm.email })
    profileSuccess.value = true
    setTimeout(() => (profileSuccess.value = false), 3000)
  } catch (err: any) {
    const data = err.response?.data ?? {}
    if (data.username) profileErrors.username = Array.isArray(data.username) ? data.username[0] : data.username
    if (data.email) profileErrors.email = Array.isArray(data.email) ? data.email[0] : data.email
    if (data.detail) profileErrors.username = data.detail
  } finally {
    profileLoading.value = false
  }
}

// ── Password form ─────────────────────────────────────────────────
const passwordForm = reactive({
  current_password: '',
  new_password: '',
  confirm_password: '',
})
const passwordErrors = reactive<Record<string, string>>({})
const passwordLoading = ref(false)
const passwordSuccess = ref(false)

async function savePassword() {
  Object.keys(passwordErrors).forEach(k => delete passwordErrors[k])
  passwordSuccess.value = false

  if (passwordForm.new_password !== passwordForm.confirm_password) {
    passwordErrors.confirm_password = 'Passwords do not match.'
    return
  }

  passwordLoading.value = true
  try {
    await auth.updatePassword({
      current_password: passwordForm.current_password,
      new_password: passwordForm.new_password,
    })
    passwordSuccess.value = true
    passwordForm.current_password = ''
    passwordForm.new_password = ''
    passwordForm.confirm_password = ''
    setTimeout(() => (passwordSuccess.value = false), 3000)
  } catch (err: any) {
    const data = err.response?.data ?? {}
    if (data.current_password) passwordErrors.current_password = Array.isArray(data.current_password) ? data.current_password[0] : data.current_password
    if (data.new_password) passwordErrors.new_password = Array.isArray(data.new_password) ? data.new_password[0] : data.new_password
    if (data.detail) passwordErrors.current_password = data.detail
  } finally {
    passwordLoading.value = false
  }
}
</script>
