import { useState } from "react";
import CantidadInput from "./CantidadInput";
import { moneda } from "../utils/formato";

export default function ProductoCard({ producto, enCarrito, onAgregar, onMinimo, onMaximo }) {
  const [cantidad, setCantidad] = useState(1);
  const agotado = enCarrito >= producto.stock;

  const agregar = () => {
    onAgregar(producto, cantidad);
    setCantidad(1);
  };

  return (
    <article className="producto">
      <h3>{producto.nombre}</h3>
      <p className="producto-precio">{moneda(producto.precio)}</p>
      <p className="producto-stock">
        Stock disponible: <strong>{producto.stock}</strong>
        {enCarrito > 0 && <span className="en-carrito"> · En tu carrito: {enCarrito}</span>}
      </p>

      <div className="producto-acciones">
        <CantidadInput
          value={cantidad}
          max={producto.stock}
          onChange={setCantidad}
          onMinimo={onMinimo}
          onMaximo={onMaximo}
          etiqueta={`Cantidad de ${producto.nombre}`}
        />
        <button type="button" className="btn-primario" onClick={agregar} disabled={agotado}>
          {agotado ? "Sin stock disponible" : "Agregar"}
        </button>
      </div>
    </article>
  );
}
