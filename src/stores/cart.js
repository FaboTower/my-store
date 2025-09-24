// stores/cart.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  const addItem = (product) => {
    const existing = items.value.find((p) => p.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      items.value.push({ ...product, qty: 1 });
    }
  };

  const removeItem = (id) => {
    items.value = items.value.filter((p) => p.id !== id);
  };

  const setQty = (id, qty) => {
    const it = items.value.find((p) => p.id === id);
    const q = Math.max(1, Number(qty) || 1);
    if (it) it.qty = q;
  };

  const total = computed(() =>
    items.value.reduce((acc, p) => acc + p.price * p.qty, 0)
  );

  const clear = () => {
    items.value = [];
  };

  const remove = (id) => removeItem(id);

  return { items, addItem, removeItem, remove, setQty, clear, total };
});