import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { currentColor, nextColor, onColor } from "../paint";

// El cursor es un pincel: la punta queda justo donde está el mouse, se inclina según
// la dirección del movimiento y cambia de color en cada clic. Solo en computador.
export function BrushCursor() {
  const [enabled] = useState(
    () => window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [color, setColor] = useState(currentColor);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const tilt = useMotionValue(0);
  const rotate = useSpring(tilt, { stiffness: 300, damping: 18 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("brush-cursor");
    let lastX = 0;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      // Inclinación según la velocidad horizontal, como si el pincel arrastrara.
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      tilt.set(Math.max(-28, Math.min(28, -dx * 1.4)));
      setVisible(true);
      setHover(!!(e.target as Element).closest?.("a, button, [role=button], [role=radio]"));
    };
    const settle = window.setInterval(() => tilt.set(0), 120);
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => {
      setDown(false);
      nextColor();
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    const off = onColor(setColor);
    return () => {
      document.documentElement.classList.remove("brush-cursor");
      window.clearInterval(settle);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      off();
    };
  }, [enabled, x, y, tilt]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120]" style={{ x, y, opacity: visible ? 1 : 0 }}>
      {/* La punta del pincel está en (0,0); el pincel sale hacia abajo a la derecha. */}
      <motion.div
        style={{ rotate, transformOrigin: "0 0" }}
        animate={{ scale: down ? 0.86 : hover ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
      >
        <svg width="34" height="110" viewBox="0 0 34 110" style={{ transform: "rotate(-38deg)", transformOrigin: "0 0", marginLeft: -17 }}>
          {/* Cerdas con pintura */}
          <path d="M17 0c-6 8-9 18-9 30h18c0-12-3-22-9-30z" fill={color} />
          <path d="M17 4c-2 6-3 14-3 24" stroke="#fff" strokeOpacity=".45" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Virola */}
          <rect x="7" y="29" width="20" height="14" rx="2" fill="#c9c3b6" />
          <rect x="7" y="33" width="20" height="2.5" fill="#a59e90" />
          {/* Mango */}
          <path d="M9 43h16l-3 64a5 5 0 0 1-10 0z" fill="#c8643b" />
          <path d="M14 48l-1 52" stroke="#fff" strokeOpacity=".25" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
