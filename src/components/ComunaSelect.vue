<script setup>
import { ref, watch, computed, onMounted } from "vue"

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Selecciona tu comuna" },
  classInput: { type: String, default: "input input-bordered w-full" }
})
const emit = defineEmits(["update:modelValue"])

// Dataset breve (Región Metropolitana y ejemplos)
const COMUNAS = [
  "Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia",
  "La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo",
  "Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel",
  "Quilicura","Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Santiago",
  "Vitacura",
  // Extra ejemplo fuera RM:
  "Valparaíso","Viña del Mar","Concepción","Temuco","Antofagasta","Puerto Montt"
]

const open = ref(false)
const q = ref(props.modelValue)
const active = ref(-1) // índice resaltado

watch(() => props.modelValue, v => { q.value = v })

const options = computed(() => {
  const t = q.value.trim().toLowerCase()
  if (!t) return COMUNAS.slice(0, 8) // sugerencias
  return COMUNAS.filter(c => c.toLowerCase().includes(t)).slice(0, 8)
})

function select(val){
  emit("update:modelValue", val)
  q.value = val
  open.value = false
  active.value = -1
}

function onFocus(){ open.value = true }
function onBlur(){ setTimeout(() => open.value = false, 120) } // deja tiempo para click
function onKey(e){
  if (!open.value) open.value = true
  if (e.key === "ArrowDown"){
    e.preventDefault()
    active.value = Math.min(options.value.length - 1, active.value + 1)
  } else if (e.key === "ArrowUp"){
    e.preventDefault()
    active.value = Math.max(0, active.value - 1)
  } else if (e.key === "Enter"){
    if (active.value >= 0) { e.preventDefault(); select(options.value[active.value]) }
  } else if (e.key === "Escape"){
    open.value = false
  }
}
</script>

<template>
  <div class="relative">
    <input
      :class="classInput"
      :placeholder="placeholder"
      v-model="q"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKey"
      @input="open = true"
    />

    <ul
      v-if="open && options.length"
      class="menu bg-base-100 border rounded-box shadow w-full absolute z-10 mt-1 max-h-60 overflow-auto"
      role="listbox"
    >
      <li v-for="(c,i) in options" :key="c">
        <button
          type="button"
          class="justify-start"
          :class="i===active ? 'active' : ''"
          @mousedown.prevent="select(c)"
          @mousemove="active = i"
        >{{ c }}</button>
      </li>
    </ul>

    <div v-else-if="open && !options.length" class="absolute mt-1 text-sm text-base-content/70">
      <div class="bg-base-100 border rounded-box shadow p-2">Sin resultados</div>
    </div>
  </div>
</template>