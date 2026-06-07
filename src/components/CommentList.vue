<template>
  <div :class="visibleComments.length < 3 ? '' : 'overflow-y-scroll h-[40vh] pb-10'">
    <p v-if="store.loading" class="text-[14px] text-wt-sub py-4">{{ t('comments.loading') }}</p>

    <div v-else class="flex flex-col gap-4 ">
      <div
        v-for="comment in visibleComments"
        :key="comment.id"
        class="bg-white rounded-2xl shadow-[0_1px_3px_rgba(42,32,24,0.06)] relative z-10 hover:z-30"
      >
        <!-- comment body -->
        <div class="p-5">
          <div class="flex items-center gap-3 mb-3">
            <!-- avatar with stamp popover -->
            <div class="relative flex-shrink-0 group/avatar">
              <img
                v-if="comment.author_avatar_url"
                :src="comment.author_avatar_url"
                :alt="comment.author_username"
                class="w-10 h-10 rounded-full object-cover"
              />
              <span v-else class="w-10 h-10 rounded-full bg-wt-coral/20 flex items-center justify-center font-bold text-wt-coral text-[15px]">
                {{ (comment.author_username || 'U')[0].toUpperCase() }}
              </span>
              <!-- stamp popover -->
              <div
                v-if="comment.author_stamps?.length"
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none
                       opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-150"
              >
                <div class="bg-white border border-wt-line rounded-2xl shadow-lg px-4 py-3 ml-[25%] w-[50vw]">
                  <p class="text-[11px] font-semibold text-wt-sub uppercase tracking-wide mb-2.5">{{ t('comments.stampsCollected') }}</p>
                  <div class="flex flex-wrap justify-center">
                    <img
                      v-for="(slug, i) in comment.author_stamps"
                      :key="slug"
                      :src="`${apiBase}/static/img/stamps/${slug}.png`"
                      :title="slug.replace(/-/g, ' ')"
                      :style="{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }"
                      class="w-[15vw] object-contain"
                    />
                  </div>
                </div>
                <!-- arrow -->
                <div class="w-2.5 h-2.5 bg-white border-b border-r border-wt-line rotate-45 mx-auto -mt-1.5" />
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="font-semibold text-[14.5px] text-wt-ink">{{ comment.author_username }}</div>
              <div class="text-[12px] text-wt-sub">{{ formatDate(comment.created_at) }}</div>
            </div>

            <!-- delete comment (author only) -->
            <template v-if="auth.user?.username === comment.author_username">
              <button
                v-if="!confirmDeleteComments.has(comment.id)"
                @click="startDeleteComment(comment.id)"
                class="p-1.5 text-wt-sub hover:text-red-400 transition-colors rounded-lg flex-shrink-0"
                :title="t('comments.deleteComment')"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
              <div v-else class="flex items-center gap-1.5 flex-shrink-0">
                <button @click="confirmComment(comment.id)" class="text-[12px] font-bold text-red-500 hover:text-red-600 transition-colors">{{ t('comments.deleteConfirm') }}</button>
                <button @click="cancelDeleteComment(comment.id)" class="text-[12px] text-wt-sub hover:text-wt-ink transition-colors">{{ t('comments.cancel') }}</button>
              </div>
            </template>

            <!-- score stars -->
            <div class="flex gap-0.5 flex-shrink-0">
              <svg v-for="n in 5" :key="n" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
                :class="n <= Math.round(comment.score / 2) ? 'text-amber-400' : 'text-wt-line'">
                <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.9 6.2 20.95l1.1-6.5-4.7-4.6 6.5-.95z"/>
              </svg>
            </div>
          </div>

          <p class="m-0 text-[14.5px] leading-relaxed text-wt-ink">
            {{ shownTranslations.has(commentKey(comment.id)) ? translations[commentKey(comment.id)] : comment.body }}
          </p>

          <!-- reply toggle -->
          <button
            @click="toggleReplies(comment.id)"
            class="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-wt-sub hover:text-wt-coral transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span v-if="comment.replies.length">
              {{ t('comments.replies', comment.replies.length) }}
            </span>
            <span v-else>{{ t('comments.reply') }}</span>
            <svg
              :class="['w-3 h-3 transition-transform', openReplies.has(comment.id) ? 'rotate-180' : '']"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <button
            @click="toggleTranslate(commentKey(comment.id), comment.body)"
            :disabled="translatingKeys.has(commentKey(comment.id))"
            class="ml-2 text-[12px] font-semibold text-wt-coral hover:underline disabled:opacity-60"
          >
            <span v-if="translatingKeys.has(commentKey(comment.id))">{{ t('comments.translating') }}</span>
            <span v-else-if="shownTranslations.has(commentKey(comment.id))">{{ t('comments.showOriginal') }}</span>
            <span v-else>{{ t('comments.translate') }}</span>
          </button>
        </div>

        <!-- replies section -->
        <div v-if="openReplies.has(comment.id)" class="border-t border-wt-line bg-wt-bg px-5 py-4 flex flex-col gap-3 rounded-b-2xl">

          <!-- existing replies -->
          <div
            v-for="reply in comment.replies"
            :key="reply.id"
            class="flex gap-3"
          >
            <img
              v-if="reply.author_avatar_url"
              :src="reply.author_avatar_url"
              :alt="reply.author_username"
              class="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
            />
            <span v-else class="w-8 h-8 rounded-full bg-wt-coral/15 flex items-center justify-center font-bold text-wt-coral text-[13px] flex-shrink-0 mt-0.5">
              {{ (reply.author_username || 'U')[0].toUpperCase() }}
            </span>
            <div class="flex-1 bg-white rounded-xl px-3.5 py-2.5 shadow-[0_1px_2px_rgba(42,32,24,0.05)]">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-semibold text-[13px] text-wt-ink">{{ reply.author_username }}</span>
                <span class="text-[11.5px] text-wt-sub">{{ formatDate(reply.created_at) }}</span>
                <!-- delete reply (author only) -->
                <template v-if="auth.user?.username === reply.author_username">
                  <button
                    v-if="!confirmDeleteReplies.has(replyKey(comment.id, reply.id))"
                    @click="startDeleteReply(comment.id, reply.id)"
                    class="ml-auto p-1 text-wt-sub hover:text-red-400 transition-colors rounded"
                    :title="t('comments.deleteReply')"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                  <div v-else class="ml-auto flex items-center gap-1.5">
                    <button @click="confirmReply(comment.id, reply.id)" class="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors">{{ t('comments.deleteConfirm') }}</button>
                    <button @click="cancelDeleteReply(comment.id, reply.id)" class="text-[11px] text-wt-sub hover:text-wt-ink transition-colors">{{ t('comments.cancel') }}</button>
                  </div>
                </template>
              </div>
              <p class="m-0 text-[13.5px] leading-relaxed text-wt-ink">
                {{ shownTranslations.has(replyKey(comment.id, reply.id)) ? translations[replyKey(comment.id, reply.id)] : reply.body }}
              </p>
              <button
                @click="toggleTranslate(replyKey(comment.id, reply.id), reply.body)"
                :disabled="translatingKeys.has(replyKey(comment.id, reply.id))"
                class="mt-1 text-[11px] font-semibold text-wt-coral hover:underline disabled:opacity-60"
              >
                <span v-if="translatingKeys.has(replyKey(comment.id, reply.id))">{{ t('comments.translating') }}</span>
                <span v-else-if="shownTranslations.has(replyKey(comment.id, reply.id))">{{ t('comments.showOriginal') }}</span>
                <span v-else>{{ t('comments.translate') }}</span>
              </button>
            </div>
          </div>

          <!-- reply form -->
          <div v-if="auth.isAuthenticated" class="flex gap-3 mt-1">
            <img
              v-if="auth.user?.avatar_url"
              :src="auth.user.avatar_url"
              :alt="auth.user.username"
              class="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
            />
            <span v-else class="w-8 h-8 rounded-full bg-wt-coral flex items-center justify-center font-bold text-white text-[13px] flex-shrink-0 mt-0.5">
              {{ (auth.user?.username || 'U')[0].toUpperCase() }}
            </span>
            <div class="flex-1 flex gap-2 items-end">
              <textarea
                v-model="replyBodies[comment.id]"
                rows="2"
                :placeholder="t('comments.replyPlaceholder')"
                class="flex-1 resize-none text-[13.5px] text-wt-ink bg-white border border-wt-line rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-wt-coral transition leading-relaxed"
              />
              <button
                @click="submitReply(comment.id)"
                :disabled="submitting[comment.id] || !replyBodies[comment.id]?.trim()"
                class="flex-shrink-0 bg-wt-coral text-white rounded-xl px-4 py-2.5 text-[13px] font-bold disabled:opacity-50 transition"
              >
                {{ submitting[comment.id] ? '…' : t('comments.send') }}
              </button>
            </div>
          </div>
          <RouterLink
            v-else
            to="/auth/login"
            class="text-[13px] text-wt-coral font-semibold no-underline hover:underline"
          >
            {{ t('comments.signInToReply') }}
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- expand button -->
    <button
      v-if="!store.loading && collapsed && !expanded && store.comments.length > 1"
      @click="expanded = true"
      class="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-2xl border border-wt-line bg-white text-[14px] font-semibold text-wt-ink hover:bg-wt-bg transition"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      {{ t('comments.seeAllReviews', store.comments.length) }}
    </button>

    <p v-if="!store.loading && !store.comments.length" class="text-[14px] text-wt-sub py-5">
      {{ t('comments.noReviewsYet') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCommentsStore } from '@/stores/comments'
import { useAuthStore } from '@/stores/auth'
import { translateText } from '@/composables/useTranslate'

const { t, locale } = useI18n()
const props = defineProps<{ citySlug: string; collapsed?: boolean }>()
const apiBase = import.meta.env.VITE_API_BASE_URL ?? ''
const TILTS = [-4, 3, -2, 5, -3, 2, -6, 4, -1, 3, -5, 2, -3, 4, -2, 1]
const store = useCommentsStore()
const auth = useAuthStore()

onMounted(() => store.fetchComments(props.citySlug))

const expanded = ref(false)
const visibleComments = computed(() =>
  props.collapsed && !expanded.value ? store.comments.slice(0, 1) : store.comments
)

const openReplies = ref<Set<number>>(new Set())
const replyBodies = reactive<Record<number, string>>({})
const submitting = reactive<Record<number, boolean>>({})
const confirmDeleteComments = ref<Set<number>>(new Set())
const confirmDeleteReplies = ref<Set<string>>(new Set())
const deleteTimers: Record<string, ReturnType<typeof setTimeout>> = {}

function replyKey(commentId: number, replyId: number) {
  return `${commentId}-${replyId}`
}

function startDeleteComment(commentId: number) {
  confirmDeleteComments.value = new Set([...confirmDeleteComments.value, commentId])
  deleteTimers[`c-${commentId}`] = setTimeout(() => cancelDeleteComment(commentId), 4000)
}

function cancelDeleteComment(commentId: number) {
  clearTimeout(deleteTimers[`c-${commentId}`])
  confirmDeleteComments.value.delete(commentId)
  confirmDeleteComments.value = new Set(confirmDeleteComments.value)
}

async function confirmComment(commentId: number) {
  cancelDeleteComment(commentId)
  await store.deleteComment(props.citySlug, commentId)
}

function startDeleteReply(commentId: number, replyId: number) {
  const key = replyKey(commentId, replyId)
  confirmDeleteReplies.value = new Set([...confirmDeleteReplies.value, key])
  deleteTimers[`r-${key}`] = setTimeout(() => cancelDeleteReply(commentId, replyId), 4000)
}

function cancelDeleteReply(commentId: number, replyId: number) {
  const key = replyKey(commentId, replyId)
  clearTimeout(deleteTimers[`r-${key}`])
  confirmDeleteReplies.value.delete(key)
  confirmDeleteReplies.value = new Set(confirmDeleteReplies.value)
}

async function confirmReply(commentId: number, replyId: number) {
  cancelDeleteReply(commentId, replyId)
  await store.deleteReply(props.citySlug, commentId, replyId)
}

function toggleReplies(commentId: number) {
  if (openReplies.value.has(commentId)) {
    openReplies.value.delete(commentId)
  } else {
    openReplies.value.add(commentId)
  }
  openReplies.value = new Set(openReplies.value)
}

async function submitReply(commentId: number) {
  const body = replyBodies[commentId]?.trim()
  if (!body) return
  submitting[commentId] = true
  try {
    await store.postReply(props.citySlug, commentId, body)
    replyBodies[commentId] = ''
  } catch {
    // keep body so user can retry
  } finally {
    submitting[commentId] = false
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// On-demand translation — proposed via a button, never automatic (per CLAUDE.md
// affiliate-credential pattern, the Google Translate key stays server-side).
const translations = reactive<Record<string, string>>({})
const translatingKeys = ref<Set<string>>(new Set())
const shownTranslations = ref<Set<string>>(new Set())

function commentKey(commentId: number) {
  return `c-${commentId}`
}

async function toggleTranslate(key: string, body: string) {
  if (shownTranslations.value.has(key)) {
    shownTranslations.value.delete(key)
    shownTranslations.value = new Set(shownTranslations.value)
    return
  }
  if (!translations[key]) {
    translatingKeys.value = new Set([...translatingKeys.value, key])
    try {
      translations[key] = await translateText(body, locale.value)
    } catch {
      return
    } finally {
      translatingKeys.value.delete(key)
      translatingKeys.value = new Set(translatingKeys.value)
    }
  }
  shownTranslations.value = new Set([...shownTranslations.value, key])
}
</script>
