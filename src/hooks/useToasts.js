import { useCallback, useRef, useState } from "react";

// Maneja la lista de toasts: se cierran solos o a mano.
export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const contador = useRef(0);

  const cerrar = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const mostrar = useCallback(
    ({ mensaje, tipo = "aviso", accion = null, duracion = 4000 }) => {
      const id = ++contador.current;
      // Si ya hay un toast con el mismo mensaje se reemplaza para no apilarlos
      setToasts((prev) => [
        ...prev.filter((t) => t.mensaje !== mensaje),
        { id, mensaje, tipo, accion },
      ]);
      setTimeout(() => cerrar(id), duracion);
      return id;
    },
    [cerrar]
  );

  return { toasts, mostrar, cerrar };
}
