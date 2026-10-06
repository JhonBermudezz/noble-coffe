import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Un solo registro para todo el sitio. GSAP vive en componentes hoja aislados
// (texto con scroll y galería horizontal); Motion se encarga del resto.
gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";
