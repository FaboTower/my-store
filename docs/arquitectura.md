# Arquitectura del proyecto

Este documento resume la estructura de carpetas, responsabilidades y puntos de integración clave.

## Estructura de carpetas

```
src/
  assets/
  components/
  services/
  stores/
  router/
  views/
  App.vue
  main.js
```

## Router (`src/router/index.js`)
- Historia: `createWebHistory(import.meta.env.BASE_URL)` para soportar despliegues en subcarpetas.
- Rutas principales:
  - `/` → `Landing.vue` (pública)
  - `/shop/:brand?` → `Shop.vue` (pública, parámetro opcional para filtrar)
  - `/home` → `HomePage.vue` (protegida)
  - `/checkout` → `Checkout.vue` (protegida)
  - `/order-success` → `OrderSuccess.vue` (protegida)
  - `/login` → `Login.vue` (solo invitados)
  - Catch-all → redirige a `/`.
- Guard global:
  - `requiresAuth` fuerza login si no hay sesión.
  - `guestOnly` redirige a `/home` si ya hay sesión.
  - Soporta `?redirect=` para volver a la ruta original tras el login.

## Estado con Pinia
- `stores/user.js`
  - `user` persistido en `localStorage`.
  - `isAuthenticated`, `setUser(u)`, `logout()`.
- `stores/cart.js`
  - `items[]`, `addItem(product)`, `remove(id)`, `removeItem(id)`, `setQty(id, qty)`, `clear()`, `total`.
  - Usado por `CartDrawer.vue` y `Checkout.vue`.
- `stores/shop.js`
  - `list[]` (alias `products`), `loading`, `error`.
  - `fetchAll()`, `brands`, `byBrand(brand)`.

## Servicios
- `services/api.js`: simula `Products.all()` con un set de productos mock y latencia.
- `services/auth.js`: simula `Auth.login()` con credenciales demo.

## Componentes clave
- `Navbar.vue`: navegación principal y botón de carrito. Emite `open-cart`.
- `CartDrawer.vue`: panel lateral (no ruta), controlado con `v-model` (`modelValue`). Emite `update:modelValue` y `checkout`.
- `Hero.vue`, `FeaturesGrid.vue`, `SectionTitle.vue`, etc.: bloques de UI reutilizables.

## Estilos
- Tailwind v4 + daisyUI. Archivo base: `src/assets/tailwind.css`.
- Temas de daisyUI declarados vía `@plugin`.

## Flujo de datos
- Productos → `Shop.vue` obtiene desde `useShopStore().list` y filtra por `route.params.brand`.
- Carrito → Mutaciones y total en `useCartStore()`.
- Autenticación → `useUserStore()` y guard del router.

## Consideraciones de despliegue
- Asegurar que el servidor esté configurado para SPA (fallback a `index.html`).
- Si se publica en subcarpeta (GitHub Pages u otros), revisar `base` en `vite.config.js` o `import.meta.env.BASE_URL`.
