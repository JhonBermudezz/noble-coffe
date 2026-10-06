import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Un solo registro para todo el sitio. GSAP vive en componentes hoja aislados
// (texto con scroll y galería horizontal); Motion se encarga del resto.
gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

// Las medidas dependen de la tipografía y de las imágenes: se recalculan cuando todo cargó.
// Sin esto, en celular la galería horizontal podía quedarse corta y esconder el final.
if (typeof window !== "undefined") {
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh);
  window.addEventListener("orientationchange", () => setTimeout(refresh, 300));
}
