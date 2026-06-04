import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL ?? ''}/api`,
  withCredentials: true,
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/auth/token/refresh/`,
          {},
          { withCredentials: true },
        )
        return api(original)
      } catch {
        // refresh failed — let the caller handle 401
      }
    }
    return Promise.reject(error)
  },
)

export default api
