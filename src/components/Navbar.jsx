export default function Navbar({ unidades, onAbrirCarrito }) {
  return (
    <header className="navbar">
      <span className="navbar-marca">Tienda Palmira</span>
      <button
        type="button"
        className="carrito-btn"
        onClick={onAbrirCarrito}
        aria-label={`Abrir carrito, ${unidades} ${unidades === 1 ? "unidad" : "unidades"}`}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20.5 7H6" />
        </svg>
        {unidades > 0 && <span className="contador">{unidades}</span>}
      </button>
    </header>
  );
}
