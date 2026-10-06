import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef } from "react";
import { BEAN, CREASE } from "./bean-data";
import { Photo } from "./Photo";
import { ScrollText } from "./ScrollText";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Proporción del grano: ancho 1, alto aproximado 0.72 (ya inclinado).
const BEAN_H = 0.72;

// La foto de la Chemex se ve a través de la silueta de un grano de café, que crece con el scroll
// hasta llenar la pantalla. Fuera del grano se ve el fondo de la página, igual que con el óvalo.
// Cuando ya está abierta, el titular se enciende letra por letra con el mismo scroll.
export function Ritual() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const clipPath = useRef<SVGPathElement>(null);
  const crease = useRef<SVGGElement>(null);
  const size = useRef({ w: 1, h: 1 });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.2, 1]);

  // Escribe la silueta directamente en el DOM: sin re-render de React en cada frame.
  const draw = (p: number) => {
    const { w, h } = size.current;
    if (!clipPath.current || !crease.current || !photo.current) return;

    const open = ease(ramp(p, 0, 0.5));
    const start = w < 768 ? w * 0.9 : Math.min(w * 0.5, h * 1.1);
    // Con esta medida el grano cubre toda la pantalla aunque esté inclinado.
    const end = Math.hypot(w, h / BEAN_H) * 1.7;
    const B = start * Math.pow(end / start, open);

    // Coordenadas relativas a la caja (objectBoundingBox): se corrige la escala para no deformar el grano.
    clipPath.current.setAttribute("transform", `translate(0.5 0.5) scale(${B / w} ${B / h})`);
    crease.current.setAttribute("transform", `translate(${w / 2} ${h / 2}) scale(${B})`);
    crease.current.style.opacity = String(1 - ramp(p, 0.04, 0.26));
    photo.current.style.clipPath = open >= 0.999 ? "none" : "url(#bean-clip)";
  };

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el || reduce) return;
    const measure = () => {
      size.current = { w: el.clientWidth, h: el.clientHeight };
      draw(scrollYProgress.get());
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useMotionValueEvent(scrollYProgress, "change", (p) => !reduce && draw(p));

  return (
    <section ref={ref} aria-labelledby="ritual-title" className={reduce ? "relative" : "relative h-[240vh]"}>
      <div ref={stage} className="sticky top-0 h-[100dvh] overflow-hidden">
        {!reduce && (
          <svg width="0" height="0" aria-hidden className="absolute">
            <defs>
              <clipPath id="bean-clip" clipPathUnits="objectBoundingBox">
                <path ref={clipPath} d={BEAN} />
              </clipPath>
            </defs>
          </svg>
        )}

        <div ref={photo} className="absolute inset-0 overflow-hidden" style={reduce ? undefined : { clipPath: "url(#bean-clip)" }}>
          <motion.div style={reduce ? undefined : { scale }} className="h-full w-full">
            <Photo name="chemex" alt="Chemex de vidrio con collar de madera" sizes="100vw" className="object-[50%_70%]" />
          </motion.div>
          <div className="absolute inset-0 bg-[#121211]/50" />
        </div>

        {/* La hendidura en S del grano lleva la frase de la marca siguiendo su curva.
            Se dibuja con el color del fondo y se desvanece al abrirse el grano. */}
        {!reduce && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
            <g ref={crease}>
              <path id="bean-crease" d={CREASE} fill="none" strokeWidth="0.006" strokeLinecap="round" style={{ stroke: "var(--paper)", strokeOpacity: 0.35 }} />
              <text
                dy="0.0175"
                fontSize="0.05"
                className="font-display"
                style={{ fill: "var(--paper)", letterSpacing: "0.05em" }}
              >
                <textPath href="#bean-crease" startOffset="50%" textAnchor="middle">
                  ¡Somos pura #Cafelicidad!
                </textPath>
              </text>
            </g>
          </svg>
        )}

        <div className="relative mx-auto flex h-full max-w-[1100px] items-center justify-center px-4 text-center text-[#f7eee7]">
          <ScrollText
            id="ritual-title"
            trigger={ref}
            from={0}
            start={() => `top+=${window.innerHeight * 0.18} top`}
            end={() => `top+=${window.innerHeight * 0.92} top`}
            className="font-display text-[clamp(2.5rem,6.4vw,6rem)] leading-[0.98]"
          >
            El café se toma con tiempo.
          </ScrollText>
        </div>
      </div>
    </section>
  );
}
