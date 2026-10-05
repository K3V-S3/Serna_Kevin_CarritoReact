# Carrito de Compras – Tienda Palmira (React)

**Aprendiz:** Kevin Alexis Serna
**Ficha:** _número de ficha_
**Instructor:** Daniel Alfonso Martínez Payán
**Tecnología usada:** React 18 + Vite
**Repositorio:** _enlace del repositorio público_

Carrito de compras para TIENDA PALMIRA con validaciones de cantidad y stock en el frontend, y avisos con toasts (sin `alert()`).

## Instalar y ejecutar

```bash
git clone <enlace-del-repositorio>
cd Serna_Kevin_CarritoReact
npm install
npm run dev
```

Luego abrir la dirección que muestra la terminal (normalmente http://localhost:5173).

## Estructura

```
src/
  data/productos.js        catálogo (array JSON)
  hooks/useCarrito.js      lógica del carrito, stock y mínimos
  hooks/useToasts.js       manejo de toasts
  components/              Navbar, ProductoCard, CarritoPanel,
                           CantidadInput (reutilizable), ToastContainer
  utils/                   formato de moneda COP y mensajes
```

## Funcionalidades

- Navbar fija con el nombre de la tienda y el ícono del carrito a la derecha con contador de unidades (se oculta en 0).
- Catálogo desde un array JSON; si el producto ya está en el carrito se suma a la misma línea.
- Campo de cantidad que bloquea `e`, `E`, `+`, `-`, `.`, `,`, el 0, los negativos y el pegado de texto que no sean solo dígitos; la rueda del mouse no cambia el valor.
- Nunca se supera el stock (campo, botón `+` y agregar repetido) y aparece el toast "Este es el máximo de producto disponible en stock".
- Con cantidad 1, `−` o escribir 0 muestra un toast del mínimo con botón para eliminar; también hay un botón Quitar.
- Subtotales, total de unidades y total de la compra en COP, actualizados al instante.
- Extras: el carrito se guarda en `localStorage`, el panel se cierra con Escape y los toasts son anunciables por lectores de pantalla.

## Evidencias

| # | Funcionalidad | Captura | ¿Funciona? |
|---|---------------|---------|------------|
| 1 | Navbar e ícono con contador | evidencias/01-navbar.png | Sí |
| 2 | Agregar producto desde el catálogo | evidencias/02-agregar.png | Sí |
| 3 | Bloqueo de la tecla "e" y de negativos / 0 | evidencias/03-bloqueo.png | Sí |
| 4 | Toast de stock máximo | evidencias/04-toast-maximo.png | Sí |
| 5 | Toast de cantidad mínima con opción de eliminar | evidencias/05-toast-minimo.png | Sí |
| 6 | Subtotales y total con varios productos | evidencias/06-totales.png | Sí |
| 7 | Producto eliminado y total recalculado | evidencias/07-eliminado.png | Sí |

> Las capturas se guardan en la carpeta `evidencias/` con esos nombres.
