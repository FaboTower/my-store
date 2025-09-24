<script setup>
import { useRoute } from "vue-router"
import { computed, onMounted } from "vue"
import { useShopStore } from "@/stores/shop"
import { useCartStore } from "@/stores/cart"

const shop = useShopStore()
const cart = useCartStore()
const route = useRoute()

// Al montar, si no hay productos cargados (ej: usuario entra directo por URL),
// los solicitamos a la API simulada a través del store.
onMounted(() => {
  // Cargar productos si aún no existen
  if (!shop.list?.length) {
    shop.fetchAll()
  }
})

// Filtro reactivo por marca usando el parámetro dinámico de la ruta: /shop/:brand?
const filteredProducts = computed(() => {
  const products = shop.products || []
  if (!route.params.brand) return products
  return products.filter(p => p.brand.toLowerCase() === route.params.brand.toLowerCase())
})
</script>

<template>
  <section class="container mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold mb-6">Tienda</h2>

    <div v-if="!filteredProducts.length" class="alert alert-warning">
      No hay productos para esta marca.
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="p in filteredProducts" :key="p.id" class="card bg-base-100 shadow">
        <figure><img :src="p.image" :alt="p.title" /></figure>
        <div class="card-body">
          <h3 class="font-semibold">{{ p.title }}</h3>
          <p class="text-sm opacity-70">{{ p.brand }}</p>
          <p class="text-lg font-bold">\${{ p.price }}</p>
          <!-- Agrega al carrito usando el store global (Pinia) -->
          <button class="btn btn-primary mt-3" @click="cart.addItem(p)">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  </section>
</template>