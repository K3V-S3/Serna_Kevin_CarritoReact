export default function ToastContainer({ toasts, onCerrar }) {
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.tipo}`} role="status">
          <p>{t.mensaje}</p>
          <div className="toast-botones">
            {t.accion && (
              <button type="button" className="toast-accion" onClick={t.accion.onClick}>
                {t.accion.etiqueta}
              </button>
            )}
            <button type="button" className="toast-cerrar" onClick={() => onCerrar(t.id)}
              aria-label="Cerrar mensaje">✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
