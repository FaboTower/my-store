<script setup>
  import SectionTitle from '@/components/SectionTitle.vue';

  const props = defineProps({
  items: {
    type: Array,
    default: () => ([
      { q: "¿Cómo instalo el proyecto?", a: "Usa Vite, instala dependencias y corre npm run dev." },
      { q: "¿Dónde está el carrito?", a: "En el Navbar, con popup en CartDetail." },
      { q: "¿Necesito backend?", a: "No, usamos servicios simulados con Promesas." },
    ])
  }
})
</script>

<template>
  <section class="py-12">
    <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes" />
    <div class="container mx-auto px-4 max-w-3xl space-y-3">
      <div v-for="(f,i) in items" :key="i" class="collapse collapse-arrow bg-base-100 shadow">
        <input type="checkbox" />
        <div class="collapse-title text-lg font-medium">
          {{ f.q }}
        </div>
        <div class="collapse-content text-base-content/80">
          <p>{{ f.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>