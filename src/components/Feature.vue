<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        title: String,
        description: String,
        icon: String
    });
</script>
<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
        <img :src="icon" class="w-12 h-12 mb-4"/>
        <h3 class="card-title">{{ title }}</h3>
        <p>{{  description }}</p>
    </div>
  </div>
</template>