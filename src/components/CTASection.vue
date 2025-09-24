<script setup>
const props = defineProps({
  title: { type: String, default: "¿Listo para empezar?" },
  subtitle: { type: String, default: "Construye la tienda con Vue 3 hoy mismo." },
  primary: { type: String, default: "Ir a la tienda" },
  secondary: { type: String, default: "Ver Home" }
})
const emit = defineEmits(["primary","secondary"])
</script>

<template>
  <section class="py-16 bg-gradient-to-tr from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center max-w-2xl">
      <h3 class="text-2xl md:text-3xl font-semibold">{{ title }}</h3>
      <p class="mt-2 text-base-content/70">{{ subtitle }}</p>
      <div class="mt-5 flex justify-center gap-3">
        <button class="btn btn-primary" @click="emit('primary')">{{ primary }}</button>
        <button class="btn btn-outline" @click="emit('secondary')">{{ secondary }}</button>
      </div>
    </div>
  </section>
</template>