import { useEffect } from "react";
import CantidadInput from "./CantidadInput";
import { moneda } from "../utils/formato";

export default function CarritoPanel({ abierto, onCerrar, carrito }) {
  const {
    items, totalUnidades, totalCompra,
    sumar, restar, fijarCantidad, quitar, pedirEliminar, avisarMaximo,
  } = carrito;

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [abierto, onCerrar]);

  return (
    <>
      <div className={`overlay ${abierto ? "visible" : ""}`} onClick={onCerrar} />
      <aside
        className={`panel ${abierto ? "abierto" : ""}`}
        role="dialog"
        aria-label="Carrito de compras"
        aria-hidden={!abierto}
      >
        <div className="panel-cabecera">
          <h2>Tu carrito</h2>
          <button type="button" className="btn-icono" onClick={onCerrar} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="vacio">Aún no hay productos. Agrega alguno desde el catálogo.</p>
        ) : (
          <ul className="lineas">
            {items.map((item) => (
              <li key={item.id} className="linea">
                <div className="linea-info">
                  <strong>{item.nombre}</strong>
                  <span>{moneda(item.precio)} c/u</span>
                </div>

                <div className="linea-controles">
                  <button type="button" className="btn-cantidad" onClick={() => restar(item)}
                    aria-label={`Restar una unidad de ${item.nombre}`}>−</button>
                  <CantidadInput
                    value={item.cantidad}
                    max={item.stock}
                    onChange={(n) => fijarCantidad(item.id, n)}
                    onMinimo={() => pedirEliminar(item.id)}
                    onMaximo={avisarMaximo}
                    etiqueta={`Cantidad de ${item.nombre} en el carrito`}
                  />
                  <button type="button" className="btn-cantidad" onClick={() => sumar(item)}
                    aria-label={`Sumar una unidad de ${item.nombre}`}>+</button>
                </div>

                <div className="linea-pie">
                  <span className="subtotal">{moneda(item.subtotal)}</span>
                  <button type="button" className="btn-quitar" onClick={() => quitar(item.id)}
                    aria-label={`Quitar ${item.nombre} del carrito`}>Quitar</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="panel-totales">
          <p><span>Total de unidades</span><strong>{totalUnidades}</strong></p>
          <p className="total"><span>Total de la compra</span><strong>{moneda(totalCompra)}</strong></p>
        </div>
      </aside>
    </>
  );
}
