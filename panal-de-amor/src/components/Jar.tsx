import { useEffect, useRef, useState } from "react";

// Mide el ancho del frasquito para que la etiqueta (que mide en "em") quede siempre del mismo tamaño relativo.
export function useLabelSize(ratio = 0.046) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(14);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize(e.contentRect.width * ratio));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ratio]);
  return { ref, size };
}

// Todas las fotos del frasquito están alineadas en un lienzo de 640 x 853:
// el centro del frente, donde va la etiqueta, queda en (50 %, 60 %).
export const JAR_ASPECT = "640 / 853";
export const LABEL_POS = { left: "50%", top: "60%" };
