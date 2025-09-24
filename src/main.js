import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'

import '@/style.css'

createApp(App)
  .use(createPinia())   // <- primero Pinia
  .use(router)          // <- luego router
  .mount('#app')
