<script setup>
import { ref, computed } from "vue"

const email = ref("")
const ok = computed(() => /\S+@\S+\.\S+/.test(email.value))

function subscribe() {
  if (!ok.value) return
  alert(`Suscrito: ${email.value}`)
  email.value = ""
}
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 shadow">
        <div class="card-body md:flex md:items-center md:justify-between gap-4">
          <div>
            <h3 class="text-xl font-semibold">Recibe tips y actualizaciones</h3>
            <p class="text-base-content/70">Vue 3, rutas, Pinia y UI directo a tu correo.</p>
          </div>
          <form class="join" @submit.prevent="subscribe">
            <input class="input input-bordered join-item" v-model="email" placeholder="tu@email.com"/>
            <button class="btn btn-primary join-item" :disabled="!ok">Suscribirme</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>