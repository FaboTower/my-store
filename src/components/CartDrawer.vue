<script setup>
import { watch, onMounted, onBeforeUnmount } from "vue"
import { useCartStore } from "@/stores/cart"

// API del componente
// - modelValue: controla si el drawer está abierto (v-model desde App.vue)
// - update:modelValue: emitido para cerrar/abrir desde dentro
// - checkout: emitido cuando el usuario quiere ir a pagar
const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(["update:modelValue", "checkout"])

const cart = useCartStore()

// Helpers de interacción
function close() { emit("update:modelValue", false) }
function onKey(e) { if (e.key === "Escape") close() } // cerrar con ESC

// Bloquear scroll del documento cuando el drawer está abierto
const toggleScrollLock = (on) => {
  const el = document.documentElement // podría ser document.body también
  if (on) el.classList.add("overflow-hidden")
  else el.classList.remove("overflow-hidden")
}

// Sincroniza el bloqueo de scroll con el estado del drawer
watch(() => props.modelValue, (open) => toggleScrollLock(open), { immediate: true })

// Registrar/limpiar listeners de teclado
onMounted(() => window.addEventListener("keydown", onKey))
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey)
  toggleScrollLock(false)
})
</script>
<template>
  <!-- Usamos teleport para renderizar el overlay/panel al final del body,
       evitando issues de stacking context dentro del árbol de App.vue -->
  <teleport to="body">
    <!-- Overlay -->
    <!-- Overlay semitransparente para cerrar al hacer click -->
    <!-- La transición se encarga de animar la opacidad del overlay -->
    <!-- El overlay se renderiza solo cuando el drawer está abierto -->
    <transition enter-active-class="transition duration-200"
                enter-from-class="opacity-0"
                leave-active-class="transition duration-200"
                leave-to-class="opacity-0">
      <div v-if="modelValue"
             class="fixed inset-0 bg-black/40 z-[60]"
             @click="close" />
    </transition>

    <!-- Panel -->
    <!-- Panel lateral derecho (drawer) -->
    <!-- La transición se encarga de animar la posición del panel -->
    <!-- El panel se renderiza solo cuando el drawer está abierto -->
    <transition enter-active-class="transition duration-200"
                enter-from-class="translate-x-full"
                leave-active-class="transition duration-200"
                leave-to-class="translate-x-full">
      <aside v-if="modelValue"
             class="fixed right-0 top-0 h-dvh w-[92vw] sm:w-[420px] bg-base-100 z-[61] shadow-xl flex flex-col">
        <!-- Header -->
        <header class="px-4 py-3 border-b flex items-center justify-between">
          <h3 class="text-lg font-semibold">Tu carrito</h3>
          <button class="btn btn-sm btn-ghost" @click="close">✕</button>
        </header>

        <!-- Content -->
        <!-- Lista de items del carrito con acciones: setQty / remove -->
        <div class="flex-1 overflow-auto p-4">
          <p v-if="cart.items.length===0" class="text-base-content/70">Tu carrito está vacío</p>

          <ul v-else class="space-y-3">
            <li v-for="it in cart.items" :key="it.id" class="card bg-base-100 border">
              <div class="card-body grid grid-cols-[72px,1fr,auto] gap-3 items-center">
                <img :src="it.image" alt=""
                     class="h-16 w-18 object-cover rounded-md" />
                <div>
                  <div class="font-medium">{{ it.title }}</div>
                  <div class="text-xs text-base-content/70">{{ it.brand }}</div>
                  <div class="text-sm font-semibold">$ {{ (it.price * it.qty).toLocaleString() }}</div>
                </div>
                <div class="flex items-center gap-2">
                  <input class="input input-bordered w-20"
                         type="number" min="1"
                         :value="it.qty"
                         @input="cart.setQty(it.id, +$event.target.value)" />
                  <button class="btn btn-ghost btn-sm" @click="cart.remove(it.id)">🗑️</button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Footer: total y acciones (vaciar / ir a pagar) -->
        <footer class="p-4 border-t space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">Total</span>
            <strong class="text-lg">$ {{ cart.total.toLocaleString() }}</strong>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-ghost flex-1" @click="cart.clear" :disabled="!cart.items.length">Vaciar</button>
            <button class="btn btn-primary flex-1" @click="$emit('checkout')" :disabled="!cart.items.length">
              Ir a pagar
            </button>
          </div>
        </footer>
      </aside>
    </transition>
  </teleport>
</template>