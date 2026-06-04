import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initMatomo, trackPageView } from './composables/useMatomo'
import './assets/main.css'

initMatomo()

router.afterEach((to) => {
  trackPageView(to.fullPath, document.title)
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')