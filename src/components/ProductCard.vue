<script setup>
import { useCartStore } from '@/stores/cart'
const props = defineProps({ product: { type: Object, required: true } })
const cart = useCartStore()
</script>

<template>
  <article class="card bg-base-100 shadow hover:shadow-lg transition">
    <figure>
      <img :src="product.image" :alt="product.title" class="h-44 w-full object-cover" />
    </figure>
    <div class="card-body">
      <div class="flex items-center gap-2">
        <span class="badge badge-warning">{{ product.brand }}</span>
        <span v-if="product.stock===0" class="badge badge-error">Sin stock</span>
      </div>
      <h4 class="card-title">{{ product.title }}</h4>
      <p class="text-base-content/70">{{ product.description }}</p>
      <div class="card-actions justify-between items-center">
        <strong>${{ product.price.toLocaleString() }}</strong>
        <button
          class="btn btn-primary"
          :disabled="product.stock===0"
          @click="cart.add(product)">
          {{ product.stock===0 ? 'Sin stock' : 'Agregar' }}
        </button>
      </div>
    </div>
  </article>
</template>