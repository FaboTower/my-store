<script setup>
const props = defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, default: "Título de sección" },
  subtitle: { type: String, default: "" },
  align: { type: String, default: "center" }
})
</script>

<template>
  <header :class="['mx-auto mb-8', align==='center' ? 'text-center max-w-2xl' : '']">
    <p v-if="eyebrow" class="badge badge-warning mb-3">{{ eyebrow }}</p>
    <h2 class="text-2xl md:text-3xl font-semibold">{{ title }}</h2>
    <p v-if="subtitle" class="mt-2 text-base-content/70">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
p {
  color: red;
}
</style>