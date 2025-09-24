# Proyecto Tienda Vue – Módulo 6

Este proyecto corresponde al **Módulo 6: Desarrollo de Interfaces Interactivas con Vue.js**, donde se construye una **landing page + tienda** con:

- **Vue 3 + Vite**
- **Pinia** para gestión de estado
- **Vue Router** para rutas estáticas y dinámicas
- **Tailwind CSS + daisyUI** para estilos
- **Servicios simulados (API / Auth)** con Promesas

---

## 📂 Documentación de apoyo (`/docs`)

La carpeta `docs/` contiene material para entender y planificar el ejercicio antes de programar:

- [Flujo del Usuario](./docs/flujo-usuario.md) → Journey desde Landing, búsqueda, carrito y login.
- [Arquitectura](./docs/arquitectura.md) → Esquema de componentes, stores, servicios y router.
- [Checklist de Evaluación](./docs/checklist-examen.md) → Lista de verificación con todos los requisitos del examen.

---

## 🚀 Requisitos del Examen

- Búsqueda de productos por nombre.  
- Filtrar por marca mediante ruta `/shop/:brand?`.  
- Carrito con agregar, eliminar, vaciar y total calculado.  
- Popup con detalle del carrito.  
- API simulada con promesa (`Products.all()`).  
- Login simulado con promesa (`Auth.login()`).  
- Manejo de error en login + redirección post-login.  
- Navbar condicional según autenticación.  
- Persistencia en `localStorage`.  
- Flujo Git: repo, ramas, PR y merge en GitHub.

---

## 🛠️ Instalación

npm create vite@latest tienda -- --template vue
cd tienda
npm i
npm i pinia vue-router@4 tailwindcss postcss autoprefixer daisyui
npx tailwindcss init -p
npm run dev

---

## Guía rápida para estudiantes

### Ejecutar el proyecto

1. Instalar dependencias: `npm i`
2. Iniciar servidor de desarrollo: `npm run dev`
3. Abrir `http://localhost:5173`

Credenciales demo de login:
- Email: `usuario1@mitienda.com`
- Password: `password`

### Rutas principales (Vue Router)

- `/` → `Landing.vue` (pública)
- `/shop/:brand?` → `Shop.vue` (pública, `:brand` opcional para filtrar)
- `/home` → `HomePage.vue` (protegida)
- `/checkout` → `Checkout.vue` (protegida)
- `/order-success` → `OrderSuccess.vue` (protegida)
- `/login` → `Login.vue` (solo invitados)
- `/:pathMatch(.*)*` → redirige a `/`

Guard global (`src/router/index.js`):
- Si la ruta tiene `meta.requiresAuth` y no hay sesión → redirige a `/login?redirect=...`
- Si la ruta tiene `meta.guestOnly` y ya hay sesión → redirige a `/home`
- Siempre resetea scroll al top (`scrollBehavior`)

### Estado (Pinia)

- `stores/user.js`
  - `user` persistido en `localStorage`
  - `isAuthenticated`, `setUser(u)`, `logout()`
- `stores/cart.js`
  - `items[]`, `addItem`, `remove/removeItem`, `setQty`, `clear`, `total`
- `stores/shop.js`
  - `list` (alias `products`), `fetchAll()`, `brands`, `byBrand(brand)`

### Estilos (Tailwind v4 + daisyUI)

- Archivo base: `src/assets/tailwind.css`
- Temas configurados con `@plugin "daisyui"`

### Componentes clave

- `Navbar.vue` → enlaces y botón para abrir el drawer del carrito (emite `open-cart`)
- `CartDrawer.vue` → panel lateral controlado con `v-model` (`modelValue`) y evento `checkout`
- `Hero.vue`, `FeaturesGrid.vue`, `SectionTitle.vue`, `Testimonials.vue`, etc.

### Servicios simulados

- `services/api.js` → `Products.all()` devuelve productos mock con latencia
- `services/auth.js` → `Auth.login()` valida credenciales demo

---

## Documentación ampliada

- Flujo del Usuario → `docs/flujo-usuario.md`
- Arquitectura → `docs/arquitectura.md`
- Checklist de Evaluación → `docs/checklist-examen.md`

---