<template>
  <div v-if="auth.isAuthenticated" class="bg-white rounded-2xl px-5 py-[18px] shadow-[0_1px_3px_rgba(42,32,24,0.05)] mb-5">
    <h3 class="font-serif text-[18px] font-semibold m-0 mb-[14px]">Share your experience</h3>
    <form @submit.prevent="showWarning = true">
      <label class="block mb-[14px]">
        <span class="block text-[13px] font-semibold text-wt-sub mb-1.5">Welcome score (1–10)</span>
        <input v-model.number="score" type="number" min="1" max="10" required
          class="w-20 border-[1.5px] border-wt-line rounded-[11px] px-3 py-2.5 text-[15px] text-wt-ink outline-none bg-white transition-colors focus:border-wt-coral" />
      </label>
      <label class="block mb-4">
        <span class="block text-[13px] font-semibold text-wt-sub mb-1.5">Your review</span>
        <textarea v-model="body" rows="3" required
          placeholder="How was your experience ?"
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

  <!-- community guidelines modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showWarning"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
        @click.self="showWarning = false"
      >
        <!-- backdrop -->
        <div class="absolute inset-0 bg-wt-ink/40 backdrop-blur-[2px]" @click="showWarning = false" />

        <!-- sheet -->
        <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl px-6 py-7 z-10">
          <!-- icon -->
          <div class="w-12 h-12 rounded-2xl bg-wt-coral/10 flex items-center justify-center mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
          </div>

          <h2 class="font-serif text-[20px] font-semibold text-wt-ink mb-2 tracking-[-0.3px]">Before you post</h2>
          <p class="text-[14px] text-wt-sub leading-relaxed mb-4">
            WeTravel is a safety companion for Black travelers, African diaspora members, and mixed-race couples. Your review helps real people make informed decisions about where they travel.
          </p>

          <div class="bg-wt-bg rounded-2xl px-4 py-3.5 mb-5 flex flex-col gap-2">
            <div class="flex items-start gap-2.5">
              <svg class="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span class="text-[13.5px] text-wt-ink">Share your genuine experience — safety, welcome, incidents, highlights</span>
            </div>
            <div class="flex items-start gap-2.5">
              <svg class="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e9663e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span class="text-[13.5px] text-wt-ink">Be specific — practical details are more useful than general impressions</span>
            </div>
            <div class="flex items-start gap-2.5 mt-1 pt-2.5 border-t border-wt-line">
              <svg class="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c0392b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <span class="text-[13.5px] text-wt-ink">Political statements, slurs, hate speech, or off-topic content will be removed without notice</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="showWarning = false"
              class="flex-1 rounded-[13px] border border-wt-line py-[13px] text-[14.5px] font-semibold text-wt-ink hover:bg-wt-bg transition"
            >
              Cancel
            </button>
            <button
              @click="confirmAndSubmit"
              :disabled="submitting"
              class="flex-1 rounded-[13px] bg-wt-coral text-white py-[13px] text-[14.5px] font-bold transition-opacity"
              :class="{ 'opacity-50 cursor-not-allowed': submitting }"
            >
              {{ submitting ? 'Posting…' : 'I understand, post' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
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
const showWarning = ref(false)

async function confirmAndSubmit() {
  error.value = ''
  submitting.value = true
  try {
    await comments.postComment(props.citySlug, { body: body.value, score: score.value })
    body.value = ''
    score.value = 8
    showWarning.value = false
  } catch (e: any) {
    showWarning.value = false
    error.value = e?.response?.data?.detail ?? 'Could not submit review.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: translateY(16px);
}
</style>
