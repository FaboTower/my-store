import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
        { path: '/', component: App, name: 'Home' }
    ]
});

export default router;