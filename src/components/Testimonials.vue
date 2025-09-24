<script setup>
  import SectionTitle from '@/components/SectionTitle.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => ([
      { name: "Camila", role: "Frontend", quote: "La tienda en Vue fue clarísima.", avatar: "https://i.pravatar.cc/80?img=1" },
      { name: "Rodolfo", role: "Alumno", quote: "Me encantó el popup del carrito.", avatar: "https://i.pravatar.cc/80?img=2" },
      { name: "Belén", role: "UI/UX", quote: "Tailwind + daisyUI acelera muchísimo.", avatar: "https://i.pravatar.cc/80?img=3" },
    ])
  }
})
</script>

<template>
  <section class="py-12">
    <SectionTitle eyebrow="Opiniones" title="Lo que dicen" subtitle="Feedback real de estudiantes" />
    <div class="container mx-auto px-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="(t,i) in items" :key="i" class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center gap-3">
            <img :src="t.avatar" alt="" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <p class="font-semibold">{{ t.name }}</p>
              <small class="text-base-content/70">{{ t.role }}</small>
            </div>
          </div>
          <p class="mt-3 text-base-content/80">“{{ t.quote }}”</p>
        </div>
      </article>
    </div>
  </section>
</template>