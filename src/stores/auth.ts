import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/composables/useApi'

interface User {
  id: number
  username: string
  email: string
  avatar_url: string
  is_google_auth: boolean
  date_joined: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  async function fetchMe() {
    try {
      const { data } = await api.get('/users/me/')
      user.value = data
    } catch {
      user.value = null
    }
  }

  async function register(payload: { username: string; email: string; password: string }) {
    const { data } = await api.post('/auth/register/', payload)
    user.value = data
  }

  async function login(payload: { email: string; password: string }) {
    await api.post('/auth/login/', payload)
    await fetchMe()
  }

  async function logout() {
    await api.post('/auth/logout/')
    user.value = null
  }

  async function updateProfile(payload: { username: string; email: string }) {
    const { data } = await api.patch('/users/me/', payload)
    user.value = data
  }

  async function updatePassword(payload: { current_password: string; new_password: string }) {
    await api.post('/users/me/password/', payload)
  }

  async function loginWithGoogle(idToken: string) {
    await api.post('/auth/google/', { id_token: idToken })
    await fetchMe()
  }

  return { user, isAuthenticated, fetchMe, register, login, logout, updateProfile, updatePassword, loginWithGoogle }
})
