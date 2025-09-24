# Vue
## Componentes

MODO JS
```
function Card({ title, price }){
    const element = document.createElement('div');
    element.className = 'card'
    element.innerHTML = `<h3>${ title }</h3><p>${ price }</p>`
    return element;
}

document.querySelector('#app').appendChild(Card({ title: 'My Titulo', price: 10000 }));

```

MODO VUE
```
<script setup>
    defineProps({ title: String, price: Number })
</script>

<template>
    <div class='card'>
        <h3>{{ title }}</h3>
        <p>{{ price }}</p>
    </div>
</template>

```
--Components
--Props
--Emits
--Refs
--Computed
--Stores
--router
--Services
