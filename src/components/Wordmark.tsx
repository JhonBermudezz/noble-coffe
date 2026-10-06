// Aproximación tipográfica del logotipo con Archivo condensado.
// Si la marca entrega el SVG oficial, reemplazar este componente por ese archivo.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-condensed inline-flex items-start leading-none ${className}`}>
      NOBLE
      <span className="ml-[0.06em] font-sans text-[0.22em] font-medium leading-none" aria-hidden>
        ®
      </span>
    </span>
  );
}
