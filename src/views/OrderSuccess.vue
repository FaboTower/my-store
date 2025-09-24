<script setup>
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()

const id = route.query.id?.toString() || "—"
const total = Number(route.query.total || 0)
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4 text-center">
      <div class="mx-auto max-w-xl card bg-base-100 shadow">
        <div class="card-body">
          <div class="text-5xl">🎉</div>
          <h2 class="text-2xl font-semibold">¡Compra realizada!</h2>
          <p class="mt-2 text-base-content/70">Orden <strong>#{{ id }}</strong></p>
          <p class="mt-1">Total: <strong>$ {{ total.toLocaleString() }}</strong></p>
          <div class="mt-6 flex justify-center gap-2">
            <button class="btn btn-primary" @click="router.push('/home')">Ir a Home</button>
            <button class="btn btn-ghost" @click="router.push('/shop')">Seguir comprando</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>