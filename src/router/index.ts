import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/pages/index.vue') },
    { path: '/search', component: () => import('@/pages/search.vue') },
    { path: '/city/:slug', component: () => import('@/pages/city/[slug].vue') },
    { path: '/country/:slug', component: () => import('@/pages/country/[slug].vue') },
    { path: '/auth/login', component: () => import('@/pages/auth/login.vue'), meta: { hideLayout: true } },
    { path: '/auth/register', component: () => import('@/pages/auth/register.vue'), meta: { hideLayout: true } },
    { path: '/auth/google/callback', component: () => import('@/pages/auth/google-callback.vue'), meta: { hideLayout: true } },
    { path: '/auth/verify-email', component: () => import('@/pages/auth/verify-email.vue'), meta: { hideLayout: true } },
    {
      path: '/profile',
      component: () => import('@/pages/profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      component: () => import('@/pages/settings.vue'),
      meta: { requiresAuth: true },
    },
    { path: '/rgpd', component: () => import('@/pages/rgpd.vue') },
    { path: '/terms', component: () => import('@/pages/terms.vue') },
    { path: '/cookies', component: () => import('@/pages/cookies.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/auth/login', query: { redirect: to.fullPath } }
  }
})

export default router
