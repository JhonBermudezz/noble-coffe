import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { img } from "../data";

// El cursor es una cucharita de miel (solo en computador) y cada clic suelta una gota
// que se estrella en hexagonitos. Las gotas se dibujan directo en el DOM.
const HEX = `<svg viewBox="0 0 20 22" width="100%" height="100%"><path d="M10 1l8.5 5v10L10 21 1.5 16V6z" fill="#f7c64a" stroke="#fff" stroke-width="1.5"/></svg>`;

export function Dipper() {
  const [on, setOn] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rot = useMotionValue(0);
  const sr = useSpring(rot, { stiffness: 120, damping: 12 });
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine && !reduce) {
      setOn(true);
      document.documentElement.classList.add("dipper");
    }
    let lx = 0;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      rot.set(Math.max(-25, Math.min(25, (e.clientX - lx) * 1.2)));
      lx = e.clientX;
    };
    const splash = (e: PointerEvent) => {
      if (reduce || !layer.current) return;
      const root = layer.current;
      const drop = document.createElement("span");
      drop.style.cssText = `position:fixed;left:${e.clientX - 7}px;top:${e.clientY - 4}px;width:14px;height:18px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,#fff6d0,#f7c64a 40%,#c9850e);pointer-events:none`;
      root.appendChild(drop);
      drop.animate([{ transform: "translateY(-6px) scale(.6)" }, { transform: "translateY(26px) scale(1)" }], { duration: 260, easing: "cubic-bezier(.5,0,1,1)" }).onfinish = () => {
        drop.remove();
        for (let i = 0; i < 7; i++) {
          const h = document.createElement("span");
          const s = 8 + Math.random() * 8;
          h.innerHTML = HEX;
          h.style.cssText = `position:fixed;left:${e.clientX - s / 2}px;top:${e.clientY + 22 - s / 2}px;width:${s}px;height:${s}px;pointer-events:none`;
          root.appendChild(h);
          const a = Math.PI + Math.random() * Math.PI;
          const d = 24 + Math.random() * 40;
          h.animate(
            [
              { transform: "translate(0,0) scale(.3) rotate(0)", opacity: 1 },
              { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(1) rotate(${Math.random() * 180}deg)`, opacity: 1, offset: 0.5 },
              { transform: `translate(${Math.cos(a) * d * 1.2}px,${Math.sin(a) * d + 30}px) scale(.8)`, opacity: 0 },
            ],
            { duration: 900 + Math.random() * 400, easing: "cubic-bezier(.2,.7,.3,1)" },
          ).onfinish = () => h.remove();
        }
      };
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", splash);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", splash);
      document.documentElement.classList.remove("dipper");
    };
  }, [x, y, rot]);

  return (
    <>
      <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[95]" />
      {on && (
        <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[96]" style={{ x, y }}>
          {/* La punta de la gota queda justo en el puntero. */}
          <motion.img
            src={img("cuchara")}
            alt=""
            className="w-16 -translate-x-[22%] -translate-y-[96%] drop-shadow-[0_6px_6px_rgb(74_42_20/0.3)]"
            style={{ rotate: sr, transformOrigin: "22% 96%" }}
          />
        </motion.div>
      )}
    </>
  );
}
