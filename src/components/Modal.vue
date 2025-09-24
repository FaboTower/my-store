<script setup>
const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
function close(){ emit('update:modelValue', false) }
</script>

<template>
  <teleport to="body">
    <dialog v-if="props.modelValue" open class="modal modal-open">
      <div class="modal-box max-w-3xl">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="close">✕</button>
        <slot />
      </div>
      <form method="dialog" class="modal-backdrop" @click="close"><button>close</button></form>
    </dialog>
  </teleport>
</template>