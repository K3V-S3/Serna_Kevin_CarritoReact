import { useEffect, useState } from "react";

const TECLAS_BLOQUEADAS = ["e", "E", "+", "-", ".", ","];

/**
 * Campo de cantidad reutilizable (catálogo y carrito).
 * - Solo enteros positivos (bloquea e, E, +, -, . y ,)
 * - Pegado: solo se acepta si son únicamente dígitos
 * - La rueda del mouse no cambia el valor
 * - 0 -> onMinimo(), mayor al máximo -> se corrige y onMaximo()
 */
export default function CantidadInput({ value, max, onChange, onMinimo, onMaximo, etiqueta }) {
  const [texto, setTexto] = useState(String(value));

  // Mantiene el texto sincronizado cuando el valor cambia desde afuera (botones +/−)
  useEffect(() => {
    setTexto(String(value));
  }, [value]);

  const manejarTecla = (e) => {
    if (TECLAS_BLOQUEADAS.includes(e.key)) e.preventDefault();
  };

  const manejarPegado = (e) => {
    const pegado = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pegado)) e.preventDefault();
  };

  const manejarCambio = (e) => {
    const nuevo = e.target.value;

    // Se permite borrar para escribir otro número; al salir del campo se restaura
    if (nuevo === "") return setTexto("");
    if (!/^\d+$/.test(nuevo)) return; // por si algo se cuela (móviles, arrastrar texto)

    const numero = parseInt(nuevo, 10);

    if (numero < 1) {
      setTexto(String(value)); // conserva el valor anterior
      onMinimo();
      return;
    }
    if (numero > max) {
      setTexto(String(max));
      onChange(max);
      onMaximo();
      return;
    }
    setTexto(String(numero));
    onChange(numero);
  };

  const manejarSalida = () => {
    if (texto === "") setTexto(String(value));
  };

  return (
    <input
      className="cantidad-input"
      type="number"
      inputMode="numeric"
      min="1"
      max={max}
      step="1"
      value={texto}
      aria-label={etiqueta}
      onKeyDown={manejarTecla}
      onPaste={manejarPegado}
      onChange={manejarCambio}
      onBlur={manejarSalida}
      onWheel={(e) => e.currentTarget.blur()}
    />
  );
}
