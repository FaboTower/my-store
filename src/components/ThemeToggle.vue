<script setup>
import { useTheme } from '@/composables/useTheme'
const { theme, setTheme } = useTheme()
const options = ['auto', 'light', 'pastel', 'dark', 'aqua', 'acid']
</script>

<template>
  <div class="join">
    <select class="select select-bordered join-item"
            :value="theme"
            @change="setTheme($event.target.value)">
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
    <button class="btn join-item" @click="setTheme('auto')">Auto</button>
    <button class="btn join-item" @click="setTheme('light')">Light</button>
    <button class="btn join-item" @click="setTheme('pastel')">Pastel</button>
    <button class="btn join-item" @click="setTheme('dark')">Dark</button>
    <button class="btn join-item" @click="setTheme('aqua')">Aqua</button>
    <button class="btn join-item" @click="setTheme('acid')">Acid</button>
  </div>
</template>