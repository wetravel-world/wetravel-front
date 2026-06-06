import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/composables/useApi'

export interface CommentReply {
  id: number
  author_username: string
  author_avatar_url: string
  body: string
  created_at: string
}

export interface Comment {
  id: number
  author_username: string
  author_avatar_url: string
  author_stamps: string[]
  body: string
  score: number
  created_at: string
  replies: CommentReply[]
}

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])
  const loading = ref(false)

  async function fetchComments(slug: string) {
    loading.value = true
    comments.value = []
    try {
      const { data } = await api.get(`/cities/${slug}/comments/`)
      comments.value = (data.results ?? data).map((c: Comment) => ({
        ...c,
        replies: c.replies ?? [],
      }))
    } finally {
      loading.value = false
    }
  }

  async function postComment(slug: string, payload: { body: string; score: number }) {
    const { data } = await api.post(`/cities/${slug}/comments/`, payload)
    comments.value.unshift({ ...data, replies: [] })
  }

  async function postReply(slug: string, commentId: number, body: string) {
    const { data } = await api.post(`/cities/${slug}/comments/${commentId}/replies/`, { body })
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) comment.replies.push(data)
  }

  async function deleteComment(slug: string, commentId: number) {
    await api.delete(`/cities/${slug}/comments/${commentId}/`)
    comments.value = comments.value.filter(c => c.id !== commentId)
  }

  async function deleteReply(slug: string, commentId: number, replyId: number) {
    await api.delete(`/cities/${slug}/comments/${commentId}/replies/${replyId}/`)
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) comment.replies = comment.replies.filter(r => r.id !== replyId)
  }

  return { comments, loading, fetchComments, postComment, postReply, deleteComment, deleteReply }
})
