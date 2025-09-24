<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart"
import { useUserStore } from "@/stores/user"
import ComunaSelect from "@/components/ComunaSelect.vue"

// Stores y router
const cart = useCartStore()
const user = useUserStore()
const router = useRouter()

// Si no hay items en el carrito, redirigimos a la tienda
onMounted(() => {
  if (cart.items.length === 0) router.replace("/shop")
})

// Estado del formulario: inicializa con datos del usuario cuando existen
const form = ref({
  name: user.user?.name || "",
  email: user.user?.email || "",
  address: "",
  comuna: "",   // campo con autocompletado por componente
  city: "",
  region: "",
  zip: "",
  method: "card",
  accept: false,
})

// `touched` lleva registro de qué campos fueron visitados (para mostrar errores solo después)
const touched = ref({})

// Validaciones reactivas por campo
const emailOk   = computed(() => /\S+@\S+\.\S+/.test(form.value.email))
const nameOk    = computed(() => form.value.name.trim().length >= 2)
const addrOk    = computed(() => form.value.address.trim().length >= 5)
const comunaOk  = computed(() => form.value.comuna.trim().length >= 2)
const cityOk    = computed(() => form.value.city.trim().length >= 2)
const regionOk  = computed(() => form.value.region.trim().length >= 2)
const zipOk     = computed(() => form.value.zip.trim().length >= 3)

// Todos los requeridos válidos
const requiredOk = computed(() =>
  nameOk.value && emailOk.value && addrOk.value && comunaOk.value && cityOk.value && regionOk.value && zipOk.value
)

// Form válido: requeridos + aceptación de términos + carrito con items
const isValid = computed(() =>
  requiredOk.value && form.value.accept && cart.items.length > 0
)

// Helper de clases de input según validación
function cls(ok, key){
  const base = "input input-bordered"
  if (!touched.value[key]) return base
  return ok ? `${base} input-success` : `${base} input-error`
}

// Acción de pago: marca campos como tocados, valida y navega a order-success
function payNow(e) {
  e.preventDefault()
  Object.keys(form.value).forEach(k => touched.value[k] = true)
  if (!isValid.value) return
  const orderId = Math.floor(Math.random() * 900000 + 100000).toString()
  const total = cart.total
  cart.clear()
  router.push({ name: "order-success", query: { id: orderId, total } })
}
</script>

<template>
  <section class="py-10">
    <div class="container mx-auto px-4 grid gap-8 lg:grid-cols-[2fr,1fr]">

      <!-- Formulario -->
      <form class="card bg-base-100 shadow" @submit="payNow" novalidate>
        <div class="card-body">
          <h2 class="card-title">Datos de facturación</h2>

          <div class="grid md:grid-cols-2 gap-4">
            <!-- Nombre -->
            <div class="form-control">
              <label class="label"><span class="label-text">Nombre completo</span></label>
              <input
                :class="cls(nameOk,'name')"
                v-model.trim="form.name"
                placeholder="Tu nombre"
                @blur="touched.name = true" />
              <label v-if="touched.name && !nameOk" class="label">
                <span class="label-text-alt text-error">Ingresa al menos 2 caracteres.</span>
              </label>
            </div>

            <!-- Email -->
            <div class="form-control">
              <label class="label"><span class="label-text">Correo</span></label>
              <input
                :class="cls(emailOk,'email')"
                v-model.trim="form.email"
                type="email"
                placeholder="tu@email.com"
                @blur="touched.email = true" />
              <label v-if="touched.email && !emailOk" class="label">
                <span class="label-text-alt text-error">Correo inválido.</span>
              </label>
            </div>

            <!-- Dirección -->
            <div class="form-control md:col-span-2">
              <label class="label"><span class="label-text">Dirección</span></label>
              <input
                :class="cls(addrOk,'address')"
                v-model.trim="form.address"
                placeholder="Calle 123, depto 45"
                @blur="touched.address = true" />
              <label v-if="touched.address && !addrOk" class="label">
                <span class="label-text-alt text-error">Ingresa una dirección más específica.</span>
              </label>
            </div>

            <!-- Comuna (Autocomplete) -->
            <div class="form-control">
              <label class="label"><span class="label-text">Comuna</span></label>
              <ComunaSelect
                v-model="form.comuna"
                :class-input="cls(comunaOk,'comuna')"
                @blur.native="touched.comuna = true" />
              <label v-if="touched.comuna && !comunaOk" class="label">
                <span class="label-text-alt text-error">Selecciona tu comuna.</span>
              </label>
            </div>

            <!-- Ciudad -->
            <div class="form-control">
              <label class="label"><span class="label-text">Ciudad</span></label>
              <input
                :class="cls(cityOk,'city')"
                v-model.trim="form.city"
                @blur="touched.city = true" />
              <label v-if="touched.city && !cityOk" class="label">
                <span class="label-text-alt text-error">Ingresa una ciudad válida.</span>
              </label>
            </div>

            <!-- Región -->
            <div class="form-control">
              <label class="label"><span class="label-text">Región</span></label>
              <input
                :class="cls(regionOk,'region')"
                v-model.trim="form.region"
                @blur="touched.region = true" />
              <label v-if="touched.region && !regionOk" class="label">
                <span class="label-text-alt text-error">Ingresa una región válida.</span>
              </label>
            </div>

            <!-- Zip -->
            <div class="form-control">
              <label class="label"><span class="label-text">Código Postal</span></label>
              <input
                :class="cls(zipOk,'zip')"
                v-model.trim="form.zip"
                @blur="touched.zip = true" />
              <label v-if="touched.zip && !zipOk" class="label">
                <span class="label-text-alt text-error">Mínimo 3 caracteres.</span>
              </label>
            </div>
          </div>

          <div class="divider">Pago</div>

          <div class="join join-vertical md:join-horizontal">
            <label class="btn btn-outline join-item" :class="form.method==='card' && 'btn-active'">
              <input type="radio" name="method" value="card" class="hidden" v-model="form.method" />
              Tarjeta
            </label>
            <label class="btn btn-outline join-item" :class="form.method==='transfer' && 'btn-active'">
              <input type="radio" name="method" value="transfer" class="hidden" v-model="form.method" />
              Transferencia
            </label>
          </div>

          <label class="label cursor-pointer mt-2">
            <input type="checkbox" class="checkbox checkbox-primary mr-3" v-model="form.accept" />
            <span class="label-text">Acepto términos y condiciones</span>
          </label>

          <button class="btn btn-primary mt-4" :disabled="!isValid">Pagar ahora</button>
          <p v-if="!requiredOk" class="text-xs text-base-content/70 mt-2">Completa los campos obligatorios.</p>
        </div>
      </form>

      <!-- Resumen (igual que antes) -->
      <aside class="card bg-base-100 shadow self-start">
        <div class="card-body">
          <h3 class="card-title">Resumen</h3>
          <ul class="space-y-3 max-h-[50vh] overflow-auto">
            <li v-for="it in cart.items" :key="it.id" class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <img :src="it.image" alt="" class="h-12 w-14 object-cover rounded" />
                <div>
                  <div class="font-medium">{{ it.title }}</div>
                  <div class="text-xs opacity-70">x{{ it.qty }} · {{ it.brand }}</div>
                </div>
              </div>
              <div class="font-semibold">$ {{ (it.qty * it.price).toLocaleString() }}</div>
            </li>
          </ul>
          <div class="mt-4 border-t pt-3 flex items-center justify-between">
            <span>Total</span>
            <strong class="text-lg">$ {{ cart.total.toLocaleString() }}</strong>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>