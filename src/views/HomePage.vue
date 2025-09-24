<script setup>
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Hero from '@/components/Hero.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import Testimonials from '@/components/Testimonials.vue'

const router = useRouter()
</script>

<template>
  <Hero
    title="Explora la app"
    subtitle="Puedes superponer un mockup propio sin tocar el componente."
    image="https://picsum.photos/seed/mock/1200/800"
    ctaPrimary="Abrir demo"
    ctaSecondary="Documentación"
    @primary="() => router.push('/home')"
    @secondary="() => router.push('/shop')"
  >
    <template #overlay>
      <div class="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-8">
        <div class="bg-base-100/90 backdrop-blur rounded-box shadow-xl p-4">
          <p class="text-sm text-base-content/70">
            Overlay custom: aquí puedes poner un gráfico, un contador o un mini-form.
          </p>
        </div>
      </div>
    </template>
  </Hero>
  <SectionTitle />
  <Footer />
</template>