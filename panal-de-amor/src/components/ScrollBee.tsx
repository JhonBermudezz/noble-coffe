import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { img } from "../data";

// La abejita acompaña el scroll: baja cuando la persona baja y sube cuando sube, zigzagueando,
// y va dejando corazoncitos. Si se toca, lleva de vuelta al inicio.
const HEART = `<svg viewBox="0 0 24 22" width="100%" height="100%"><path d="M12 21S1 14 1 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 7-11 14-11 14z" fill="COLOR"/></svg>`;
const COLORS = ["#f7c64a", "#d63c7c", "#e9a426", "#f4a6c4"];

export function ScrollBee() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 18 });
  const top = useTransform(p, [0, 1], ["14vh", "78vh"]);
  const x = useTransform(p, (v) => Math.sin(v * Math.PI * 14) * 26);
  const opacity = useTransform(scrollYProgress, [0, 0.03, 0.06], [0, 0, 1]);
  const [down, setDown] = useState(true);
  const layer = useRef<HTMLDivElement>(null);
  const bee = useRef<HTMLButtonElement>(null);
  const last = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const prev = scrollYProgress.getPrevious() ?? 0;
    if (v > prev !== down) setDown(v > prev);
    // Un corazoncito cada tanto, donde va pasando.
    const now = performance.now();
    if (reduce || now - last.current < 260 || v < 0.06 || !bee.current || !layer.current) return;
    last.current = now;
    const r = bee.current.getBoundingClientRect();
    const h = document.createElement("span");
    const s = 9 + Math.random() * 7;
    h.innerHTML = HEART.replace("COLOR", COLORS[Math.floor(Math.random() * COLORS.length)]);
    h.style.cssText = `position:fixed;left:${r.left + r.width / 2 - s / 2}px;top:${r.top + r.height / 2}px;width:${s}px;height:${s}px;pointer-events:none`;
    layer.current.appendChild(h);
    h.animate(
      [
        { transform: "translate(0,0) scale(.4)", opacity: 0.95 },
        { transform: `translate(${(Math.random() - 0.5) * 30}px,${down ? -30 : 30}px) scale(1)`, opacity: 0 },
      ],
      { duration: 1400, easing: "ease-out" },
    ).onfinish = () => h.remove();
  });

  return (
    <>
      <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[54]" />
      <motion.button
        ref={bee}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver al inicio"
        title="Volver al inicio"
        className="fixed right-2 z-[55] md:right-8"
        style={{ top, x, opacity }}
      >
        <motion.img
          src={img("abeja")}
          alt=""
          className="flap w-11 drop-shadow-[0_8px_8px_rgb(74_42_20/0.25)] md:w-14"
          animate={{ rotate: down ? 18 : -18, scaleX: down ? 1 : -1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        />
      </motion.button>
    </>
  );
}
