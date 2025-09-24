<script setup>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import CartDrawer from "@/components/CartDrawer.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";

const drawerOpen = ref(false);
</script>

<template>
  <div>
    <ThemeToggle />
    <Navbar @open-cart="drawerOpen = true" />
    <CartDrawer v-model="drawerOpen" @checkout="$router.push('/checkout')" />
    <router-view />
  </div>
</template>