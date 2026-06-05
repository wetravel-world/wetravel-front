import axios from 'axios'

// Use a relative base URL so:
// - In dev: Vite's proxy forwards /api/* to localhost:8000
// - In production: Netlify's redirect forwards /api/* to Railway
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
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
