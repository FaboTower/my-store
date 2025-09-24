# Checklist de evaluación

Usa esta lista para verificar que todo está correcto antes de entregar.

## Funcionalidad básica
- [ ] Landing accesible en `/` con secciones visibles (Hero, Features, etc.).
- [ ] Tienda accesible en `/shop` y filtra por marca en `/shop/:brand?`.
- [ ] Agregar productos al carrito desde la tienda.
- [ ] Drawer de carrito se abre desde el Navbar y muestra ítems, cantidades y total.
- [ ] Cambiar cantidad (`setQty`), eliminar (`remove`) y vaciar (`clear`).
- [ ] Botón "Ir a pagar" navega a `/checkout`.

## Autenticación y guards
- [ ] `/home`, `/checkout` y `/order-success` requieren sesión.
- [ ] Si no hay sesión y se entra a una protegida, redirige a `/login?redirect=...`.
- [ ] En `/login`, si se inicia sesión correctamente, redirige a `redirect` o `/home`.
- [ ] Si ya hay sesión, `/login` redirige a `/home` (guestOnly).
- [ ] Botón de logout vuelve a estado no autenticado y redirige a `/`.

## Checkout y orden
- [ ] Validaciones de formulario: nombre, email, dirección, comuna, ciudad, región, zip.
- [ ] No permite pagar si faltan datos o no hay items.
- [ ] Al pagar, limpia el carrito y redirige a `/order-success?id=...&total=...`.

## Estado (Pinia)
- [ ] `user` persistido en `localStorage` (login/logout funcionan).
- [ ] `cart` con `items`, `addItem`, `remove/removeItem`, `setQty`, `clear` y `total`.
- [ ] `shop` carga productos desde `Products.all()` y expone `list` (alias `products`).

## UI y navegación
- [ ] Navbar muestra enlaces y contador del carrito.
- [ ] Enlace "Inicio" lleva a `/`.
- [ ] Enlace "Tienda" lleva a `/shop`.
- [ ] Enlace "Home" visible solo con sesión.
- [ ] `scrollBehavior` resetea al top en cada navegación.

## Código y proyecto
- [ ] `vite` corre en `http://localhost:5173`.
- [ ] `tailwind + daisyUI` aplican estilos.
- [ ] `import.meta.env.BASE_URL` configurado en router para despliegue en subcarpeta.
- [ ] Estructura de carpetas y archivos coincide con la documentación.

## Credenciales de prueba
- Email: `usuario1@mitienda.com`
- Password: `password`
