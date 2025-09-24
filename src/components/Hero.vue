<script setup>
import { computed } from "vue"

const props = defineProps({
    badge: { type: String, default: "Nuevo" },
    badgeType: {
        type: String,
        default: "warning",
        validator: v => ["primary","secondary","accent","neutral","success","warning","info","error","ghost","outline"].includes(v)
    },
    title: { type: String, default: "Todos tus datos cualitativos. Un solo lugar." },
    subtitle: { type: String, default: "Busca, filtra y actúa en segundos con una interfaz simple y escalable." },
    image: { type: String, default: "https://picsum.photos/seed/hero/960/720" },
    ctaPrimary: { type: String, default: "Comenzar ahora" },
    ctaSecondary: { type: String, default: "Ver demo" },
    features: {
        type: Array,
        default: () => [
            "Búsquedas reactivas con Vue 3",
            "Estado global con Pinia",
            "Rutas protegidas con Vue Router"
        ]
    },
  invertOnMobile: { type: Boolean, default: false },
  /** Nuevo: variante compacta (menos padding y alturas menores) */
  compact: { type: Boolean, default: false },
  /** Nuevo: si se provee, renderiza un embed de video en el overlay (YouTube/Vimeo) */
  videoUrl: { type: String, default: "" },
  /** Opciones del reproductor: sólo aplican si hay videoUrl */
  videoTitle: { type: String, default: "Video de demostración" },
})

const emit = defineEmits(["primary", "secondary"])

const badgeVariants = {
  primary:  "badge-primary",
  secondary:"badge-secondary",
  accent:   "badge-accent",
  neutral:  "badge-neutral",
  success:  "badge-success",
  warning:  "badge-warning",
  info:     "badge-info",
  error:    "badge-error",
  ghost:    "badge-ghost",
  outline:  "badge-outline",
}


const gridClasses = computed(() =>
  `grid items-center gap-8 md:grid-cols-2 ${props.invertOnMobile ? "md:[&>div:first-child]:order-1" : ""}`
)

const badgeClass = computed(() => badgeVariants[props.badgeType] || "badge-ghost")


const sectionPad = computed(() => props.compact ? "py-10" : "py-16")
const imageHeight = computed(() => props.compact ? "h-[220px] md:h-[340px]" : "h-[300px] md:h-[440px]")
</script>

<template>
  <section class="bg-gradient-to-b from-base-200 to-base-100">
    <div class="container mx-auto px-4" :class="sectionPad">
      <div :class="gridClasses">
        <!-- Columna de texto -->
        <div>
          <div :class="['badge','mb-3', badgeClass]">{{ badge }}</div>
  <span class="badge bg-secondary text-secondary-content">Secundaria (bg/text)</span>

          <h1 class="text-4xl/tight md:text-5xl font-semibold">
            {{ title }}
          </h1>
          <p class="mt-4 text-base md:text-lg text-base-content/70">
            {{ subtitle }}
          </p>

          <ul class="mt-5 space-y-2 text-base-content/80" v-if="features?.length">
            <li v-for="(feat, i) in features" :key="i" class="flex items-start gap-2">
              <span class="mt-1 inline-block size-2 rounded-full bg-primary"></span>
              <span>{{ feat }}</span>
            </li>
          </ul>

          <div class="mt-6 flex flex-wrap gap-3">
            <button class="btn btn-primary" @click="emit('primary')">
              {{ ctaPrimary }}
            </button>
            <button class="btn btn-outline" @click="emit('secondary')">
              {{ ctaSecondary }}
            </button>
          </div>

          <!-- Slot opcional: contenido adicional bajo los CTAs -->
          <div class="mt-6">
            <slot name="extra"></slot>
          </div>
        </div>

        <!-- Columna visual -->
        <div class="relative">
          <!-- Glow decorativo -->
          <div class="pointer-events-none absolute -inset-4 -z-10 blur-3xl opacity-40"
               style="background: radial-gradient(40% 40% at 60% 40%, hsl(var(--p)/.35), transparent 70%);">
          </div>

          <!-- Tarjeta visual base -->
          <figure class="card bg-base-100 shadow-xl overflow-hidden">
            <img :src="image" alt="Hero image" class="rounded-box object-cover w-full" :class="imageHeight" />
          </figure>

          <!-- Overlay: si pasas videoUrl, incrusta el video encima de la imagen -->
          <div v-if="videoUrl" class="absolute inset-0 p-3 md:p-6 flex">
            <div class="w-full rounded-box overflow-hidden shadow-2xl bg-base-100/80 backdrop-blur">
              <div class="relative w-full" style="padding-top: 56.25%;">
                <iframe
                  class="absolute inset-0 w-full h-full"
                  :src="videoUrl"
                  :title="videoTitle"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>

          <!-- Slot para superponer cualquier contenido personalizado -->
          <slot name="overlay"></slot>
        </div>
      </div>
    </div>
  </section>
</template>