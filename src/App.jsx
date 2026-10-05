import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductoCard from "./components/ProductoCard";
import CarritoPanel from "./components/CarritoPanel";
import ToastContainer from "./components/ToastContainer";
import { PRODUCTOS } from "./data/productos";
import { useToasts } from "./hooks/useToasts";
import { useCarrito } from "./hooks/useCarrito";

export default function App() {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const { toasts, mostrar, cerrar } = useToasts();
  const carrito = useCarrito({ mostrar, cerrar });

  return (
    <>
      <Navbar unidades={carrito.totalUnidades} onAbrirCarrito={() => setCarritoAbierto(true)} />

      <main className="contenido">
        <h1>Productos típicos de la región</h1>
        <section className="catalogo">
          {PRODUCTOS.map((p) => (
            <ProductoCard
              key={p.id}
              producto={p}
              enCarrito={carrito.cantidadEnCarrito(p.id)}
              onAgregar={carrito.agregar}
              onMinimo={carrito.avisarMinimoTarjeta}
              onMaximo={carrito.avisarMaximo}
            />
          ))}
        </section>
      </main>

      <CarritoPanel
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
        carrito={carrito}
      />
      <ToastContainer toasts={toasts} onCerrar={cerrar} />
    </>
  );
}
