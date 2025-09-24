<script setup>
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
</script>

<template>
  <h3 class="text-xl font-semibold mb-2">Detalle del carrito</h3>
  <div v-if="cart.items.length===0" class="text-base-content/70">Tu carrito está vacío</div>

  <ul v-else class="space-y-3">
    <li v-for="it in cart.items" :key="it.id" class="card bg-base-100 shadow">
      <div class="card-body grid md:grid-cols-[96px,1fr,auto,auto] gap-4 items-center">
        <img :src="it.image" alt="" class="h-20 w-24 object-cover rounded-md" />
        <div>
          <strong>{{ it.title }}</strong>
          <div class="text-sm text-base-content/70">{{ it.brand }}</div>
          <div class="font-medium">$ {{ (it.price * it.qty).toLocaleString() }}</div>
        </div>
        <input class="input input-bordered w-24" type="number" min="1"
               :value="it.qty" @input="cart.setQty(it.id, +$event.target.value)" />
        <button class="btn btn-neutral" @click="cart.remove(it.id)">Eliminar</button>
      </div>
    </li>
  </ul>

  <div class="flex items-center justify-between mt-4">
    <strong>Total: $ {{ cart.total.toLocaleString() }}</strong>
    <div class="flex gap-2">
      <button class="btn btn-ghost" @click="cart.clear">Vaciar</button>
      <button class="btn btn-primary">Pagar</button>
    </div>
  </div>
</template>