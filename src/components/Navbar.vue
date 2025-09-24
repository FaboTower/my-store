<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const emit = defineEmits(['open-cart', 'toggle-drawer', 'search'])
const q = ref('')

const cart = useCartStore()
const cartCount = computed(() => cart.items.reduce((a, it) => a + it.qty, 0))

const user = useUserStore()
const isAuth = computed(() => user.isAuthenticated)

const router = useRouter()
function goLogin(){ router.push({ name: 'login' }) }
function goHome(){ router.push({ name: 'home' }) }
function doLogout(){ user.logout(); router.push({ name: 'landing' }) }
</script>
<template>
  <div class="navbar bg-base-100 border-b border-base-200">
    <div class="navbar-start">
      <button class="btn btn-ghost lg:hidden" @click="emit('toggle-drawer')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>

      <!-- Brand -->
      <RouterLink :to="{ name: 'landing' }" class="btn btn-ghost text-xl font-semibold">
        MyStore
      </RouterLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal gap-2">
        <li>
          <RouterLink :to="{ name: 'landing' }" class="px-3 py-2 rounded-btn hover:bg-base-200" active-class="bg-primary text-primary-content">
            Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'shop' }" class="px-3 py-2 rounded-btn hover:bg-base-200" active-class="bg-primary text-primary-content">
            Tienda
          </RouterLink>
        </li>
        <li v-if="isAuth">
          <RouterLink :to="{ name: 'home' }" class="px-3 py-2 rounded-btn hover:bg-base-200" active-class="bg-primary text-primary-content">
            Home
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <!-- Buscador (opcional) -->
      <div class="form-control hidden md:block">
        <input type="text" placeholder="Buscar…" class="input input-bordered w-40 md:w-64"
               v-model="q" @keydown.enter="emit('search', q)">
      </div>

      <!-- Carrito: abre Drawer (no ruta 'carrito') -->
      <button class="btn btn-ghost btn-circle ml-2 indicator" @click="emit('open-cart')">
        <span v-if="cartCount" class="indicator-item badge badge-primary">{{ cartCount }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/>
        </svg>
      </button>

      <!-- Sesión -->
      <button v-if="!isAuth" class="btn btn-primary ml-2" @click="goLogin">Login</button>
      <div v-else class="dropdown dropdown-end ml-2">
        <div tabindex="0" role="button" class="btn">Usuario</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box shadow w-44 mt-2">
          <li><a @click="goHome">Mi inicio</a></li>
          <li><a @click="doLogout">Salir</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
