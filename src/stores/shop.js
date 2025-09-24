import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Products } from '@/services/api'

export const useShopStore = defineStore('shop', () => {
  const list = ref([])          // <- siempre array
  const loading = ref(false)
  const error = ref(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const res = await Products.all()
      list.value = Array.isArray(res) ? res : []   // <- nunca undefined
    } catch (e) {
      error.value = e?.message || 'Error al cargar productos'
      list.value = []
    } finally {
      loading.value = false
    }
  }

  const brands = computed(() => {
    const s = new Set((list.value || []).map(p => p.brand))
    return Array.from(s)
  })

  function byBrand(brand) {
    const arr = list.value || []                   // <- fallback
    if (!brand) return arr
    const b = brand.toLowerCase()
    return arr.filter(p => (p.brand || '').toLowerCase() === b)
  }

  return { 
    list, 
    products: list, // alias para compatibilidad
    loading, 
    error, 
    fetchAll, 
    brands, 
    byBrand 
  }
})