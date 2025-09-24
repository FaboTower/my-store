<script setup>
const props = defineProps({
  logos: {
    type: Array,
    default: () => ([
      "https://dummyimage.com/100x28/aaa/fff&text=Vue",
      "https://dummyimage.com/100x28/aaa/fff&text=Vite",
      "https://dummyimage.com/100x28/aaa/fff&text=Pinia",
      "https://dummyimage.com/100x28/aaa/fff&text=Router",
      "https://dummyimage.com/100x28/aaa/fff&text=Tailwind",
      "https://dummyimage.com/100x28/aaa/fff&text=daisyUI",
    ])
  }
})
</script>

<template>
  <section class="py-8 bg-base-200">
    <div class="container mx-auto px-4 overflow-hidden">
      <div class="flex gap-10 animate-[scroll_25s_linear_infinite] whitespace-nowrap">
        <img v-for="(src,i) in logos" :key="i" :src="src" alt="" class="h-7 opacity-70" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
</style>