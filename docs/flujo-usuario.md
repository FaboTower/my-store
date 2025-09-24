# Flujo del usuario

Este documento describe el journey típico dentro de la aplicación.

## Landing (`/`)
- Presenta la propuesta de valor con secciones como `Hero`, `FeaturesGrid`, `BrandsMarquee`, `Testimonials`, `FAQ` y `CTASection`.
- CTA primario: ir a la tienda (`/shop`).
- CTA secundario: ir al home protegido (`/home`), lo que forzará login si no hay sesión.

## Tienda (`/shop` y `/shop/:brand?`)
- Muestra productos desde `Products.all()`.
- Se puede filtrar por marca a través de la ruta dinámica: por ejemplo `/shop/logi`.
- Desde cada tarjeta se agrega al carrito mediante `useCartStore().addItem()`.

## Carrito (Drawer)
- No es una ruta. Es un panel lateral controlado por `v-model` en `CartDrawer.vue`.
- Se abre al pulsar el ícono del carrito en `Navbar.vue`.
- Permite:
  - Cambiar cantidades (`setQty(id, qty)`).
  - Eliminar items (`remove(id)`).
  - Vaciar (`clear()`).
  - Continuar al pago: navega a `/checkout`.

## Checkout (protegida)
- Ruta: `/checkout` con meta `requiresAuth`.
- Si no hay usuario, el guard redirige a `/login?redirect=/checkout`.
- Valida campos antes de permitir pagar.
- Al pagar, vacía el carrito y navega a `/order-success?id=...&total=...`.

## Login
- Ruta: `/login` con meta `guestOnly` (si ya estás logueado, te redirige a `/home`).
- Credenciales demo: `usuario1@mitienda.com` / `password`.
- Al iniciar sesión, redirige a `to.query.redirect` o a `/home` por defecto.

## Home (protegida)
- Ruta: `/home`, visible solo con sesión.
- Demuestra reutilización de componentes (`Hero`, `SectionTitle`, `Footer`).

## Éxito de compra
- Ruta: `/order-success?id=...&total=...` (protegida).
- Muestra el resumen de la compra y atajos para volver a `Home` o `Shop`.
