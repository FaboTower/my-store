<script setup>
import { computed } from "vue"
// Importa solo los íconos que vayas a usar (tree-shaking)
import { Sparkle, ShieldCheck, Search, ShoppingCart, Zap, Layers } from "lucide-vue-next"

const ICONS = { Sparkle, ShieldCheck, Search, ShoppingCart, Zap, Layers }

const props = defineProps({
  features: {
    type: Array,
    default: () => ([
      { icon: "Search",        title: "Búsqueda reactiva",   description: "Filtra por nombre y marca en tiempo real." },
      { icon: "ShoppingCart",  title: "Carrito con Pinia",   description: "Agregar, eliminar, vaciar y total persistente." },
      { icon: "ShieldCheck",   title: "Rutas protegidas",    description: "Redirección post login y guard global." },
      { icon: "Zap",           title: "UI veloz",            description: "Tailwind v4 + daisyUI para prototipos rápidos." },
    ])
  },
  cols: { type: Number, default: 3 },       // 1..4
  iconSize: { type: Number, default: 22 },  // px
  compact: { type: Boolean, default: false } // reduce paddings/size
})

const gridClass = computed(() => {
  const base = "grid gap-4"
  const map = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }
  return `${base} ${map[props.cols] ?? map[3]}`
})

const pad = computed(() => props.compact ? "p-4" : "p-6")
const titleClass = computed(() => props.compact ? "text-base font-semibold" : "text-lg font-semibold")
const descClass = "text-base-content/70"
</script>

<template>
  <section>
    <div :class="gridClass">
      <article
        v-for="(f,i) in features"
        :key="i"
        class="card bg-base-100 shadow hover:shadow-lg transition"
      >
        <div class="card-body" :class="pad">
          <div class="flex items-start gap-3">
            <!-- Ícono dinámico por nombre -->
            <component
              :is="ICONS[f.icon] || ICONS['Sparkle']"
              :size="iconSize"
              class="text-primary shrink-0"
              aria-hidden="true"
            />
            <div class="flex-1">
              <!-- Slot opcional por item para personalizar -->
              <slot name="item" :item="f">
                <h3 :class="titleClass">{{ f.title }}</h3>
                <p class="mt-1" :class="descClass">{{ f.description }}</p>
              </slot>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>