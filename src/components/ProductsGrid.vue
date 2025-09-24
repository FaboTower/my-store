<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Products } from '@/services/api'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const router = useRouter()

const q = ref('')
const list = ref([])
const loading = ref(true)

onMounted(async () => {
  list.value = await Products.all()
  loading.value = false
})

function onSearch(e) { e.preventDefault() }

const selectedBrand = computed(() => route.params.brand?.toString() || '')

const brands = computed(() => {
  const set = new Set(list.value.map(p => p.brand))
  return Array.from(set)
})

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return list.value
    .filter(p => p.stock > 0) // solo con stock
    .filter(p => !selectedBrand.value || p.brand.toLowerCase() === selectedBrand.value.toLowerCase())
    .filter(p => !term || p.title.toLowerCase().includes(term))
})

function goBrand(brand) {
  // toggle brand: si ya estoy en esa marca, quitar filtro
  if (brand && brand.toLowerCase() === selectedBrand.value.toLowerCase()) {
    router.push({ name: 'shop' })
  } else {
    router.push({ name: 'shop', params: { brand } })
  }
}
</script>

<template>
  <!-- Controles -->
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <form class="join w-full md:w-auto" @submit="onSearch">
      <input class="input input-bordered join-item w-full md:w-80" v-model="q" placeholder="Buscar por nombre" />
      <button class="btn btn-primary join-item" type="submit">Buscar</button>
    </form>

    <!-- Chips de marcas -->
    <div class="flex flex-wrap gap-2">
      <button
        class="btn btn-xs"
        :class="selectedBrand ? 'btn-ghost' : 'btn-active btn-neutral'"
        @click="goBrand('')">Todas</button>

      <button
        v-for="b in brands" :key="b"
        class="btn btn-xs"
        :class="selectedBrand.toLowerCase() === b.toLowerCase() ? 'btn-active btn-neutral' : 'btn-ghost'"
        @click="goBrand(b)">{{ b }}</button>
    </div>
  </div>

  <!-- Estado -->
  <p v-if="loading" class="mt-3 text-base-content/70">Cargando productos…</p>
  <p v-else-if="filtered.length===0" class="mt-3 text-base-content/70">No hay resultados.</p>

  <!-- Grid -->
  <section class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
  </section>
</template>