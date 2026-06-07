import axios from 'axios'
import { i18n } from '@/i18n'

// Use a relative base URL so:
// - In dev: Vite's proxy forwards /api/* to localhost:8000
// - In production: Netlify's redirect forwards /api/* to Railway
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

// Send the active locale so the backend can return pre-translated content
// (e.g. city/country descriptions) without any live translation call.
api.interceptors.request.use((config) => {
  config.params = { ...config.params, lang: i18n.global.locale.value }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        await axios.post('/api/auth/token/refresh/', {}, { withCredentials: true })
        return api(original)
      } catch {
        // refresh failed — let the caller handle 401
      }
    }
    return Promise.reject(error)
  },
)

export default api
