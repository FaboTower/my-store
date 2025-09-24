<script setup>
    import Feature from '@/components/Feature.vue';
    const features = [
        {
            title: 'Feature One',
            description: 'Description for feature one.',
            icon: '/icons/feature1.png'
        },
        {
            title: 'Feature Two',
            description: 'Description for feature two.',
            icon: '/icons/feature2.png'
        },
        {
            title: 'Feature Three',
            description: 'Description for feature three.',
            icon: '/icons/feature3.png'
        }
    ];
</script>
<template>
    <div>
        <h2>Unlock massive scale</h2>
        <Feature 
            v-for="(f, index) in features" 
            :key="index" 
            :title="f.title" 
            :description="f.description" 
            :icon="f.icon"
            />
    </div>
    
</template>