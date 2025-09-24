<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth } from '@/services/auth'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const user = useUserStore()
const route = useRoute()
const router = useRouter()

async function onSubmit(e) {
  e.preventDefault()
  loading.value = true
  error.value = ''
  try {
    const u = await Auth.login({ email: email.value, password: password.value })
    user.setUser(u)
    // Regresar a donde el usuario quería ir o a /home
    router.push(route.query.redirect?.toString() || '/home')
  } catch (err) {
    error.value = err.message || 'Error de autenticación'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="py-10">
    <div class="container mx-auto px-4 max-w-md">
      <h2 class="text-2xl font-semibold mb-4">Iniciar sesión</h2>

      <form class="grid gap-3" @submit="onSubmit">
        <input class="input input-bordered" v-model="email" type="email" placeholder="Correo" required />
        <input class="input input-bordered" v-model="password" type="password" placeholder="Contraseña" required />
        <button class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Validando…' : 'Ingresar' }}
        </button>
        <p v-if="error" class="text-error">{{ error }}</p>
        <p class="text-xs opacity-70">
          Prueba con <strong>usuario1@mitienda.com</strong> / <strong>password</strong>
        </p>
      </form>
    </div>
  </section>
</template>