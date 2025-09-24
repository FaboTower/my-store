<script setup>
import { useRouter } from "vue-router"
import Hero from "@/components/Hero.vue"
import FeaturesGrid from "@/components/FeaturesGrid.vue"
import SectionTitle from "@/components/SectionTitle.vue"
import Testimonials from "@/components/Testimonials.vue"
import FAQ from "@/components/FAQ.vue"
import NewsletterForm from "@/components/NewsletterForm.vue"
import BrandsMarquee from "@/components/BrandsMarquee.vue"
import CTASection from "@/components/CTASection.vue"

const router = useRouter()
const features = [
  { icon: "Search", title: "Búsqueda por nombre", description: "Computed + v-model." },
  { icon: "Layers", title: "Rutas dinámicas", description: "/shop/:brand? filtra por marca." },
  { icon: "ShoppingCart", title: "Carrito persistente", description: "Pinia + localStorage." },
  { icon: "ShieldCheck", title: "Guard global", description: "Redirige a /login con ?redirect=." },
  { icon: "Zap", title: "UI ágil", description: "Tailwind v4 + daisyUI." },
  { icon: "Sparkle", title: "Login simulado", description: "Promesas válidas/ inválidas." }
]
</script>

<template>
  <Hero
    badge="Módulo 6"
    badgeType="secondary"
    title="Landing + Tienda con Vue 3"
    subtitle="Aprende rutas, estado y UI moderna en 3 sesiones."
    :features="['Reactividad con Composition API','Pinia para carrito','Rutas protegidas + redirección']"
    image="https://picsum.photos/seed/landing/1200/800"
    ctaPrimary="Ir a la tienda"
    ctaSecondary="Ver Home"
    @primary="() => router.push('/shop')"
    @secondary="() => router.push('/home')"
  />

  <div class="container mx-auto px-4 py-12">
    <SectionTitle eyebrow="Cejita" align="left" subtitle="soy un parrafo" />
    <FeaturesGrid :features="features" :cols="3" />
  </div>

  <BrandsMarquee />

  <Testimonials />

  <FAQ />

  <NewsletterForm />

  <CTASection
    @primary="() => router.push('/shop')"
    @secondary="() => router.push('/home')"
  />
</template>
<style>
  p {
    color: blue;
  }
</style>