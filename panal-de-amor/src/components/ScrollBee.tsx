import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { img } from "../data";

// La abejita acompaña el scroll y cruza la pantalla de lado a lado: mientras la persona baja, va y viene
// de un borde al otro, sube y baja un poco, mira hacia donde vuela y deja corazoncitos en el camino.
// No recibe clics, para no estorbar lo que haya debajo.
const HEART = `<svg viewBox="0 0 24 22" width="100%" height="100%"><path d="M12 21S1 14 1 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 7-11 14-11 14z" fill="COLOR"/></svg>`;
const COLORS = ["#f7c64a", "#d63c7c", "#e9a426", "#f4a6c4"];
const SWEEPS = 7; // cuántas veces cruza la pantalla de un lado al otro en toda la página

export function ScrollBee() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  // De borde a borde (en vw, descontando el tamaño de la abeja).
  const left = useTransform(p, (v) => `calc(${(0.5 - 0.5 * Math.cos(v * Math.PI * SWEEPS)) * 100}vw - ${(0.5 - 0.5 * Math.cos(v * Math.PI * SWEEPS)) * 6.5}rem)`);
  const top = useTransform(p, (v) => `calc(${22 + Math.sin(v * Math.PI * SWEEPS * 2) * 10 + v * 40}vh)`);
  const opacity = useTransform(scrollYProgress, [0, 0.03, 0.06, 0.97, 1], [0, 0, 1, 1, 0]);
  const [right, setRight] = useState(true);
  const [rise, setRise] = useState(false);
  const layer = useRef<HTMLDivElement>(null);
  const bee = useRef<HTMLDivElement>(null);
  const last = useRef(0);

  useMotionValueEvent(p, "change", (v) => {
    // Hacia dónde va en x: derivada del coseno.
    const goingRight = Math.sin(v * Math.PI * SWEEPS) >= 0;
    const prev = p.getPrevious() ?? 0;
    const forward = v >= prev;
    const r = forward ? goingRight : !goingRight;
    if (r !== right) setRight(r);
    if (!forward !== rise) setRise(!forward);
    const now = performance.now();
    if (reduce || now - last.current < 180 || v < 0.06 || !bee.current || !layer.current) return;
    last.current = now;
    const box = bee.current.getBoundingClientRect();
    const h = document.createElement("span");
    const s = 10 + Math.random() * 8;
    h.innerHTML = HEART.replace("COLOR", COLORS[Math.floor(Math.random() * COLORS.length)]);
    h.style.cssText = `position:fixed;left:${box.left + box.width / 2 - s / 2}px;top:${box.top + box.height * 0.6}px;width:${s}px;height:${s}px;pointer-events:none`;
    layer.current.appendChild(h);
    h.animate(
      [
        { transform: "translate(0,0) scale(.4)", opacity: 0.95 },
        { transform: `translate(${(Math.random() - 0.5) * 30}px,${-20 - Math.random() * 30}px) scale(1)`, opacity: 0 },
      ],
      { duration: 1500, easing: "ease-out" },
    ).onfinish = () => h.remove();
  });

  return (
    <>
      <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[54]" />
      <motion.div ref={bee} aria-hidden className="pointer-events-none fixed z-[55]" style={{ left, top, opacity }}>
        {/* El giro va en un contenedor aparte: la animación del aleteo usa transform y lo pisaría. */}
        <motion.div animate={{ scaleX: right ? 1 : -1, rotate: rise ? -12 : 10 }} transition={{ type: "spring", stiffness: 220, damping: 16 }}>
          <img src={img("abeja")} alt="" className="flap w-20 drop-shadow-[0_12px_12px_rgb(74_42_20/0.25)] md:w-28" />
        </motion.div>
      </motion.div>
    </>
  );
}
