import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const COLORS = ["#f28bb0", "#f2c230", "#3fb8a6", "#ee5a24", "#b9a6e8"];
type Drop = { id: number; x: number; y: number; color: string; dots: { dx: number; dy: number; r: number }[] };

// Salpicadura de pintura en cada clic de un botón o enlace.
export function Splash() {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest("a, button")) return;
      const drop: Drop = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        dots: Array.from({ length: 7 }, () => {
          const a = Math.random() * Math.PI * 2;
          const d = 26 + Math.random() * 30;
          return { dx: Math.cos(a) * d, dy: Math.sin(a) * d, r: 3 + Math.random() * 6 };
        }),
      };
      setDrops((list) => [...list.slice(-6), drop]);
      window.setTimeout(() => setDrops((list) => list.filter((x) => x.id !== drop.id)), 700);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      <AnimatePresence>
        {drops.map((d) => (
          <motion.svg
            key={d.id}
            width="140"
            height="140"
            viewBox="-70 -70 140 140"
            className="absolute"
            style={{ left: d.x - 70, top: d.y - 70 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
          >
            {d.dots.map((dot, i) => (
              <motion.circle
                key={i}
                r={dot.r}
                fill={d.color}
                initial={{ cx: 0, cy: 0 }}
                animate={{ cx: dot.dx, cy: dot.dy }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  );
}
