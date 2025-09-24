import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// Vistas
const Landing      = () => import('@/views/Landing.vue')
const Shop         = () => import('@/views/Shop.vue')
const HomePage     = () => import('@/views/HomePage.vue')     // protegida
const Login        = () => import('@/views/Login.vue')
const Checkout     = () => import('@/views/Checkout.vue')     // protegida
const OrderSuccess = () => import('@/views/OrderSuccess.vue') // protegida (si la usas)

const router = createRouter({
  // BASE_URL permite desplegar en subcarpetas (GitHub Pages u otros)
  history: createWebHistory(import.meta.env.BASE_URL), // <- importante si despliegas en subcarpeta
  routes: [
    { path: '/', name: 'landing', component: Landing }, // pública
    { path: '/shop/:brand?', name: 'shop', component: Shop, props: true }, // pública con parámetro opcional
    { path: '/home', name: 'home', component: HomePage, meta: { requiresAuth: true } }, // protegida
    { path: '/checkout', name: 'checkout', component: Checkout, meta: { requiresAuth: true } }, // protegida
    { path: '/order-success', name: 'order-success', component: OrderSuccess, meta: { requiresAuth: true } }, // protegida
    { path: '/login', name: 'login', component: Login, meta: { guestOnly: true } }, // solo invitados
    { path: '/:pathMatch(.*)*', redirect: '/' }, // catch-all
  ],
  scrollBehavior: () => ({ top: 0 }), // al navegar, vuelve al inicio
})

// Guard global de navegación: protege rutas y gestiona invitados
router.beforeEach((to) => {
  const user = useUserStore()
  const isAuth = user.isAuthenticated // ¿hay sesión?
  const needsAuth = to.matched.some(r => r.meta?.requiresAuth) // ¿ruta protegida?
  const guestOnly = to.matched.some(r => r.meta?.guestOnly) // ¿solo invitados?

  if (needsAuth && !isAuth) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (guestOnly && isAuth) {
    const target = to.query.redirect?.toString() || '/home'
    return target
  }

  return true
})

export default router