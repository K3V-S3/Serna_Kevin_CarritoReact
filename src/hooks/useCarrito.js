import { useEffect, useMemo, useState } from "react";
import { PRODUCTOS } from "../data/productos";
import { MSG_MAXIMO, MSG_MINIMO_CARRITO, MSG_MINIMO_TARJETA } from "../utils/mensajes";

const CLAVE = "tienda-palmira-carrito";

const leerGuardado = () => {
  try {
    const data = JSON.parse(localStorage.getItem(CLAVE));
    if (!Array.isArray(data)) return [];
    // Se valida contra el catálogo por si el stock cambió
    return data
      .map((l) => {
        const p = PRODUCTOS.find((x) => x.id === l.id);
        if (!p || !Number.isInteger(l.cantidad) || l.cantidad < 1) return null;
        return { id: p.id, cantidad: Math.min(l.cantidad, p.stock) };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
};

// Lógica del carrito: líneas { id, cantidad } y todas las validaciones de stock/mínimo.
export function useCarrito({ mostrar, cerrar }) {
  const [lineas, setLineas] = useState(leerGuardado);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(lineas));
    } catch {
      /* localStorage no disponible: el carrito sigue funcionando en memoria */
    }
  }, [lineas]);

  const items = useMemo(
    () =>
      lineas.map((l) => {
        const producto = PRODUCTOS.find((p) => p.id === l.id);
        return { ...producto, cantidad: l.cantidad, subtotal: producto.precio * l.cantidad };
      }),
    [lineas]
  );

  const totalUnidades = items.reduce((acc, i) => acc + i.cantidad, 0);
  const totalCompra = items.reduce((acc, i) => acc + i.subtotal, 0);

  const cantidadEnCarrito = (id) => lineas.find((l) => l.id === id)?.cantidad ?? 0;

  const avisarMaximo = () => mostrar({ mensaje: MSG_MAXIMO, tipo: "aviso" });
  const avisarMinimoTarjeta = () => mostrar({ mensaje: MSG_MINIMO_TARJETA, tipo: "aviso" });

  const quitar = (id) => setLineas((prev) => prev.filter((l) => l.id !== id));

  // Toast del mínimo con botón para confirmar la eliminación
  const pedirEliminar = (id) => {
    const toastId = mostrar({
      mensaje: MSG_MINIMO_CARRITO,
      tipo: "aviso",
      duracion: 8000,
      accion: {
        etiqueta: "Sí, eliminar",
        onClick: () => {
          quitar(id);
          cerrar(toastId);
        },
      },
    });
  };

  // Agregar desde el catálogo: suma a la línea existente y nunca pasa del stock
  const agregar = (producto, cantidad) => {
    const actual = cantidadEnCarrito(producto.id);
    const nueva = actual + cantidad;
    const final = Math.min(nueva, producto.stock);
    if (nueva > producto.stock) avisarMaximo();

    setLineas((prev) =>
      prev.some((l) => l.id === producto.id)
        ? prev.map((l) => (l.id === producto.id ? { ...l, cantidad: final } : l))
        : [...prev, { id: producto.id, cantidad: final }]
    );
  };

  // Cambiar cantidad dentro del carrito (+, − o campo numérico)
  const fijarCantidad = (id, cantidad) => {
    setLineas((prev) => prev.map((l) => (l.id === id ? { ...l, cantidad } : l)));
  };

  const sumar = (producto) => {
    const actual = cantidadEnCarrito(producto.id);
    if (actual >= producto.stock) return avisarMaximo();
    fijarCantidad(producto.id, actual + 1);
  };

  const restar = (producto) => {
    const actual = cantidadEnCarrito(producto.id);
    if (actual <= 1) return pedirEliminar(producto.id);
    fijarCantidad(producto.id, actual - 1);
  };

  return {
    items,
    totalUnidades,
    totalCompra,
    cantidadEnCarrito,
    agregar,
    sumar,
    restar,
    fijarCantidad,
    quitar,
    pedirEliminar,
    avisarMaximo,
    avisarMinimoTarjeta,
  };
}
