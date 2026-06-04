<template>
  <div v-if="auth.isAuthenticated" class="bg-white rounded-2xl px-5 py-[18px] shadow-[0_1px_3px_rgba(42,32,24,0.05)]">
    <h3 class="font-serif text-[18px] font-semibold m-0 mb-[14px]">Share your experience</h3>
    <form @submit.prevent="submit">
      <label class="block mb-[14px]">
        <span class="block text-[13px] font-semibold text-wt-sub mb-1.5">Welcome score (1–10)</span>
        <input v-model.number="score" type="number" min="1" max="10" required
          class="w-20 border-[1.5px] border-wt-line rounded-[11px] px-3 py-2.5 text-[15px] text-wt-ink outline-none bg-white transition-colors focus:border-wt-coral" />
      </label>
      <label class="block mb-4">
        <span class="block text-[13px] font-semibold text-wt-sub mb-1.5">Your review</span>
        <textarea v-model="body" rows="3" required
          placeholder="How was your experience as a Black / African traveler?"
          class="block w-full border-[1.5px] border-wt-line rounded-[11px] px-[13px] py-[11px] text-[14px] text-wt-ink outline-none bg-white resize-none leading-[1.55] transition-colors focus:border-wt-coral" />
      </label>
      <p v-if="error" class="text-[12.5px] text-red-500 mb-2.5">{{ error }}</p>
      <button type="submit" :disabled="submitting"
        class="bg-wt-coral text-white border-0 rounded-[13px] px-[22px] py-[13px] font-bold text-[15px] cursor-pointer transition-opacity"
        :class="{ 'opacity-50 cursor-not-allowed': submitting }">
        Submit review
      </button>
    </form>
  </div>
  <div v-else class="bg-wt-bg border border-wt-line rounded-2xl p-5 text-center">
    <p class="text-[14px] text-wt-sub m-0">
      <RouterLink to="/auth/login" class="text-wt-coral font-bold no-underline">Sign in</RouterLink> to leave a review.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCommentsStore } from '@/stores/comments'

const props = defineProps<{ citySlug: string }>()
const auth = useAuthStore()
const comments = useCommentsStore()

const score = ref(8)
const body = ref('')
const error = ref('')
const submitting = ref(false)

async function submit() {
  error.value = ''
  submitting.value = true
  try {
    await comments.postComment(props.citySlug, { body: body.value, score: score.value })
    body.value = ''
    score.value = 8
  } catch (e: any) {
    error.value = e?.response?.data?.detail ?? 'Could not submit review.'
  } finally {
    submitting.value = false
  }
}
</script>
